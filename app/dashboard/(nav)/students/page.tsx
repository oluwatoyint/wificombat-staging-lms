"use client";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { Fragment, Suspense, useState } from "react";
import StudentsTable from "./_components/StudentsTable";

const DashboardSchoolsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  //
  const router = useRouter();
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
              <StudentsTable />
            </Suspense>
          </div>
          {/*  */}
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardSchoolsPage;
