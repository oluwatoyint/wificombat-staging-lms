"use client";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import { getCookie } from "cookies-next";
import React, { Fragment, useEffect, useState } from "react";
import { TeacherPathwayView } from "./_components/pathway-view/TeacherPathwayView";
import { UserAndStudentPathwayView } from "./_components/pathway-view/UserAndStudentPathwayView";
import { AdminPathwayView } from "./_components/pathway-view/AdminPathwayView";
import { useGetDashboardPathways } from "@/app/hooks/user-nav/useGetDashboardPathways";

const CareerPathPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  const { pathways } = useGetDashboardPathways();
  const role = getCookie("role");
  //
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  //
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
          <Fragment>
            {isHydrated && role === "teacher" ? (
              <TeacherPathwayView />
            ) : isHydrated && role === "user" ? (
              <UserAndStudentPathwayView pathways={pathways} />
            ) : isHydrated && role === "school_admin" ? (
              <AdminPathwayView />
            ) : null}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default CareerPathPage;
