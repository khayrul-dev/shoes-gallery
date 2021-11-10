import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Products = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
  return (
    <div className='bg-seconDary_bg py-16'>
      <div className="small-container">
        <h1 className='font-bold uppercase text-2xl'>Featured <span className='text-primary_bg'>Products</span></h1>
        <p className='text-sm font-medium mt-2 mb-3'>There have some featured items Those would be your <br />  todays selection</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            products.slice(0, 6).map(product => <Product
              key={product._id}
              product={product}
            />)
          }
        </div>
      </div>
    </div>
  );
};

export default Products;