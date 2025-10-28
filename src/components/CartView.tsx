import React, { useEffect, useRef, useState } from "react";

interface CartItem {
    id: string;
    product: {
        name: string;
        price: number;
        imageUrl?: string;
    };
    qty: number;
    lineTotal: number;
}

interface Cart {
    items: CartItem[];
    total: number;
}

interface CartViewProps {
    show: boolean;
    setShow: (show: boolean) => void;
    cart: Cart;
    onClose: () => void;
    onRemove: (id: string) => void;
    onUpdateQty: (id: string, qty: number) => void;
    onCheckout: (name: string, email: string) => void;
}

const CartView: React.FC<CartViewProps> = ({
    show,
    setShow,
    cart,
    onClose,
    onRemove,
    onUpdateQty,
    onCheckout,
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const cartRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
                setShow(false);
            }
        };
        if (show) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [show, setShow]);

    if (!show) return null;


    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 300);
    };

    console.log(cart.items);

    return (
        <div
            className={"fixed inset-0 z-50 flex justify-end bg-black/30 transition-opacity duration-300"
                }
        >
            <div
                ref={cartRef}
                className={"w-full sm:w-96 h-full bg-white shadow-xl border-l border-gray-200 flex flex-col transform transition-transform duration-300"}
            >
                <div className="flex justify-between items-center border-b px-5 py-4">
                    <h3 className="text-xl font-semibold">Your Cart</h3>
                    <button
                        onClick={handleClose}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
                    >
                        Close
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {cart.items.length === 0 ? (
                        <div className="text-gray-500 text-sm text-center py-8">
                            Your cart is empty 🛒
                        </div>
                    ) : (
                        cart.items.map((it) => (
                            <div
                                key={it.id}
                                className="flex items-center gap-3 mb-4 border-b pb-4 last:border-none"
                            >
                                <img
                                    src={
                                        it.product.imageUrl
                                    }
                                    alt={it.product.name}
                                    className="w-20 h-20 rounded-lg object-cover border"
                                />

                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">
                                        {it.product.name}
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">
                                        ₹{it.product.price} × {it.qty} ={" "}
                                        <span className="font-semibold">₹{it.lineTotal}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min="1"
                                            defaultValue={it.qty}
                                            onBlur={(e) =>
                                                onUpdateQty(it.id, Number(e.target.value))
                                            }
                                            className="w-16 px-2 py-1 border rounded-md text-sm"
                                        />
                                        <button
                                            onClick={() => onRemove(it.id)}
                                            className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.items.length > 0 && (
                    <div className="border-t px-5 py-4 bg-white sticky bottom-0">
                        <div className="flex justify-between text-base font-medium mb-3">
                            <span>Total:</span>
                            <span>₹{cart.total}</span>
                        </div>

                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border p-2 rounded-md mb-2 text-sm"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-2 rounded-md mb-3 text-sm"
                        />
                        <button
                            onClick={() => onCheckout(name, email)}
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartView;