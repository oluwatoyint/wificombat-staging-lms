"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import { useState } from "react";
import { videosection } from "@/app/utils/types-and-links";
import Gamingvideo from "@/app/components/Dashboard/gamingVideo";
import Artificialvideo from "@/app/components/Dashboard/artificialVideo";
import Allvideo from "@/app/components/Dashboard/allVideo";
import Codingvideo from "@/app/components/Dashboard/codingVideo";
import MultiVideo  from "@/app/components/Dashboard/multiVideo";
import RobotVideo from "@/app/components/Dashboard/robotVideo";
const Page = () => {
    const { dashboardData } = useDashboardStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {toggleSidebar} = useMain();
    const [selectVideo, setSelectVideo] = useState("All")

    return (
       <>
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        {/* Static sidebar for desktop */}

        {/* header/ MAIN SECTION Start */}
        <div className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out`}>
          
          <DashboardHeader setSidebarOpen={setSidebarOpen} name={dashboardData?.username}/>
         
          <div className="flex px-12  py-6 gap-3 lg:gap-3 text-black-500 border-b ">
          {videosection.map((level) => (
                    <h2
                      key={level}
                      className={`cursor-pointer px-5 py-3 rounded-2xl text-[16px] font-medium border-2 
                      ${selectVideo === level ? "text-black  bg-[#FBE5FF] border-[#E866FF] " : " text-[#636369] border-transparent"}`}
                      onClick={() => setSelectVideo(level)}
                    >
                      {/* bg-[#FBE5FF] px-4 py-3 border-[#E866FF] border-2 rounded-2xl  */}
                      {level}
                    </h2> 
          ))}
                </div>

         
       {selectVideo === "All" && <Allvideo/>}
       {selectVideo === "Coding" && <Codingvideo/>}
       {selectVideo === "Gaming" && <Gamingvideo/>}
       {selectVideo === "Multimedia" && <MultiVideo/>}
       {selectVideo === "Robotics and IOT" && <RobotVideo/>}
       {selectVideo === "Aritificial Intelligence" && <Artificialvideo/> }
        </div>
      </div>
    </>

    )
}

export default Page;