import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { getPendingProducts, approveProduct, rejectProduct, getProductById } from "../../api/adminApi";
import Loader from "./Loader";
import ProductDetailModal from "./ProductDetailModal";

const AdminProductApproval = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = async () => {
    setLoading(true);
    try {
      const res = await getPendingProducts();
      setProducts(res.data.products ?? []);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Failed to load pending products" });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveProduct(id);
      setAlert({ type: "success", message: "Product approved" });
      loadPending();
    } catch (err) {
      setAlert({ type: "error", message: "Approve failed" });
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectProduct(id);
      setAlert({ type: "success", message: "Product rejected" });
      loadPending();
    } catch (err) {
      setAlert({ type: "error", message: "Reject failed" });
    }
  };

  const openProductModal = async (id) => {
    try {
      const res = await getProductById(id);
      setModalProduct(res.data.data ?? res.data.product ?? res.data);
    } catch (err) {
      console.error("fetch product detail", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-0 lg:ml-64 flex flex-col">
        <AdminHeader subtitle="Review & approve retailer-submitted products" />

        <main className="p-8">
          <h1 className="text-2xl font-bold text-green-700 mb-4">Pending Product Approvals</h1>

          {alert && (
            <div className={`p-3 mb-4 rounded ${alert.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
              {alert.message}
            </div>
          )}

          {loading ? (
            <Loader />
          ) : products.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-center text-gray-600">No pending products.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((p) => (
                <div key={p._id} className="bg-white p-5 rounded-xl shadow border border-green-50">
                  <div className="flex gap-4">
                    <div className="w-28 h-28 bg-gray-100 rounded overflow-hidden">
                      {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-gray-300">No image</div>}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-3">{p.description}</p>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="text-sm text-gray-500">Price:</div>
                        <div className="text-lg font-bold text-green-700">₹ {p.price}</div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button onClick={() => openProductModal(p._id)} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm">View</button>
                        <button onClick={() => handleApprove(p._id)} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm">Approve</button>
                        <button onClick={() => handleReject(p._1d || p._id)} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm">Reject</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {modalProduct && <ProductDetailModal product={modalProduct} onClose={() => setModalProduct(null)} />}
        </main>
      </div>
    </div>
  );
};

export default AdminProductApproval;
