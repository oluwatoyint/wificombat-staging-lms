"use client";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import { Fragment, Suspense, useState } from "react";
import TeachersTable from "./_components/TeachersTable";

const DashboardSchoolsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
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
          {/*  */}
          <div className="px-4 mt-4">
            <Suspense fallback={<div></div>}>
              <TeachersTable />
            </Suspense>
          </div>
          {/*  */}
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardSchoolsPage;
