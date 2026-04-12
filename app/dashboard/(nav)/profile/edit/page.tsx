"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import { useState } from "react";
import { getCookies } from "cookies-next";
import { UserProfileEditView } from "./_components/UserProfileEditView";
import { StudentProfileEditView } from "./_components/StudentProfileEditView";
import { TeacherProfileEditView } from "./_components/TeacherProfileEditView";
import { AdminProfileEditView } from "./_components/AdminProfileEditView";
import { Toaster } from "react-hot-toast";

import Loader from "@/app/utils/loader";
import { useGetProfileInfo } from "@/app/hooks/profile/useGetProfileInfo";

const Page = () => {
  const { dashboardData } = useDashboardStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  const [editModals, setEditModals] = useState(false);
  const role = getCookies()?.role;
  const user_id = getCookies()?.user_id;
  //
  // getting the user profile details function and logic here...
  const {profileInfo, loadingProfileInfo } = useGetProfileInfo()
  //
  return (
    <>
      <Toaster />
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        {/* Static sidebar for desktop */}
        {/* header/ MAIN SECTION Start */}
        {profileInfo && role === "user" ? (
          <UserProfileEditView
            editModals={editModals}
            setEditModals={setEditModals}
            setSidebarOpen={setSidebarOpen}
            toggleSidebar={toggleSidebar}
            profileInfo={profileInfo}
          />
        ) : profileInfo && role === "student" ? (
          <StudentProfileEditView
            editModals={editModals}
            setEditModals={setEditModals}
            setSidebarOpen={setSidebarOpen}
            toggleSidebar={toggleSidebar}
            profileInfo={profileInfo}
          />
        ) : profileInfo && role === "teacher" ? (
          <TeacherProfileEditView
            editModals={editModals}
            setEditModals={setEditModals}
            setSidebarOpen={setSidebarOpen}
            toggleSidebar={toggleSidebar}
            profileInfo={profileInfo}
          />
        ) : profileInfo && role === "school_admin" ? (
          <AdminProfileEditView
            editModals={editModals}
            setEditModals={setEditModals}
            setSidebarOpen={setSidebarOpen}
            toggleSidebar={toggleSidebar}
            profileInfo={profileInfo}
          />
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Page;
