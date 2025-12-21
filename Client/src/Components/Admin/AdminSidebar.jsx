import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  LogOut,
  Menu,
  X,
  CheckCircle2,
  Ban,
  Layers,
  List
} from "lucide-react";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md"
      : "text-gray-700 hover:bg-green-50";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2.5 rounded-xl shadow-lg active:scale-95 transition"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50
        bg-white/95 backdrop-blur-xl
        shadow-2xl rounded-r-3xl
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-green-700">
              Admin Panel
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage the store
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="px-4 flex flex-col gap-2">

          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive("/admin/dashboard")}`}
          >
            <span className="p-2 bg-white/40 rounded-lg">
              <LayoutDashboard size={18} />
            </span>
            Dashboard
          </Link>

          <Link
            to="/admin/retailers"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive("/admin/retailers")}`}
          >
            <span className="p-2 bg-white/40 rounded-lg">
              <Users size={18} />
            </span>
            Retailers
          </Link>

          <Link
            to="category-create"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive("/category-create")}`}
          >
            <span className="p-2 bg-white/40 rounded-lg">
              <Layers size={18} />
            </span>
            Categories
          </Link>

          <Link
            to="subcategories-create"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive("subcategories-create")}`}
          >
            <span className="p-2 bg-white/40 rounded-lg">
              <List size={18} />
            </span>
            Sub Categories
          </Link>

          <Link
            to="Add-Master-Product"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive("Add-Master-Product")}`}
          >
            <span className="p-2 bg-white/40 rounded-lg">
              <List size={18} />
            </span>
            Add Master Product
          </Link>

          <Link
            to="/admin/product-approval"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive("/admin/product-approval")}`}
          >
            <span className="p-2 bg-white/40 rounded-lg">
              <CheckCircle2 size={18} />
            </span>
            Product Approval
          </Link>

          <Link
            to="/admin/approved-products"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive("/admin/approved-products")}`}
          >
            <span className="p-2 bg-white/40 rounded-lg">
              <CheckCircle size={18} />
            </span>
            Approved Products
          </Link>

          <Link
            to="/admin/rejected-products"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive("/admin/rejected-products")}`}
          >
            <span className="p-2 bg-white/40 rounded-lg">
              <Ban size={18} />
            </span>
            Rejected Products
          </Link>

          {/* Logout */}
          <div className="mt-6 pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full font-semibold transition"
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
