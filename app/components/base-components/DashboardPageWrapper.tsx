"use client";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import { cn } from "@/app/utils/cn";
import React, { Fragment, ReactNode, useState } from "react";

export default function DashboardPageWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  return (
    <Fragment>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative `}>
        <div
          className={`${
            toggleSidebar ? "lg:pl-36" : "lg:pl-64"
          } transition-all duration-500 ease-in-out`}
        >
          <DashboardHeader setSidebarOpen={setSidebarOpen} />
          {/*  */}
          <div className={cn("px-4 mt-4", className)}>{children}</div>
        </div>
      </div>
    </Fragment>
  );
}
