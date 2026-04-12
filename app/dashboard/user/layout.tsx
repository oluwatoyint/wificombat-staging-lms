"use client";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import React, { Fragment, ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";

const UserDashboardLayout = ({ children }: { children: ReactNode }) => {
  const { toggleSidebar } = useMain();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Fragment>
      <Toaster />
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/*  */}
      <div className={`${raleway.className} relative `}>
        {/* header/ MAIN SECTION Start */}
        <div
          className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out`}
        >
          <DashboardHeader
            setSidebarOpen={setSidebarOpen}
            // name={dashboardData?.username}
          />

          <main className="pb-10 lg:pb-10">
            <div className="px-4 sm:px-6 lg:px-8 lg:py-6 space-y-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default UserDashboardLayout;
