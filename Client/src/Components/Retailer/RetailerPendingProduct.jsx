import React, { useEffect, useState } from "react";
import { getPendingRetailerProducts } from "../../api/adminApi";
import { Clock, ImageIcon } from "lucide-react";

const BASE_URL = "http://localhost:5000";

const RetailerPendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPendingProducts();
  }, []);

  const loadPendingProducts = async () => {
    try {
      const res = await getPendingRetailerProducts();
      setProducts(res.data?.data || []);
    } catch (error) {
      console.error("Pending products load error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading retailer pending products...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Clock className="text-green-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          Retailer Pending Products
        </h1>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No pending products found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {p.image ? (
                  <img
                    src={`${BASE_URL}${p.image}`}
                    alt={p.product_master?.name}
                    className="h-full object-contain"
                  />
                ) : (
                  <ImageIcon className="text-gray-400" size={48} />
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-800">
                  {p.product_master?.name}
                </h2>

                <p className="text-sm text-gray-500">
                  Brand: {p.brand || "N/A"}
                </p>

                <p className="text-sm text-gray-500">
                  Retailer: {p.retailer?.name || "N/A"}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-green-600 font-bold">
                    ₹{p.price}
                  </span>

                  <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                    Pending
                  </span>
                </div>

                <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                  <span>Stock: {p.stock}</span>
                  <span>MRP: ₹{p.mrp || "-"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RetailerPendingProducts;
