import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminStatsCard from "./AdminStatsCard";
import { Users, CheckCircle2, Store, ShoppingCart } from "lucide-react";
import { getAllRetailers, getPendingProducts, getApprovedProducts } from "../../api/adminApi";
import Loader from "./Loader";


const AdminDashboard = () => {
  const [stats, setStats] = useState({ retailers: 0, approvals: 0, products: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [rRes, pRes, aRes] = await Promise.allSettled([
          getAllRetailers(),
          getPendingProducts(),
          getApprovedProducts(),
        ]);

        const retailersCount = rRes.status === "fulfilled" ? (rRes.value.data.retailers?.length ?? 0) : 0;
        const pendingCount = pRes.status === "fulfilled" ? (pRes.value.data.count ?? (pRes.value.data.products?.length ?? 0)) : 0;
        const approvedCount = aRes.status === "fulfilled" ? (aRes.value.data.count ?? (aRes.value.data.products?.length ?? 0)) : 0;

        setStats({
          retailers: retailersCount,
          approvals: pendingCount,
          products: approvedCount,
          orders: 0,
        });
      } catch (err) {
        console.error("Dashboard stats error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-0 lg:ml-64 flex flex-col">
        <AdminHeader subtitle="Overview & quick stats" />
        <main className="p-8">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AdminStatsCard title="Total Retailers" value={stats.retailers} icon={Users} color="bg-green-500" />
                <AdminStatsCard title="Pending Approvals" value={stats.approvals} icon={CheckCircle2} color="bg-orange-500" />
                <AdminStatsCard title="Total Products" value={stats.products} icon={Store} color="bg-blue-500" />
                <AdminStatsCard title="Total Orders" value={stats.orders} icon={ShoppingCart} color="bg-purple-500" />
              </div>

              <section className="mt-8 bg-white p-6 rounded-xl shadow border border-green-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Retailers</h3>
                <p className="text-sm text-gray-500">Open Retailers & quick actions available in Retailers page.</p>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
