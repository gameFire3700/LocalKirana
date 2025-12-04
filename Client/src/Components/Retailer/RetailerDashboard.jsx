import React, { useEffect, useState } from "react";
import RetailerSidebar from "./RetailerSidebar";
import { fetchMyProducts } from "../../api/retailerApi";
import { motion } from "framer-motion";

const RetailerDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    soldCount: 0,
    revenue: 0,
  });

  const loadStats = async () => {
    const res = await fetchMyProducts();
    const products = res.data.data;

    setStats({
      totalProducts: products.length,
      lowStock: products.filter((p) => p.stock <= 5).length,
      soldCount: products.reduce((s, p) => s + (p.sold_count || 0), 0),
      revenue: products.reduce((t, p) => t + ((p.sold_count || 0) * p.price), 0),
    });
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="flex">
      <RetailerSidebar />

      <main className="ml-0 lg:ml-64 p-8 w-full">
        <h1 className="text-3xl font-bold mb-6 text-[#2E8B57]">
          Retailer Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            ["Total Products", stats.totalProducts, "#28A745"],
            ["Low Stock", stats.lowStock, "#FF7A00"],
            ["Items Sold", stats.soldCount, "#0080FF"],
            ["Revenue", `₹${stats.revenue}`, "#6A0DAD"],
          ].map(([label, value, color], i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white p-5 rounded-xl shadow"
            >
              <p className="text-sm text-gray-600">{label}</p>
              <h3 style={{ color }} className="text-2xl font-bold">
                {value}
              </h3>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
   );
 };

export default RetailerDashboard;
