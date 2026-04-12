"use client";
import React, { useEffect, useState } from "react";
import { StatisticsGridList } from "./_components/StatisticsGridList";
import { ContinueLearningSection } from "./_components/ContinueLearningSection";
import { CoursesStreakGraph } from "./_components/CoursesStreakGraph";
import { CourseProgress } from "./_components/CourseProgress";
import { BiChevronDown } from "react-icons/bi";
import { cn } from "@/app/utils/cn";
import { useCareerPathways } from "@/app/hooks/career-pathways/useCareerPathways";
import { periods } from "@/app/utils/vars";
import { useGetLearningStreak } from "@/app/hooks/user/useGetLearningStreak";
import { useGetDashboardPathways } from "@/app/hooks/user-nav/useGetDashboardPathways";

const UserDashboard = () => {
  //
  const [showPeriods, setShowPeriods] = useState<boolean>(false);
  const [showPaths, setShowPaths] = useState<boolean>(false);
  const [selectedPath, setSelectedPath] = useState({ id: "", title: "" });
  const [period, setPeriod] = useState({
    name: "This week",
    value: "this_week",
  });
  const { pathways } = useGetDashboardPathways();
  //
  useEffect(() => {
    if (pathways) {
      setSelectedPath({ id: pathways[0]?.id, title: pathways[0]?.title });
    }
  }, [pathways]);
  //
  const { learningStreak } = useGetLearningStreak({
    pathway_id: selectedPath?.id,
    period: period?.value,
  });
  //
  const { courses } = useCareerPathways({ path_id: selectedPath?.id });
  //
  return (
    <div className="flex flex-col gap-[30px]">
      <StatisticsGridList />
      {/*  */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* paths dropdown */}
        <div className="relative select-none">
          {/* paths dropdown trigger */}
          <div
            className="border flex items-center gap-2 cursor-pointer w-fit px-2 py-2 rounded-md"
            onClick={() => setShowPaths(!showPaths)}
          >
            <span className="text-sm">
              {selectedPath?.title || "Select Pathway"}
            </span>
            <span>
              <BiChevronDown />
            </span>
          </div>
          {/* paths dropdown list */}
          <div
            className={cn(
              "absolute top-[45px] left-0 flex flex-col transition-all duration-300 overflow-hidden w-fit bg-white rounded-md",
              showPaths ? "border" : "border-none"
            )}
            style={{ height: showPaths ? "90px" : "0px" }}
          >
            {pathways?.map((item: any) => (
              <div
                key={item?.id}
                className="cursor-pointer text-sm py-2 hover:bg-gray-50 px-1"
                onClick={() => {
                  setSelectedPath({ id: item?.id, title: item?.title });
                  setShowPaths(!showPaths);
                }}
              >
                {item?.title}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*  */}
      <div className="grid grid-cols-1 gap-6 min-[887px]:grid-cols-[2fr_1fr]">
        <CoursesStreakGraph
          chartData={{
            labels: learningStreak?.labels,
            datasets: learningStreak?.datasets,
          }}
          period={period?.name}
          setPeriod={setPeriod}
          setShowPeriods={setShowPeriods}
          showPeriods={showPeriods}
        />
        <CourseProgress courses={courses} />
      </div>
      <ContinueLearningSection courses={courses?.data} />
    </div>
  );
};

export default UserDashboard;
