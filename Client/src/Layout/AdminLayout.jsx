import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* LEFT SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT PAGE CONTENT */}
      <main className="flex-1 ml-0 lg:ml-64 p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
