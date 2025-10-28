import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import CartView from "./components/CartView";
import AppHeader from "./components/Header";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

interface CartItem {
  id: string;
  product: Product;
  qty: number;
  lineTotal: number;
}

interface Cart {
  items: CartItem[];
  total: number;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch(`${API}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  }

  async function fetchCart() {
    try {
      const res = await fetch(`${API}/api/cart`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  }

  async function addToCart(productId: string) {
    try {
      await fetch(`${API}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, qty: 1 }),
      });
      await fetchCart();
      setShowCart(true);
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  }

  async function handleRemoveItem(id: string) {
    try {
      await fetch(`${API}/api/cart/${id}`, {
        method: "DELETE",
      });
      await fetchCart();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  }

  async function handleUpdateQty(id: string, qty: number) {
    if (qty < 1) return;
    try {
      const existing = cart.items.find((i) => i.id === id);
      if (existing) {
        await fetch(`${API}/api/cart/${id}`, { method: "DELETE" });
        await fetch(`${API}/api/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: existing.product._id, qty }),
        });
        await fetchCart();
      }
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  }

  async function handleCheckout(name: string, email: string) {
    try {
      const cartItems = cart.items.map((i) => ({
        productId: i.product._id,
        qty: i.qty,
      }));

      const res = await fetch(`${API}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          `Checkout successful!\n\nTotal: ₹${data.receipt.total}\nName: ${data.receipt.name}\nTime: ${data.receipt.timestamp}`
        );
        await fetchCart();
        setShowCart(false);
      } else {
        alert(`Checkout failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Checkout failed", err);
    }
  }

  function handleLogin(email: string, password: string) {
    alert(`Logged in with ${email} (${password})`);
    setShowLogin(false);
  }

  function handleSignup(name: string, email: string, password: string) {
    alert(`Account created for ${name} (${email}) with password ${password}`);
    setShowSignup(false);
  }

  return (
    <div>
      <AppHeader
        cartCount={cart.items.length}
        onCartToggle={() => setShowCart((s) => !s)}
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <ProductList products={products} onAdd={addToCart} />
      </div>

      {showCart && (
        <CartView
          show={showCart}
          setShow={setShowCart}
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={handleRemoveItem}
          onUpdateQty={handleUpdateQty}
          onCheckout={handleCheckout}
        />
      )}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          onLogin={handleLogin}
        />
      )}

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          onSignup={handleSignup}
        />
      )}
    </div>
  );
}