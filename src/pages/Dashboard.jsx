import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Core/Dashboard/Sidebar";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const Dashboard = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex bg-richblack-900">
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-[calc(100vh-60px)]">
        {/* Mobile Header with Menu Button */}
        <div className="lg:hidden flex items-center gap-4 p-4 bg-richblack-800 border-b border-richblack-700">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="text-richblack-200 hover:text-richblack-5"
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
          <h1 className="text-richblack-5 font-semibold">Dashboard</h1>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;