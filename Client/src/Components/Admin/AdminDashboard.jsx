import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminStatsCard from "./AdminStatsCard";

import { Store, Users, CheckCircle2, ShoppingCart } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    retailers: 0,
    approvals: 0,
    products: 0,
    orders: 0,
  });

  useEffect(() => {
    // TODO: API calls for dashboard stats
    // setStats({ retailers: X, approvals: Y, products: Z, orders: K });
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right side */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />

        {/* Dashboard content */}
        <div className="p-8 space-y-10">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdminStatsCard
              title="Total Retailers"
              value={stats.retailers}
              icon={Users}
              color="bg-green-500"
            />
            <AdminStatsCard
              title="Pending Approvals"
              value={stats.approvals}
              icon={CheckCircle2}
              color="bg-orange-500"
            />
            <AdminStatsCard
              title="Total Products"
              value={stats.products}
              icon={Store}
              color="bg-blue-500"
            />
            <AdminStatsCard
              title="Total Orders"
              value={stats.orders}
              icon={ShoppingCart}
              color="bg-purple-500"
            />
          </div>

          {/* Recent Table */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-green-200"
          >
            <h3 className="text-2xl font-bold text-green-700 mb-4">
              Recent Retailers
            </h3>

            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-3">Name</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">Phone</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-3">Arjun Store</td>
                  <td>arjun@gmail.com</td>
                  <td>9874563210</td>
                  <td className="text-green-600 font-semibold">Active</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Kirana Hub</td>
                  <td>kirana@gmail.com</td>
                  <td>9568741200</td>
                  <td className="text-orange-600 font-semibold">
                    Pending
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Fresh Mart</td>
                  <td>freshmart@gmail.com</td>
                  <td>9988776655</td>
                  <td className="text-green-600 font-semibold">Active</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
