import React from "react";

const AdminStatsCard = ({ title, value, icon: Icon, color = "bg-green-500" }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 border border-green-100 flex items-center gap-4">
      <div className={`${color} p-3 rounded-full text-white`}>
        {Icon && <Icon size={20} />}
      </div>

      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-bold text-green-700">{value}</div>
      </div>
    </div>
  );
};

export default AdminStatsCard;
