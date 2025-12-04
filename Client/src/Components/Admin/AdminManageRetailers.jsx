import React, { useEffect, useState } from "react";
import { getAllRetailers } from "../../api/adminApi";
import { motion } from "framer-motion";
import { Users, CheckCircle, XCircle } from "lucide-react";

const AdminManageRetailers = () => {
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRetailers = async () => {
    try {
      const res = await getAllRetailers();
      setRetailers(res.data.retailers);
    } catch (err) {
      console.log("ERROR FETCHING RETAILERS:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRetailers();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-3">
        <Users size={35} />
        Manage Retailers
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : retailers.length === 0 ? (
        <p className="text-gray-600">No retailers found</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-green-200"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-3">Retailer Name</th>
                <th className="py-3">Email</th>
                <th className="py-3">Phone</th>
                <th className="py-3">GST</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {retailers.map((ret) => (
                <tr key={ret._id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{ret.name}</td>
                  <td>{ret.email}</td>
                  <td>{ret.contact}</td>
                  <td>{ret.gst_no}</td>

                  <td>
                    {ret.is_active ? (
                      <span className="text-green-600 font-semibold flex items-center gap-2">
                        <CheckCircle size={18} /> Active
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold flex items-center gap-2">
                        <XCircle size={18} /> Inactive
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default AdminManageRetailers;
