import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Package,
  Store,
  IndianRupee,
  Layers
} from "lucide-react";

import {
  getPendingRetailerProducts,
  getProductMasterById,
  getCategories,
  getSubCategories,
  approveRetailerProduct,
  rejectRetailerProduct
} from "../../api/adminApi";

const ProductApproval = () => {
  const [products, setProducts] = useState([]);
  const [masterMap, setMasterMap] = useState({});
  const [categories, setCategories] = useState([]);
  const [subMap, setSubMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* ================= FETCH ALL ================= */
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);

      // Pending products
      const pendingRes = await getPendingRetailerProducts();
      const pendingProducts = pendingRes.data?.data || [];
      setProducts(pendingProducts);

      // Categories
      const categoryRes = await getCategories();
      const categoryData = categoryRes.data?.data || [];
      setCategories(categoryData);

      // Subcategories
      const tempSubMap = {};
      for (const cat of categoryData) {
        const res = await getSubCategories(cat._id);
        tempSubMap[cat._id] = res.data?.data || [];
      }
      setSubMap(tempSubMap);

      // Product Masters
      const tempMasterMap = {};
      for (const p of pendingProducts) {
        const masterId =
          typeof p.product_master === "string"
            ? p.product_master
            : p.product_master?._id;

        if (masterId && !tempMasterMap[masterId]) {
          const res = await getProductMasterById(masterId);
          tempMasterMap[masterId] = res.data?.data;
        }
      }
      setMasterMap(tempMasterMap);
    } catch (err) {
      console.error("ProductApproval fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTIONS ================= */

  const handleApprove = async (id) => {
    try {
      await approveRetailerProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product approved successfully");
    } catch (err) {
      console.error(err);
      alert("Approve failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRetailerProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product rejected successfully");
    } catch (err) {
      console.error(err);
      alert("Reject failed");
    }
  };

  /* ================= HELPERS ================= */

  const getMasterName = (id) => {
    const masterId = typeof id === "string" ? id : id?._id;
    return masterMap[masterId]?.name || "-";
  };

  const getCategoryName = (id) =>
    categories.find((c) => c._id === id)?.name || "-";

  const getSubCategoryName = (catId, subId) =>
    subMap[catId]?.find((s) => s._id === subId)?.name || "-";

  if (loading) return <div className="p-6">Loading pending products...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-blue-600 text-white rounded-xl">
          <Package size={28} />
        </div>
        <h1 className="text-3xl font-bold">Pending Retailer Products</h1>
      </div>

      {products.length === 0 ? (
        <p>No pending products.</p>
      ) : (
        <div className="grid gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow p-6"
            >
              <div className="flex justify-between mb-4">
                <h2 className="flex items-center gap-2 font-bold text-xl">
                  <Layers size={18} />
                  {getMasterName(product.product_master)}
                </h2>
                <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full">
                  Pending
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <Detail label="Retailer">
                  <Store size={14} /> {product.retailer?.name}
                </Detail>
                <Detail label="Category">{getCategoryName(product.category)}</Detail>
                <Detail label="Subcategory">
                  {getSubCategoryName(product.category, product.subcategory)}
                </Detail>
                <Detail label="Price">
                  <IndianRupee size={14} /> {product.price}
                </Detail>
                <Detail label="Stock">{product.stock}</Detail>
              </div>

              {product.image && (
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt=""
                  className="h-40 mt-4 rounded border object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleApprove(product._id)}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg"
                >
                  <CheckCircle size={18} /> Approve
                </button>

                <button
                  onClick={() => handleReject(product._id)}
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg"
                >
                  <XCircle size={18} /> Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ================= MODAL FOR DETAILS ================= */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-11/12 max-w-3xl p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {getMasterName(selectedProduct.product_master) ||
                selectedProduct.product_name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Detail label="Retailer">
                <Store size={14} /> {selectedProduct.retailer?.name}
              </Detail>
              <Detail label="Category">
                {getCategoryName(selectedProduct.category)}
              </Detail>
              <Detail label="Subcategory">
                {getSubCategoryName(
                  selectedProduct.category,
                  selectedProduct.subcategory
                )}
              </Detail>
              <Detail label="Price">
                <IndianRupee size={14} /> {selectedProduct.price}
              </Detail>
              <Detail label="Stock">{selectedProduct.stock}</Detail>
              {selectedProduct.mrp && (
                <Detail label="MRP">
                  <IndianRupee size={14} /> {selectedProduct.mrp}
                </Detail>
              )}
              {selectedProduct.image && (
                <div className="col-span-1 md:col-span-2">
                  <img
                    src={`http://localhost:5000${selectedProduct.image}`}
                    alt=""
                    className="w-full h-48 object-contain rounded border mt-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= REUSABLE ================= */
const Detail = ({ label, children }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-medium flex items-center gap-1">{children}</p>
  </div>
);

export default ProductApproval;
