import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import axiosClient from "../api/axiosClient";
import ProductCard from "./ProductCard";

const CategorySections = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetchProducts(),
        axiosClient.get("/category/")
      ]);

      if (prodRes?.success) {
        setProducts(prodRes.products || []);
      }

      const catData = catRes.data?.data || [];
      setCategories(catData);

      if (catData.length > 0) {
        setActiveCategory(catData[0]._id);
      }
    } catch (err) {
      console.error("Category section load error:", err);
    }
  };

  const filteredProducts = products.filter((p) => {
    const catId =
      typeof p.category === "string"
        ? p.category
        : p.category?._id;
    return catId === activeCategory;
  });

  return (
    <section className="w-full px-4 mt-10 mb-10 bg-[#F0FFF0] py-8">

      {/* CATEGORY BUTTONS */}
      <div className="flex gap-4 overflow-x-auto pb-3">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setActiveCategory(cat._id)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap
              ${
                activeCategory === cat._id
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* TITLE */}
      <h2 className="text-lg font-bold mt-6 mb-2 text-gray-800">
        {categories.find((c) => c._id === activeCategory)?.name || ""} Products
      </h2>

      {/* PRODUCTS */}
      <div className="flex gap-4 overflow-x-auto pb-5 scrollbar-hide">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="min-w-[250px]">
              <ProductCard product={product} addToCart={() => {}} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
      </div>
    </section>
  );
};

export default CategorySections;
