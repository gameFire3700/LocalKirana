import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { getAllRetailers, getRetailerById } from "../../api/adminApi";
import Loader from "./Loader";
import RetailerDetailModal from "./RetailerDetailModal";

const AdminManageRetailers = () => {
  const [loading, setLoading] = useState(true);
  const [retailers, setRetailers] = useState([]);
  const [selectedRetailer, setSelectedRetailer] = useState(null);

  useEffect(() => {
    loadRetailers();
  }, []);

  const loadRetailers = async () => {
    setLoading(true);
    try {
      const res = await getAllRetailers();
      setRetailers(res.data.retailers ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openRetailer = async (id) => {
    try {
      const res = await getRetailerById(id);
      setSelectedRetailer(res.data.retailer ?? res.data.data ?? res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-0 lg:ml-64 flex flex-col">
        <AdminHeader subtitle="Manage registered retailers" />
        <main className="p-8">
          <h1 className="text-2xl font-bold text-green-700 mb-4">Retailers</h1>

          {loading ? (
            <Loader />
          ) : retailers.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-center text-gray-600">No retailers found.</div>
          ) : (
            <div className="bg-white p-4 rounded-xl shadow border">
              <div className="grid grid-cols-12 gap-3 text-sm font-semibold border-b pb-2">
                <div className="col-span-4">Retailer</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Phone</div>
                <div className="col-span-3">Actions</div>
              </div>

              <div className="divide-y">
                {retailers.map((r) => (
                  <div key={r._id} className="grid grid-cols-12 gap-3 items-center py-3">
                    <div className="col-span-4">
                      <div className="font-semibold">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.shop_name || ""}</div>
                    </div>

                    <div className="col-span-3 text-sm text-gray-600">{r.email}</div>
                    <div className="col-span-2 text-sm text-gray-600">{r.contact}</div>

                    <div className="col-span-3 flex gap-2">
                      <button onClick={() => openRetailer(r._id)} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedRetailer && <RetailerDetailModal retailer={selectedRetailer} onClose={() => setSelectedRetailer(null)} />}
        </main>
      </div>
    </div>
  );
};

export default AdminManageRetailers;
