import React from "react";
import { CourseProgressChart } from "./CourseProgressChart";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";

export const CourseProgress = ({ courses }: { courses: any }) => {
  const { getShade } = usePrimaryColor();
  const chartData = courses?.data?.map((item: any, index: number) => {
    return {
      name: item?.title,
      value: item?.user_course_progress,
      color: index % 2 === 0 ? "#f4a900" : getShade(500),
    };
  });
  const hasData = chartData?.some((item: any) => item?.value > 0);
  return (
    <div className="rounded-xl font-bold text-lg sm:text-xl border">
      <h3 className="border-b p-5">Course Progress</h3>
      <div className="w-full flex justify-center items-center">
        {hasData ? (
          <CourseProgressChart data={chartData} />
        ) : (
          <p className="text-sm mx-auto h-[110px] w-[110px] mt-6 rounded-full flex justify-center items-center text-center bg-gray-100 animate-pulse">
            No Data to display
          </p>
        )}
      </div>
    </div>
  );
};
