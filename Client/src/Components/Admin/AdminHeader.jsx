import React from "react";
import { Bell, UserCircle } from "lucide-react";

const AdminHeader = ({ subtitle }) => {
  return (
    <header className="w-full bg-white border-b px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-green-700">Welcome, Admin</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="text-gray-600 hover:text-green-700" size={22} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </button>

          <div className="flex items-center gap-2">
            <UserCircle size={32} className="text-gray-700" />
            <div className="text-right">
              <div className="text-sm font-semibold">Admin</div>
              <div className="text-xs text-gray-500">You are signed in</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
