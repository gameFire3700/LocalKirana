import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { fetchProducts } from "../api/productApi";
import ProductCard from "./ProductCard";

const categories = ["Grocery", "Beverages", "Snacks", "Household"];

const CategorySections = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Grocery");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    if (data?.success) {
      setProducts(data.products);
    }
  };

  const filterByCategory = (cat) => {
    if (!Array.isArray(products)) return [];
    return products.filter((p) => {
      const category =
        p.category?.name?.toLowerCase?.() ||
        p.category?.toLowerCase?.() ||
        "";
      return category === cat.toLowerCase();
    });
  };

  return (
    <section className="w-full px-4 mt-10 mb-10 bg-[#F0FFF0] py-8">

      {/* Category Buttons */}
      <div className="flex gap-4 overflow-x-auto pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap
            ${activeCategory === cat
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold mt-6 mb-2 text-gray-800">
        {activeCategory} Products
      </h2>

      {/* Horizontal Product Slider */}
      <div className="flex gap-4 overflow-x-auto pb-5 scrollbar-hide">
        {filterByCategory(activeCategory)?.length > 0 ? (
          filterByCategory(activeCategory).map((product) => (
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
