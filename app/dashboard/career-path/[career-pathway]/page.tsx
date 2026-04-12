"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { UserCodingPathwayView } from "../_components/UserCodingPathwayView";
import { StudentCodingPathwayView } from "../_components/StudentCodingPathwayView";
import { TeacherCodingPathwayView } from "../_components/TeacherCodingPathwayView";
import { AdminCodingPathwayView } from "../_components/AdminCodingPathwayView";
import { ContentLoading1 } from "@/app/components/loading-uis/ContentLoading1";
import { useParams } from "next/navigation";
import { useCareerPathways } from "@/app/hooks/career-pathways/useCareerPathways";
import { moduleData } from "@/app/mock-data/module-lessons";

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  //
  const role = getCookie("role");
  const params = useParams();
  const path_id = params["career-pathway"];
  //
  const { courses, loadingCourses } = useCareerPathways({
    path_id: path_id as string,
  });
  //
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  //
  //
  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative `}>
        <div
          className={`${
            toggleSidebar ? "lg:pl-36" : "lg:pl-64"
          } transition-all duration-500 ease-in-out`}
        >
          <DashboardHeader setSidebarOpen={setSidebarOpen} />

          {hydrated && role === "user" ? (
            <UserCodingPathwayView
              loadingCourses={loadingCourses}
              courses={courses}
            />
          ) : hydrated && role === "student" ? (
            <StudentCodingPathwayView
              loadingCourses={loadingCourses}
              courses={courses}
            />
          ) : hydrated && role === "teacher" ? (
            <TeacherCodingPathwayView
              loadingCourses={loadingCourses}
              courses={courses}
            />
          ) : hydrated && role === "school_admin" ? (
            <AdminCodingPathwayView />
          ) : (
            <ContentLoading1 />
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
