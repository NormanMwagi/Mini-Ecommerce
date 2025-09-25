import React from 'react'
import Navbar from '../components/Navbar'
import ProductList from '../features/products/ProductList'

const Home = () =>
{
    return (
        <div>
            <Navbar />
            <ProductList />
        </div>
    )
}


export default Home
