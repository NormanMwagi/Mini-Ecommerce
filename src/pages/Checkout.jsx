import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Checkout = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state) => state.cart.items);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePlaceOrder = () =>
    {
        alert("Order placed successfully! 🎉");
        dispatch(clearCart());
        navigate("/");
    };

    return (
        <>
            <Navbar />

            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Checkout</h1>

                {/* Order Summary */}
                <div className="border p-4 rounded mb-6">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between mb-2">
                            <span>
                                {item.title} (x{item.quantity})
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <h3 className="text-xl font-bold mt-4">Total: ${totalPrice.toFixed(2)}</h3>
                </div>

                {/* Mock Form */}
                <div className="border p-4 rounded mb-6">
                    <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="City"
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="w-full border p-2 rounded"
                            required
                        />
                    </form>
                </div>

                {/* Place Order Button */}
                <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Place Order
                </button>
            </div>
        </>
    );
};

export default Checkout;
