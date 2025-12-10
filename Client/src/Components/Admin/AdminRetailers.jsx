import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, User, Mail, Phone, Store, X } from "lucide-react";
import { getAllRetailers } from "../../api/adminApi";

const AdminRetailers = () => {
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRetailer, setSelectedRetailer] = useState(null);

  // Fetch retailers
  const fetchData = async () => {
    try {
      const res = await getAllRetailers();
      setRetailers(res.data.retailers || []);
    } catch (error) {
      console.log("Error fetching retailers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Retailers List
      </h1>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading retailers...</p>
      ) : retailers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No retailers found.</p>
      ) : (
        <div className="space-y-4">
          {retailers.map((r, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center border"
            >
              <div>
                <h3 className="text-xl font-semibold text-green-700">{r.name}</h3>
                <p className="text-gray-600">{r.email}</p>
                <p className="text-gray-500 text-sm">Retailer ID: {r.retailer_id}</p>
              </div>

              <button
                onClick={() => setSelectedRetailer(r)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 flex items-center gap-2"
              >
                <Eye size={18} /> View Details
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Retailer Details Modal */}
      <AnimatePresence>
        {selectedRetailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="w-[500px] bg-white p-6 rounded-2xl shadow-xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedRetailer(null)}
                className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <User size={22} /> Retailer Details
              </h2>

              <div className="space-y-3">
                <InfoRow label="Retailer ID" value={selectedRetailer.retailer_id} />
                <InfoRow label="Name" value={selectedRetailer.name} icon={<User />} />
                <InfoRow label="Email" value={selectedRetailer.email} icon={<Mail />} />
                <InfoRow label="Contact" value={selectedRetailer.contact} icon={<Phone />} />
                <InfoRow label="GST No" value={selectedRetailer.gst_no} icon={<Store />} />
                <InfoRow label="Shop Address" value={selectedRetailer.shop_addresses} />

                <InfoRow label="Role" value={selectedRetailer.role} />
                <InfoRow
                  label="Active Status"
                  value={selectedRetailer.is_active ? "Active" : "Inactive"}
                />

                <InfoRow
                  label="Registered On"
                  value={new Date(selectedRetailer.registration_date).toLocaleString()}
                />

                <InfoRow
                  label="Created At"
                  value={new Date(selectedRetailer.createdAt).toLocaleString()}
                />

                <InfoRow
                  label="Updated At"
                  value={new Date(selectedRetailer.updatedAt).toLocaleString()}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable Info Row Component
const InfoRow = ({ label, value, icon }) => {
  return (
    <div className="flex gap-3 items-center">
      {icon && <div className="text-green-700">{icon}</div>}
      <p className="font-semibold text-gray-700 w-40">{label}:</p>
      <p className="text-gray-600">{value}</p>
    </div>
  );
};

export default AdminRetailers;


