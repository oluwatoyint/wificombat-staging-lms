"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import Image from "next/image";
import { useState } from "react";
import { TbJewishStarFilled } from "react-icons/tb";
import { BiSolidEdit } from "react-icons/bi";
import { SlSettings } from "react-icons/sl";
import ProfileInfo from "@/app/components/Dashboard/Profile/profile-info";
import { getCookies } from "cookies-next";
import { UserProfileView } from "./_components/UserProfileView";
import { TeacherProfileView } from "./_components/TeacherProfileView";
import { StudentProfileView } from "./_components/StudentProfileView";
import { AdminProfileView } from "./_components/AdminProfileView";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/auth-interceptor";
import Loader from "@/app/utils/loader";
import { useGetProfileInfo } from "@/app/hooks/profile/useGetProfileInfo";

const Page = () => {
  const { dashboardData } = useDashboardStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  const role = getCookies()?.role;
  const user_id = getCookies()?.user_id;
  // getting the user profile details function and logic here...
  const { profileInfo, loadingProfileInfo } = useGetProfileInfo();
  //getting the recent activities
  const { data: recentActivities, isLoading: loadingActivities } = useQuery({
    queryKey: ["recent-activities"],
    queryFn: async () => {
      const res = await api.get("/recent-activities");
      return res.data?.data;
    },
    select: (data) => data,
    staleTime: 2500,
  });
  //

  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        {/* Static sidebar for desktop */}

        {/* header/ MAIN SECTION Start */}
        <div
          className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out mb-[40px]`}
        >
          <DashboardHeader
            setSidebarOpen={setSidebarOpen}
            name={dashboardData?.username}
          />

          {profileInfo && recentActivities && role === "user" ? (
            <UserProfileView
              recentActivities={recentActivities}
              profileInfo={profileInfo}
            />
          ) : profileInfo && recentActivities && role === "teacher" ? (
            <TeacherProfileView
              recentActivities={recentActivities}
              profileInfo={profileInfo}
            />
          ) : profileInfo && recentActivities && role === "student" ? (
            <StudentProfileView
              recentActivities={recentActivities}
              profileInfo={profileInfo}
            />
          ) : profileInfo && recentActivities && role === "school_admin" ? (
            <AdminProfileView
              recentActivities={recentActivities}
              profileInfo={profileInfo}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
