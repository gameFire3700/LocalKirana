import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(location.search).get("query")?.toLowerCase() || "";

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setResults(filtered);
  }, [query]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.findIndex((item) => item.id === product.id);
    if (existing !== -1) cart[existing].quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#F9FFF9] py-10 px-6">
      <h2 className="text-3xl font-bold text-[#28A745] text-center mb-8">
        Search Results for “{query}”
      </h2>

      {results.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products found 😞</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition p-4 flex flex-col items-center"
            >
              {product.imagePreview ? (
                <img
                  src={product.imagePreview}
                  alt={product.name}
                  className="w-32 h-32 object-contain mb-3"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-sm mb-3">
                  No Image
                </div>
              )}
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <span className="text-[#28A745] font-bold text-sm mb-2">
                ₹{product.price}
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(product)}
                className="bg-[#28A745] hover:bg-[#23923E] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition"
              >
                <ShoppingCart size={16} /> Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
