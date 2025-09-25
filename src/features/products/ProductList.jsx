import ProductCard from "../../components/ProductCard";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './productSlice';


const ProductList = () =>
{
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);
    useEffect(() =>
    {
        if (status === "idle")
        {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === "loading") return <p className="m-4">Loading...</p>;
    if (status === "failed") return <p className="m-4 text-red-500">Error: {error}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
            {items.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                />
            ))}
        </div>
    );
};

export default ProductList;
