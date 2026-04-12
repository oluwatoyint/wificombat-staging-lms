"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import SideBar from "../components/Dashboard/SideBar";
import Main from "../components/Dashboard/Main";
import { GoChevronDown } from "react-icons/go";
import SimpleLineChart from "../components/Dashboard/Graph";
import Piechart from "../components/Dashboard/Piechart";
import Image from "next/image";
import { raleway } from "../fonts";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { useMain } from "../context/MainContext";
import Loader from "../utils/loader";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../utils/auth-interceptor";
import { API_VERSION_ONE } from "../utils/types-and-links";
import Link from "next/link";
import { useDashboardStore } from "../context/useDashboardStore";

const getLearnColor = (age: number): string => {
  if (age >= 1 && age <= 3) return "#FBE5FF";
  if (age >= 4 && age <= 6) return "#FFF8E5";
  if (age >= 7 && age <= 12) return "#6BCAFA";
  if (age >= 13 && age <= 18) return "#0784C3";
  return "#FBE5FF";
};

const Continue = ({ userAge }: { userAge: number }) => {
  const backgroundColor = getLearnColor(userAge);
  const borderColor = getLearnColor(userAge);

  return (
    <div className="space-y-6">
      <h6 className="text-[#131314] font-bold text-2xl">Continue Learning</h6>
      <div
        style={{
          backgroundColor: backgroundColor,
          borderBlockColor: borderColor,
        }}
        className="flex flex-col gap-6 px-4 py-6  border  rounded-2xl"
      >
        {courseData.map((course) => (
          <div key={course.id} className="flex gap-7">
            {/* {/* <div className="rounded-full w-24 h-24 overflow-hidden bg-cover"> */}
            <Image
              src={course.thumbnail}
              alt={course.title}
              width={96}
              height={96}
              className="w-20 h-20 rounded-full cursor-pointer"
            />
            {/* </div> */}
            {/* <div
            className="rounded-full w-20 h-20 overflow-hidden bg-center bg-cover bg-red-500"
            style={{ backgroundImage: `url(${course.thumbnail})` }}
          /> */}
            <div className="w-full flex gap-1 justify-between flex-col">
              <div className="flex gap-4 justify-between">
                <Link href={``}>
                  <h6 className="text-[#131314] font-semibold text-lg">
                    {course.title}
                  </h6>
                </Link>

                <p className="text-black-500 text-xl">
                  <span className="font-semibold">
                    {Math.round(course.completedPercentage)}
                  </span>
                  %
                </p>
              </div>
              <div className="text-[#636369] text-sm space-x-4">
                <span>Module {course.module}</span>

                <span>Lesson {course.lesson}</span>
              </div>
              <div className="h-2 bg-[#D9D9D9] rounded w-full">
                <div
                  style={{ width: `${course.completedPercentage}%` }}
                  // style={{ width: `${0}%` }}
                  className="h-full bg-purple-500 rounded"
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { dashboardData, setDashboardData } = useDashboardStore();
  const { toggleSidebar } = useMain();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = getCookie("user_id");
  const sessionId = getCookie("session_id");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_VERSION_ONE}/dashboard/${userId}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionId}`,
            },
            // withCredentials: true,
          }
        );

        // Check if the response contains the dashboard data
        if (response.status === 200 && Array.isArray(response.data)) {
          setDashboardData(response.data[0]);
        } else {
          toast.error("Failed to fetch dashboard data.");
        }
      } catch (error: any) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data.");
        toast.error("Error fetching dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDashboardData();
    } else {
      setError("User not found.");
      setLoading(false);
    }
  }, [userId, sessionId, setDashboardData]);

  // console.log(dashboardData)

  if (loading) {
    return (
      <div className="overflow-hidden">
        <Loader noDesign />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Loader noDesign isError />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        {/* header/ MAIN SECTION Start */}
        <div
          className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out`}
        >
          <DashboardHeader
            setSidebarOpen={setSidebarOpen}
            name={dashboardData?.username}
          />

          <main className="pb-10 lg:pb-10">
            <div className="px-4 sm:px-6 lg:px-8 lg:py-6 space-y-10">
              {dashboardData && (
                <Main
                  coursesCompleted={
                    dashboardData.completed_courses
                      ? dashboardData.completed_courses
                      : "0"
                  }
                  badges={dashboardData.badge ? dashboardData.badge : "0"}
                  certificates={
                    dashboardData.certificates
                      ? dashboardData.certificates
                      : "0"
                  }
                  completedProjects={
                    dashboardData.completed_projects
                      ? dashboardData.completed_project
                      : "0"
                  }
                />
              )}

              {/* Courses section */}
              <Continue userAge={13} />
              {/* Courses section */}

              <div className="flex w-full gap-6 min-h-[390px] max-lg:flex-col">
                <div className="w-full lg:basis-[60%] shadow-md overflow-x-scroll">
                  <div className="w-full flex-1 py-4 px-5">
                    <h6 className="font-bold text-xl">Career Pathway Streak</h6>
                    <div className="flex items-center mt-2 text-[#4F4F4F]">
                      <p className="text-sm">This Week</p>
                      <span>
                        <GoChevronDown />
                      </span>
                    </div>
                  </div>
                  <hr className="mt-4" />
                  <SimpleLineChart userAge={13} />
                </div>

                <div className="w-full lg:basis-[40%] shadow-md">
                  <div className="w-full flex-1 py-4 px-5">
                    <h6 className="font-bold text-xl">
                      Career Pathway Progress
                    </h6>
                    {/* <div className="flex items-center mt-2 text-[#4F4F4F]">
                      <p className="text-sm">This Week</p>
                      <span>
                        <GoChevronDown />
                      </span>
                    </div> */}
                  </div>
                  <hr className="mt-4" />
                  <div className="flex items-center flex-col h-full gap-8 mt-8 mb-8">
                    <Piechart />

                    <div className="flex gap-2 self-start ml-5">
                      <div className="text-[#131314] text-xs flex items-center gap-[7px]">
                        <div className="w-[10px] h-[10px] rounded-full bg-purple-500 flex"></div>
                        <h6>Completed</h6>
                      </div>
                      <div className="text-[#131314] text-xs flex items-center gap-[7px]">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#E5E5E6]"></div>
                        <h6>Uncompleted</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

const courseData = [
  {
    id: 1,
    title: "Coding Fundamental 1",
    thumbnail: "/assets/dashboard/course.png",
    completedPercentage: 0,
    module: 20,
    lesson: 14,
  },
];
