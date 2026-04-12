"use client";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import { getCookie } from "cookies-next";
import React, { Fragment, useEffect, useState } from "react";
import { useGetDashboardPathways } from "@/app/hooks/user-nav/useGetDashboardPathways";
import Link from "next/link";
import { BaseCircleProgressbar } from "@/app/components/base-components/BaseCircleProgressBar";
import api from "@/app/utils/auth-interceptor";
import { useParams } from "next/navigation";

type AssignmentResponse = {
  score: string,
  percentage_grade: number,
  attachment: {
    media: string,
  },
  response: string,
  feedback: string,
}

const AssignmentFeedbackPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  const { pathways } = useGetDashboardPathways();
  const { assignment } = useParams()
  const [assignementResponse, setAssignmentResponse] = useState<AssignmentResponse | null>(null);
  const role = getCookie("role");
  //
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  useEffect(() => {
    setIsHydrated(true);
    getAssignmentResponse();
  }, []);

  const getAssignmentResponse = async () => {

    try {
      const response = await api.get(`/my-learning-dashboard/assignment--submission-response/${assignment}`);
      setAssignmentResponse(response.data.data);
      console.log("Assignment Response:", response.data);
      
    } catch (error) {
      console.error("Error fetching assignment response:", error);
    }
  }
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
            <div className="flex flex-col items-center justify-center w-full h-full gap-5 p-5">
              <p className="text-[#131314] font-[600] text-[32px] text-center">Assignment Score</p>
              {
                assignementResponse && Number(assignementResponse?.score) < 50 ? (
                  <div className="flex items-center gap-3 justify-center w-full">

                    <BaseCircleProgressbar
                      percentage={Number(assignementResponse?.score) || 0}
                      size={200}
                      strokeWidth={15}
                      />
                    <p className="text-center text-[#4B4B4E] text-base sm:text-lg font-semibold">
                      Oops 😢 , you scored {assignementResponse?.score}%.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 justify-center w-full">              
                    <BaseCircleProgressbar 
                      percentage={Number(assignementResponse?.score) || 0}
                      size={200}
                      strokeWidth={15}
                      />
                      <p className="text-center text-[#4B4B4E] text-base sm:text-lg font-semibold">
                        Congratulations 🎉 , you are doing great. you scored {assignementResponse?.score}%.
                      </p>
                  </div>
                )
              }
              <p className="text-[#131314] text-[24px] font-[500] mt-5">Your Submission</p>
              <img className="w-[1200px] mx-auto" src={assignementResponse?.attachment?.media} alt="" />
              <p>{assignementResponse?.response}</p>
              <div className="mt-6">
                <p className="text-[#131314] font-[600] text-[24px] text-center">Feedback.</p>
                <p>{assignementResponse?.feedback}</p>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default AssignmentFeedbackPage;
