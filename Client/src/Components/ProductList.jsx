import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);
   
  const loadProducts = async () => {
    const data = await fetchProducts();
    console.log("PRODUCT API:", data);

    if (data.success) {
      setProducts(Array.isArray(data.data) ? data.data : []);
    } else {
      setProducts([]);
    }
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item._id === product._id);

    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <section className="p-6 bg-[#F0FFF0]">
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard key={p._id} product={p} addToCart={addToCart} />
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-500">No products found</p>
        )}
      </div>
    </section>
  );
};

export default ProductList;
