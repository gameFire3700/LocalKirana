import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, LayoutDashboard, Package, Plus, Boxes, LogOut
} from "lucide-react";

const RetailerSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("retailerToken");
    navigate("/retailer/login");
  };

  const menuItems = [
    { to: "/retailer/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/retailer/products", icon: <Package size={20} />, label: "My Products" },
    { to: "/retailer/add-product", icon: <Plus size={20} />, label: "Add Product" },
    { to: "/retailer/inventory", icon: <Boxes size={20} />, label: "Inventory" },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-[#28A745] text-white rounded-xl shadow-md hover:bg-[#218838] transition"
      >
        <Menu />
      </button>

      {/* SIDEBAR (border removed) */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-40
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-64 lg:translate-x-0"}
        `}
      >
        <div className="p-6 h-full flex flex-col">

          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-[#28A745] tracking-wide">
              Retailer Panel
            </h3>

            <button className="lg:hidden text-gray-700" onClick={() => setOpen(false)}>
              <X size={26} />
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-2 flex-grow">
            {menuItems.map((item) => {
              const active = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium 
                    transition-all cursor-pointer
                    ${
                      active
                        ? "bg-[#28A745] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#28A745]"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition font-semibold"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default RetailerSidebar;
