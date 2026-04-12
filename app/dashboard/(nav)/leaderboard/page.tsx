"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
// import Header from "@/app/components/Dashboard/Header";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
// import { Courses, stage } from "@/app/utils/types-and-links";
// import Image from "next/image";
// import Link from "next/link";
import { useState } from "react";
// import { HiBars3 } from "react-icons/hi2";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { SlLock } from "react-icons/sl";
import LeaderBoard from "@/app/components/Dashboard/leaderBoard";





const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {toggleSidebar} = useMain();

  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        {/* Static sidebar for desktop */}

        {/* header/ MAIN SECTION Start */}
        <div className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out`}>
          
          <DashboardHeader setSidebarOpen={setSidebarOpen}/>

          <main className="pb-10">
            <div className="space-y-10">
           <LeaderBoard/>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;