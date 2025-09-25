import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () =>
{
    const [isOpen, setIsOpen] = useState(false);

    // Select cart count dynamically from Redux
    const cartCount = useSelector((state) => state.cart.items.length);

    return (
        <header className="bg-blue-600 text-white">
            <div className="flex justify-between items-center p-4">
                {/* Logo / Brand */}
                <h1 className="text-2xl font-bold">Mini Ecommerce</h1>

                {/* Desktop Nav */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        <li className="hover:underline">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="hover:underline">
                            <Link to="/products">Products</Link>
                        </li>
                        <li className="hover:underline">
                            <Link to="/checkout">Checkout</Link>
                        </li>
                        <li className="relative">
                            <Link to="/cart" className="flex items-center">
                                <ShoppingCart />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {isOpen && (
                <nav className="md:hidden bg-blue-700">
                    <ul className="flex flex-col space-y-4 p-4">
                        <li>
                            <Link to="/" onClick={() => setIsOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" onClick={() => setIsOpen(false)}>
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/checkout" onClick={() => setIsOpen(false)}>
                                Checkout
                            </Link>
                        </li>
                        <li className="relative">
                            <Link
                                to="/cart"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center"
                            >
                                <ShoppingCart className="mr-1" />
                                Cart
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 left-10 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );

};

export default Navbar;
