import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, title, description, price, image }) =>
{
    return (
        <div className="border p-4 rounded shadow hover:shadow-lg transition">
            <Link to={`/product/${id}`} className="block">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-contain mb-4"
                />
                <h2 className="font-bold text-lg mb-2">{title}</h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {description}
                </p>
                <span className="text-blue-600 font-semibold">$ {price}</span>
            </Link>
        </div>
    );
};

export default ProductCard;
