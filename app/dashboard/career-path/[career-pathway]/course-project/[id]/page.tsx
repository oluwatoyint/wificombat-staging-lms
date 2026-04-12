"use client";
import DashboardPageWrapper from "@/app/components/base-components/DashboardPageWrapper";
import { BackIcon } from "@/app/icons";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import api from "@/app/utils/auth-interceptor";
import { cn } from "@/app/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitProjectView } from "../components/SubmitProjectView";
import { ProjectDescription } from "../components/ProjectDescription";
import { VideoGuide } from "../components/VideoGuide";

type view = "video" | "reading" | "submit";

const CourseProjectPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { getShade } = usePrimaryColor();

  const [view, setView] = useState<view>("video");

  const { data: project, isLoading: loadingProject } = useQuery({
    queryKey: ["course-project", id],
    queryFn: async () => {
      const res = await api.get(`/projects/${id}`);
      return res.data?.data;
    },
    enabled: !!id,
  });

  console.log("Project Data:", project);

  return (
    <DashboardPageWrapper className="mt-0 px-0">
      <div
        className={cn(
          "grid grid-cols-1 xl:h-screen xl:overflow-y-hidden",
          view !== "submit" && " gap-3 xl:grid-cols-[320px_1fr]"
        )}
      >
        {view !== "submit" && (
          <div className="px-2 bg-white h-full overflow-y-auto">
            <div className="flex items-start gap-2 py-5">
              <span className="cursor-pointer">
                <BackIcon onClick={() => router.back()} />
              </span>
              <div className="flex flex-col gap-1">
                {loadingProject ? (
                  <div className="h-[20px] w-full bg-gray-200 rounded-md" />
                ) : (
                  project && (
                    <h4 className="font-bold text-base sm:text-lg text-black">
                      {project?.course?.title}
                    </h4>
                  )
                )}
                {loadingProject ? (
                  <div className="h-[14px] w-full bg-gray-200 rounded-md" />
                ) : (
                  project && <p className="text-base text-gray-600">Project</p>
                )}
              </div>
            </div>

            <div className="px-14 flex flex-col gap-4">
              <div
                className="flex flex-col gap-2 cursor-pointer select-none"
                onClick={() => setView("video")}
              >
                <h3
                  style={{
                    color: view === "video" ? getShade(500) : "#323234",
                  }}
                  className="font-semibold text-sm"
                >
                  Project Video guide
                </h3>
                <p className="text-xs text-black-400">Video</p>
              </div>

              <div
                className="flex flex-col gap-2 cursor-pointer select-none"
                onClick={() => setView("reading")}
              >
                <h3
                  style={{
                    color: view === "reading" ? getShade(500) : "#323234",
                  }}
                  className="font-semibold text-sm"
                >
                  Project Description
                </h3>
                <p className="text-xs text-black-400">Reading</p>
              </div>

              <div
                className="flex flex-col gap-2 cursor-pointer select-none"
                onClick={() => setView("submit")}
              >
                <h3 className="font-semibold text-sm">Submit Project</h3>
              </div>
            </div>
          </div>
        )}
        {/*  */}
        <div className={cn("p-10 bg-[#F9F9FF] overflow-y-auto no-scrollbar")}>
          {project && view === "submit" ? (
            <SubmitProjectView setView={setView} project={project} />
          ) : project && view === "reading" ? (
            <ProjectDescription project={project} />
          ) : project && view === "video" ? (
            <VideoGuide project={project} />
          ) : (
            <p>Please wait...</p>
          )}
        </div>
      </div>
    </DashboardPageWrapper>
  );
};

export default CourseProjectPage;
