import { LayoutDashboard, Users, CheckCircle2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="w-64 bg-white shadow-xl h-screen p-6 border-r border-gray-200">
      <h1 className="text-3xl font-extrabold text-green-700 mb-8">
        Admin Panel
      </h1>

      <nav className="space-y-5">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 text-lg hover:text-green-600"
        >
          <LayoutDashboard /> Dashboard
        </Link>

        <Link
          to="/admin/approvals"
          className="flex items-center gap-3 text-lg hover:text-green-600"
        >
          <CheckCircle2 /> Product Approvals
        </Link>

        <Link
          to="/admin/retailers"
          className="flex items-center gap-3 text-lg hover:text-green-600"
        >
          <Users /> Manage Retailers
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-lg text-red-600 hover:text-red-700 mt-10"
        >
          <LogOut /> Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
