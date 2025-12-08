import React from "react";

const RetailerDetailModal = ({ retailer, onClose }) => {
  if (!retailer) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-lg border">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">{retailer.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">Close</button>
        </div>

        <div className="mt-4 space-y-3 text-sm text-gray-700">
          <div><strong>Email:</strong> {retailer.email}</div>
          <div><strong>Phone:</strong> {retailer.contact}</div>
          <div><strong>GST:</strong> {retailer.gst_no || "N/A"}</div>
          <div><strong>Status:</strong> {retailer.is_active ? "Active" : "Inactive"}</div>
          <div><strong>Address:</strong> {retailer.address || "Not provided"}</div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-100">Close</button>
        </div>
      </div>
    </div>
  );
};

export default RetailerDetailModal;
