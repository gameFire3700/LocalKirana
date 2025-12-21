import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getApprovedRetailerProducts } from "../api/adminApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadApprovedProducts();
  }, []);

  const loadApprovedProducts = async () => {
    try {
      const res = await getApprovedRetailerProducts();
      const data = res.data?.data || [];

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load approved products error:", err);
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
            <ProductCard
              key={p._id}
              product={{
                _id: p._id,
                name: p.product_master?.name,
                category: p.product_master?.category,
                price: p.price,
                mrp: p.mrp,
                stock: p.stock,
                image: p.image || "/no-image.png"
              }}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-500">
            No products available
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductList;
