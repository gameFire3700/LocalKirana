import React from "react";
import { Outlet } from "react-router-dom";
import RetailerSidebar from "../Components/Retailer/RetailerSidebar";

const RetailerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <RetailerSidebar />

      {/* Page Content */}
      <main className="lg:ml-64 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default RetailerLayout;
