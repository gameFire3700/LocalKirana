import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  IndianRupee,
  ImageIcon,
  Edit,
  Trash2
} from "lucide-react";
import { getRetailerProducts, deleteRetailerProduct } from "../../api/retailerApi";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const RetailerProduct = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getRetailerProducts();
      setProducts(res.data?.data || []);
    } catch (err) {
      console.error("Retailer products fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteRetailerProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) {
    return <div className="p-6">Loading your products...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-green-600 text-white rounded-xl shadow">
          <Package size={28} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          My Products
        </h1>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">
          You have not added any products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow p-5"
            >
              {/* IMAGE */}
              <div className="h-40 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img
                    src={`${BASE_URL}${product.image}`}
                    alt={product.product_name}
                    className="h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/no-image.png";
                    }}
                  />
                ) : (
                  <ImageIcon size={48} className="text-gray-400" />
                )}
              </div>

              {/* INFO */}
              <h3 className="mt-3 font-semibold text-lg line-clamp-2">
                {product.product_name || product.name}
              </h3>

              <p className="text-sm text-gray-500">
                {product.category?.name || "General"}
              </p>

              {/* PRICE & STOCK */}
              <div className="flex justify-between items-center mt-3">
                <span className="flex items-center gap-1 font-bold text-green-600">
                  <IndianRupee size={16} /> {product.price}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold
                    ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* STATUS */}
              <div className="mt-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold
                    ${
                      product.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : product.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  {(product.status || "pending").toUpperCase()}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    navigate(`/retailer/products/edit/${product._id}`)
                  }
                  className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  <Edit size={16} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RetailerProduct;
