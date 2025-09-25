import React, { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Products = () =>
{
    const { items, status, error } = useSelector((state) => state.products);

    // Local UI states
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState(""); // "price-asc" | "price-desc" | "title"
    const [category, setCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    // Derive filtered & sorted products
    const filteredProducts = useMemo(() =>
    {
        let result = items;

        // 🔎 Search
        if (search.trim())
        {
            result = result.filter((p) =>
                p.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // 🏷️ Category filter
        if (category !== "all")
        {
            result = result.filter((p) => p.category === category);
        }

        // ↕️ Sorting
        if (sort === "price-asc")
        {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc")
        {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sort === "title")
        {
            result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        }

        return result;
    }, [items, search, category, sort]);

    // 📄 Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (status === "loading") return <p className="m-4">Loading...</p>;
    if (status === "failed") return <p className="m-4 text-red-500">Error: {error}</p>;

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto p-4">
                {/* Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                        {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border px-3 py-2 rounded w-full md:w-1/3"
                    />

                    {/* Category Filter */}
                    <select
                        value={category}
                        onChange={(e) =>
                        {
                            setCategory(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="all">All Categories</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                        <option value="jewelery">Jewelry</option>
                        <option value="electronics">Electronics</option>
                    </select>

                    {/* Sort */}
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="">Sort By</option>
                        <option value="price-asc">Price: Low → High</option>
                        <option value="price-desc">Price: High → Low</option>
                        <option value="title">Title A–Z</option>
                    </select>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                            />
                        ))
                    ) : (
                        <p className="text-gray-600">No products found.</p>
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-6 space-x-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <span className="font-semibold">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Products;
