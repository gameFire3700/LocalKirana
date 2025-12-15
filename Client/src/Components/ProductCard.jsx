import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();
  const rating = product.rating || 0;
  const reviews = product.reviews || 0;

  const generateStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - (fullStars + (halfStar ? 1 : 0));

    for (let i = 0; i < fullStars; i++)
      stars.push(<Star key={`full-${i}`} size={16} fill="#FFD700" stroke="none" />);

    if (halfStar)
      stars.push(<Star key="half" size={16} fill="#FFD70080" stroke="none" />);

    for (let i = 0; i < emptyStars; i++)
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);

    return stars;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={() => navigate(`/product/${product._id}`)}
      className="w-full max-w-xs bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
    >
      {/* Product Image */}
      <div className="w-full h-52 bg-[#f8f8f8] flex items-center justify-center overflow-hidden rounded-t-xl">
        <img
          src={
            product.image
              ? `${BASE_URL}${product.image}`
              : product.imagePreview
              ? product.imagePreview
              : "https://via.placeholder.com/300"
          }
          alt={product.name}
          className="h-full object-contain"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-md line-clamp-2 h-12">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mb-1">
          {product.category?.name || product.category || "General"}
        </p>

        {rating > 0 ? (
          <div className="flex items-center gap-1 mb-2">
            {generateStars()}
            <span className="text-sm text-gray-600 ml-1">({reviews})</span>
          </div>
        ) : (
          <p className="text-gray-500 text-sm mb-2">No Ratings Yet</p>
        )}

        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-[#28A745]">₹{product.price}</span>

          {product.stock > 0 ? (
            <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-800 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {product.stock > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              addToCart(product);
            }}
            
            className="w-full bg-[#28A745] hover:bg-[#28A745]/90 active:bg-[#28A745]/80 text-white py-2 rounded-full flex items-center justify-center gap-2 font-medium shadow-md transition cursor-pointer"
          >
            <ShoppingCart size={18} /> Add to Cart
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
