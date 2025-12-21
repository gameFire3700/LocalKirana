import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Plus,
  Boxes,
  LogOut,
  Menu,
  X
} from "lucide-react";

const RetailerSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow"
      : "text-gray-700 hover:bg-green-50";

  const handleLogout = () => {
    localStorage.removeItem("retailerToken");
    navigate("/retailer/login");
  };

  const menuItems = [
  { to: "/retailer/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/retailer/products", icon: Package, label: "My Products" },

  // ✅ FIXED PATH
  { to: "/retailer/product-pending", icon: Package, label: "Your Pending Product" },

  { to: "/retailer/retailer-product-add", icon: Plus, label: "Add Product" },
  { to: "/retailer/inventory", icon: Boxes, label: "Inventory" }
];

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
        className={`
          fixed top-0 left-0 h-full w-64 z-50
          bg-white/95 backdrop-blur-xl
          shadow-2xl rounded-r-3xl
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-green-700">
              Retailer Panel
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage your business
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
          {menuItems.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium
                transition-all duration-200
                ${isActive(to)}
              `}
            >
              <div className="p-2 rounded-lg bg-white/30">
                <Icon size={18} />
              </div>
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-3 w-full px-4 py-3
              rounded-xl text-red-600 font-semibold
              hover:bg-red-50 transition
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default RetailerSidebar;
