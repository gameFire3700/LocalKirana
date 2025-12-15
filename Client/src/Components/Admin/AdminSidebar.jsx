import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  LogOut,
  Menu,
  X,
  PackageSearch,
  CheckCircle2,
  Ban
} from "lucide-react";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-green-600 text-white"
      : "text-gray-800 hover:bg-gray-100";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-lg shadow"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-md transform transition-transform z-40 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 border-b">
          <h1 className="text-2xl font-bold text-green-700">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Manage the store</p>
        </div>

        <nav className="p-4 flex flex-col gap-2">

          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 p-3 rounded-lg ${isActive("/admin/dashboard")}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          <Link
            to="/admin/retailers"
            className={`flex items-center gap-3 p-3 rounded-lg ${isActive("/admin/retailers")}`}
          >
            <Users size={18} /> Retailers
          </Link>

          <Link
            to="/admin/product-approval"
            className={`flex items-center gap-3 p-3 rounded-lg ${isActive("/admin/product-approval")}`}
          >
            <CheckCircle2 size={18} /> Product Approval
          </Link>

          <Link
            to="/admin/approved-products"
            className={`flex items-center gap-3 p-3 rounded-lg ${isActive("/admin/approved-products")}`}
          >
            <CheckCircle size={18} /> Approved Products
          </Link>

          {/* ⭐ NEW: Rejected Products */}
          <Link
            to="/admin/rejected-products"
            className={`flex items-center gap-3 p-3 rounded-lg ${isActive("/admin/rejected-products")}`}
          >
            <Ban size={18} /> Rejected Products
          </Link>

          <div className="mt-4 border-t pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 w-full text-left"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
