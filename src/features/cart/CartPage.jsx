// pages/CartPage.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import
{
    removeItem,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
} from "./cartSlice";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const CartPage = () =>
{
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);

    // Calculate total price
    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

                {items.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-20 h-20 object-contain rounded"
                                        />
                                        <div>
                                            <h2 className="font-semibold">{item.title}</h2>
                                            <p className="text-gray-600">${item.price}</p>
                                            <div className="flex items-center mt-2">
                                                <button
                                                    onClick={() => dispatch(decreaseQuantity(item.id))}
                                                    className="px-2 py-1 bg-gray-200 rounded"
                                                >
                                                    -
                                                </button>
                                                <span className="px-4">{item.quantity}</span>
                                                <button
                                                    onClick={() => dispatch(increaseQuantity(item.id))}
                                                    className="px-2 py-1 bg-gray-200 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <p className="font-semibold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <button
                                            onClick={() => dispatch(removeItem(item.id))}
                                            className="text-red-500 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="mt-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold">
                                Total: ${total.toFixed(2)}
                            </h2>
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Clear Cart
                            </button>
                            <Link
                                to="/checkout"
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Checkout
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartPage;
