import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  CheckCircle,
  XCircle,
  X,
  Package,
  Tag,
  Store,
  IndianRupee
} from "lucide-react";
import { getPendingProducts, approveProduct, rejectProduct } from "../../api/adminApi";

const ProductApproval = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await getPendingProducts();
      setProducts(res.data.products || []);
    } catch (error) {
      console.log("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.log("Approval failed", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.log("Rejection failed", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Product Approval</h1>

      {loading ? (
        <p className="text-gray-600 text-lg">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600 text-lg">No pending products.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-lg rounded-2xl p-4 flex flex-col hover:shadow-2xl hover:scale-105 transition-all duration-300 border"
            >
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3">
                <img
                  src={product.image ? `http://localhost:5000${product.image}` : "/no-img.png"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow">
                  Pending
                </span>
              </div>

              <h2 className="text-xl font-bold text-green-700">{product.name}</h2>

              <p className="text-gray-700 flex items-center gap-2 mt-1 font-semibold">
                <IndianRupee size={18} /> {product.price}
              </p>

              <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                <Store size={16} /> Retailer: {product.supplier_id ? product.supplier_id.name : "N/A"}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setSelected(product)}
                  className="flex-1 bg-blue-600 text-white rounded-xl py-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors duration-300"
                >
                  <Eye size={18} /> View
                </button>

                <button
                  onClick={() => handleApprove(product._id)}
                  className="flex-1 bg-green-600 text-white rounded-xl py-2 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors duration-300"
                >
                  <CheckCircle size={18} /> Approve
                </button>

                <button
                  onClick={() => handleReject(product._id)}
                  className="flex-1 bg-red-600 text-white rounded-xl py-2 flex items-center justify-center gap-2 hover:bg-red-700 transition-colors duration-300"
                >
                  <XCircle size={18} /> Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <Modal
            selected={selected}
            onClose={() => setSelected(null)}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Modal Component
const Modal = ({ selected, onClose, onApprove, onReject }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8 }}
      className="bg-white w-[650px] max-h-[90vh] overflow-y-auto rounded-3xl p-6 shadow-2xl relative"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
      >
        <X />
      </button>

      <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
        <Package size={22} /> Product Details
      </h2>

      <div className="w-full h-60 mb-4 rounded-xl overflow-hidden">
        <img
          src={selected.image ? `http://localhost:5000${selected.image}` : "/no-img.png"}
          alt={selected.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-3">
        <Info label="Product ID" value={selected.product_id} />
        <Info label="SKU" value={selected.sku} />
        <Info label="Name" value={selected.name} />
        <Info label="Brand" value={selected.brand} />
        <Info label="Category ID" value={selected.category} />
        <Info
          label="Supplier / Retailer"
          value={
            selected.supplier_id
              ? `${selected.supplier_id.name} (${selected.supplier_id.email})`
              : "N/A"
          }
        />
        <Info label="Description" value={selected.description} />
        <Info label="Price" value={`₹ ${selected.price}`} />
        <Info label="Stock" value={selected.stock} />
        <Info label="Discount" value={`${selected.discount}%`} />
        <Info label="Tax Rate" value={`${selected.tax_rate}%`} />
        <Info label="Unit" value={selected.unit} />
        <Info label="Product Status" value={selected.product_status} />
        <Info label="Available" value={selected.is_available ? "Yes" : "No"} />
        <Info label="Featured" value={selected.is_featured ? "Yes" : "No"} />

        <Info
          label="Created By"
          value={
            selected.created_by
              ? `${selected.created_by.name} (${selected.created_by.email})`
              : "N/A"
          }
        />
        <Info
          label="Updated By"
          value={
            selected.updated_by
              ? `${selected.updated_by.name} (${selected.updated_by.email})`
              : "N/A"
          }
        />

        <Info label="Created At" value={new Date(selected.createdAt).toLocaleString()} />
        <Info label="Updated At" value={new Date(selected.updatedAt).toLocaleString()} />

        <div>
          <p className="font-semibold text-gray-700 mb-1">Tags:</p>
          <div className="flex gap-2 flex-wrap">
            {selected.tags?.map((t, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                <Tag size={14} /> {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-700 mb-1">Dimensions:</p>
          <p className="text-gray-600">
            {selected.dimensions
              ? `${selected.dimensions.length} x ${selected.dimensions.width} x ${selected.dimensions.height}`
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => {
            onApprove(selected._id);
            onClose();
          }}
          className="flex-1 bg-green-600 text-white rounded-xl py-2 hover:bg-green-700 flex items-center justify-center gap-2 transition-colors duration-300"
        >
          <CheckCircle size={18} /> Approve
        </button>

        <button
          onClick={() => {
            onReject(selected._id);
            onClose();
          }}
          className="flex-1 bg-red-600 text-white rounded-xl py-2 hover:bg-red-700 flex items-center justify-center gap-2 transition-colors duration-300"
        >
          <XCircle size={18} /> Reject
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// Info Row Component
const Info = ({ label, value }) => (
  <div className="flex gap-3">
    <p className="w-40 font-semibold text-gray-700">{label}:</p>
    <p className="text-gray-600">{value}</p>
  </div>
);

export default ProductApproval;
