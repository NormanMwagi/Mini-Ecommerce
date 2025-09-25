
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById, clearSelected } from "../features/products/productSlice";
import { addItem } from "../features/cart/cartSlice";
import Navbar from "../components/Navbar";

const ProductDetail = () =>
{
    const { id } = useParams();
    const dispatch = useDispatch();
    const { status, error, selected } = useSelector((state) => state.products);
    const cartItems = useSelector((state) => state.cart.items);
    const isInCart = selected ? cartItems.some((item) => item.id === selected.id) : false;
    // Fetch products if not already loaded
    useEffect(() =>
    {

        dispatch(fetchProductById(id));

        return () => dispatch(clearSelected());
    }, [id, dispatch]);

    if (status === "loading") return <p className="m-4">Loading...</p>;
    if (status === "failed") return <p className="m-4 text-red-500">{error}</p>;
    if (!selected) return <p className="m-4">Product not found</p>;

    return (
        <>
            <Navbar />

            <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="flex justify-center items-center">
                    <img
                        src={selected.image}
                        alt={selected.title}
                        className="w-full h-96 object-contain rounded-lg shadow"
                    />
                </div>

                {/* Info Section */}
                <div>
                    <h1 className="text-2xl font-bold mb-2">{selected.title}</h1>
                    <p className="text-gray-600 mb-4">{selected.description}</p>
                    <p className="text-xl font-semibold text-blue-600 mb-6">
                        ${selected.price}
                    </p>

                    <button
                        onClick={() => dispatch(addItem(selected))}
                        disabled={!selected}
                        className={isInCart ? "bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition" : "bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"}
                    >
                        {isInCart ? "Added to Cart" : "Add to Cart"}
                    </button>
                </div>
            </div >
        </>
    );
}

export default ProductDetail
