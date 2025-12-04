import React from "react";
import { Outlet } from "react-router-dom";

const RetailerLayout = () => {
  return (
    <div className="min-h-screen bg-[#F6FFF6]">
      <Outlet />
    </div>
  );
};

export default RetailerLayout;
