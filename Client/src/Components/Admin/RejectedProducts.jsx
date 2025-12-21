import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Store,
  IndianRupee,
  Layers,
  XCircle
} from "lucide-react";

import {
  getRejectedRetailerProducts,
  getProductMasterById
} from "../../api/adminApi";

const RejectedProducts = () => {
  const [products, setProducts] = useState([]);
  const [masterMap, setMasterMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRejected();
  }, []);

  const fetchRejected = async () => {
    try {
      setLoading(true);

      const res = await getRejectedRetailerProducts();
      const rejected = res.data?.data || [];
      setProducts(rejected);

      const tempMaster = {};
      for (const p of rejected) {
        const masterId =
          typeof p.product_master === "string"
            ? p.product_master
            : p.product_master?._id;

        if (masterId && !tempMaster[masterId]) {
          const r = await getProductMasterById(masterId);
          tempMaster[masterId] = r.data?.data;
        }
      }
      setMasterMap(tempMaster);
    } catch (err) {
      console.error("RejectedProducts fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading rejected products...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-red-600 text-white rounded-xl">
          <XCircle size={28} />
        </div>
        <h1 className="text-3xl font-bold">Rejected Retailer Products</h1>
      </div>

      {products.length === 0 ? (
        <p>No rejected products.</p>
      ) : (
        <div className="grid gap-6">
          {products.map((product) => {
            const masterId =
              typeof product.product_master === "string"
                ? product.product_master
                : product.product_master?._id;

            const master = masterMap[masterId];

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow p-6"
              >
                <div className="flex justify-between mb-4">
                  <h2 className="flex items-center gap-2 font-bold text-xl">
                    <Layers size={18} />
                    {master?.name || "-"}
                  </h2>
                  <span className="bg-red-100 text-red-800 px-4 py-1 rounded-full">
                    Rejected
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <Detail label="Retailer">
                    <Store size={14} /> {product.retailer?.name}
                  </Detail>

                  {/* ✅ FIXED */}
                  <Detail label="Category">
                    {product.category?.name || "-"}
                  </Detail>

                  <Detail label="Subcategory">
                    {product.subcategory?.name || "-"}
                  </Detail>

                  <Detail label="Price">
                    <IndianRupee size={14} /> {product.price}
                  </Detail>

                  <Detail label="MRP">
                    <IndianRupee size={14} /> {product.mrp || "-"}
                  </Detail>

                  <Detail label="Stock">{product.stock}</Detail>
                </div>

                {product.image && (
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt=""
                    className="h-40 mt-4 rounded border"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, children }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-medium flex items-center gap-1">{children}</p>
  </div>
);

export default RejectedProducts;
