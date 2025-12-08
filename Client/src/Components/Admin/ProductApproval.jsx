import React, { useEffect, useState } from "react";
import {
  getPendingProducts,
  approveProduct,
  rejectProduct,
} from "../../api/adminApi";
import { CheckCircle2, XCircle, ImageIcon } from "lucide-react";
import Loader from "./Loader";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const ProductApproval = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = async () => {
    setLoading(true);
    try {
      const res = await getPendingProducts();
      setProducts(res.data.products || []);
    } catch (err) {
      console.log("Error loading products", err);
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Approve this product?")) return;

    const previous = [...products];
    setProducts(products.filter((p) => p._id !== id));

    setActionLoading(true);
    try {
      await approveProduct(id);
    } catch (err) {
      alert("Failed to approve product");
      setProducts(previous);
    }
    setActionLoading(false);
    setSelected(null);
  };

  const handleReject = async (id) => {
    if (!window.confirm("Reject this product?")) return;

    const previous = [...products];
    setProducts(products.filter((p) => p._id !== id));

    setActionLoading(true);
    try {
      await rejectProduct(id);
    } catch (err) {
      alert("Failed to reject product");
      setProducts(previous);
    }
    setActionLoading(false);
    setSelected(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      

      <div className="flex-1 ml-0 lg:ml-64 flex flex-col">
        <AdminHeader title="Product Approval" subtitle="Review & approve retailer products" />

        <main className="p-8">
          {loading ? (
            <Loader />
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-10">
              No pending products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow p-4 border hover:shadow-md transition cursor-pointer"
                  onClick={() => setSelected(product)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={`http://localhost:5000${product.image}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="text-gray-400" size={28} />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {product.category_name || "Uncategorized"}
                      </p>

                      <div className="mt-2 flex gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(product._id);
                          }}
                          className="px-3 py-1 bg-green-600 text-white rounded flex items-center gap-2"
                        >
                          <CheckCircle2 size={16} /> Approve
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(product._id);
                          }}
                          className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-2"
                        >
                          <XCircle size={16} /> Reject
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(product);
                          }}
                          className="ml-auto text-indigo-600 underline"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative shadow-xl">
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <div className="flex gap-4">
              <div className="w-40 h-40 bg-gray-100 rounded overflow-hidden">
                {selected.image ? (
                  <img
                    src={`http://localhost:5000${selected.image}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-gray-400" size={32} />
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold">{selected.name}</h2>
                <p className="text-gray-500">
                  {selected.category_name || "Not categorized"}
                </p>

                <p className="mt-3 text-gray-800">
                  <strong>Price:</strong> ₹{selected.price}
                </p>

                <p className="mt-2 text-gray-700">
                  <strong>Description:</strong> {selected.description || "No description"}
                </p>

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleApprove(selected._id)}
                    className="px-4 py-2 bg-green-600 rounded text-white flex items-center gap-2"
                    disabled={actionLoading}
                  >
                    <CheckCircle2 /> Approve
                  </button>

                  <button
                    onClick={() => handleReject(selected._id)}
                    className="px-4 py-2 bg-red-600 rounded text-white flex items-center gap-2"
                    disabled={actionLoading}
                  >
                    <XCircle /> Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductApproval;
