import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#121212]">
      <DashboardSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
};

export default DashboardLayout;
