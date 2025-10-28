import React from 'react';

interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
    description?: string;
}

interface ProductListProps {
    products: Product[];
    onAdd: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products = [], onAdd }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {products.map((p) => (
                <div
                    key={p._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
                >
                    <img
                        src={p.imageUrl || `https://picsum.photos/seed/${p._id}/400/240`}
                        alt={p.name}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <div className="flex flex-col flex-grow">
                        <div className="text-lg font-semibold">{p.name}</div>
                        <div className="text-gray-600 mt-1 mb-2">₹{p.price}</div>
                        <p className="text-sm text-gray-500 flex-grow">{p.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-xs text-green-600 font-medium">In stock</span>
                            <button
                                onClick={() => onAdd(p._id)}
                                className="bg-black text-white cursor-pointer px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;