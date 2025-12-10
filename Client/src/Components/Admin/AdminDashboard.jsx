import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, ClipboardCheck, CheckCircle } from "lucide-react";
import {
  getAllRetailers,
  getPendingProducts,
  getApprovedProducts,
} from "../../api/adminApi";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("retailers");
  const [retailers, setRetailers] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [retRes, pendRes, appRes] = await Promise.all([
        getAllRetailers(),
        getPendingProducts(),
        getApprovedProducts(),
      ]);

      // ✅ FIXED — Your API returns objects, not arrays
      setRetailers(retRes.data.retailers || []);
      setPendingProducts(pendRes.data.products || []);
      setApprovedProducts(appRes.data.products || []);

    } catch (error) {
      console.log("Error Fetching Dashboard Data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tabStyles = (tab) =>
    `px-4 py-2 rounded-xl cursor-pointer font-semibold ${
      activeTab === tab
        ? "bg-green-600 text-white"
        : "bg-gray-100 hover:bg-gray-200"
    }`;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={tabStyles("retailers")}
          onClick={() => setActiveTab("retailers")}
        >
          <Users className="inline mr-2" size={18} /> Retailers
        </button>

        <button
          className={tabStyles("pending")}
          onClick={() => setActiveTab("pending")}
        >
          <ClipboardCheck className="inline mr-2" size={18} /> Pending Products
        </button>

        <button
          className={tabStyles("approved")}
          onClick={() => setActiveTab("approved")}
        >
          <CheckCircle className="inline mr-2" size={18} /> Approved Products
        </button>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        {loading ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : (
          <>
            {/* Retailers Tab */}
            {activeTab === "retailers" && (
              <div>
                <h2 className="text-xl font-bold text-green-700 mb-3">
                  All Retailers
                </h2>

                <table className="w-full border">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {retailers.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="p-3 text-center">
                          No retailers found
                        </td>
                      </tr>
                    ) : (
                      retailers.map((r, i) => (
                        <tr key={i} className="border-b">
                          <td className="p-3">{r.name}</td>
                          <td className="p-3">{r.email}</td>
                          <td className="p-3 text-green-600 font-semibold">
                            {r.status}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pending Products Tab */}
            {activeTab === "pending" && (
              <div>
                <h2 className="text-xl font-bold text-yellow-600 mb-3">
                  Pending Product Approvals
                </h2>

                <table className="w-full border">
                  <thead className="bg-yellow-500 text-white">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Retailer</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pendingProducts.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="p-3 text-center">
                          No pending products
                        </td>
                      </tr>
                    ) : (
                      pendingProducts.map((p, i) => (
                        <tr key={i} className="border-b">
                          <td className="p-3">{p.name}</td>
                          <td className="p-3">{p.retailerName}</td>
                          <td className="p-3">${p.price}</td>
                          <td className="p-3 text-yellow-600 font-semibold">
                            {p.status}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Approved Products Tab */}
            {activeTab === "approved" && (
              <div>
                <h2 className="text-xl font-bold text-green-700 mb-3">
                  Approved Products
                </h2>

                <table className="w-full border">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Retailer</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Approved On</th>
                    </tr>
                  </thead>

                  <tbody>
                    {approvedProducts.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="p-3 text-center">
                          No approved products
                        </td>
                      </tr>
                    ) : (
                      approvedProducts.map((p, i) => (
                        <tr key={i} className="border-b">
                          <td className="p-3">{p.name}</td>
                          <td className="p-3">{p.retailerName}</td>
                          <td className="p-3">${p.price}</td>
                          <td className="p-3">{p.approvedDate}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
