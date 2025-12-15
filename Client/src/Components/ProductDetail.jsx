import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/product/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading product...
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 lg:p-14">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-6 lg:p-10 flex flex-col lg:flex-row gap-12">

        {/* ================= IMAGE ================= */}
        <div className="lg:w-1/3 w-full flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border shadow-inner p-6">
          <img
            src={`${BASE_URL}${product.image}`}
            alt={product.name}
            className="w-full max-h-[420px] object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* ================= DETAILS ================= */}
        <div className="lg:w-2/3 w-full">

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* META */}
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>
              Brand: <b className="text-gray-800">{product.brand}</b>
            </span>
            <span>
              Category:{" "}
              <b className="text-gray-800">{product.category?.name}</b>
            </span>
            <span>
              SKU: <b className="text-gray-800">{product.sku}</b>
            </span>
          </div>

          {/* PRICE */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-4xl font-extrabold text-green-600">
              ₹{product.price}
            </span>
            <span className="line-through text-gray-500 text-lg">
              ₹{product.mrp}
            </span>
            <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          </div>

          {/* STOCK */}
          <div className="mt-3">
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 font-semibold px-4 py-2 rounded-full border border-green-200">
                ✅ In Stock ({product.stock} left)
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 font-semibold px-4 py-2 rounded-full border border-red-200">
                ❌ Out of Stock
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Product Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* DATES */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-4 rounded-xl border">
              <p className="text-gray-600">Manufacture Date</p>
              <p className="font-semibold text-gray-800">
                {new Date(product.manufacture_date).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border">
              <p className="text-gray-600">Expiry Date</p>
              <p className="font-semibold text-gray-800">
                {new Date(product.expiry_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:to-yellow-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95">
              🛒 Add to Cart
            </button>

            <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:to-red-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95">
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
