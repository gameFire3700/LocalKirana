import { Bell, UserCircle } from "lucide-react";

const AdminHeader = () => {
  return (
    <div className="w-full flex justify-between items-center bg-white shadow-md px-6 py-4 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-green-700">
        Welcome, Admin 👋
      </h2>

      <div className="flex items-center gap-6">
        <Bell className="text-gray-600 hover:text-green-700 cursor-pointer" size={26} />
        <UserCircle className="text-gray-700" size={32} />
      </div>
    </div>
  );
};

export default AdminHeader;
