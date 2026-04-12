import React from "react";
import { CircularProgressbar } from "./CircleProgressbar";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";

export const CourseProgress = ({ courses }: { courses: any }) => {
  const { getShade } = usePrimaryColor();
  const chartData = courses?.data?.map((item: any, index: number) => {
    return {
      name: item?.title,
      value: item?.user_course_progress,
      color: index % 2 === 0 ? "#f4a900" : getShade(400),
    };
  });
  const totalValue = chartData?.reduce(
    (acc: any, curr: any) => acc + curr?.value,
    0
  );
  const averageValue =
    chartData?.length > 0 ? totalValue / chartData?.length : 0;
  return (
    <div className="rounded-xl font-bold text-lg sm:text-xl border">
      <h3 className="border-b p-5">Course Progress</h3>
      <div className="w-full flex justify-center items-center">
        <CircularProgressbar
          strokeWidth={24}
          size={200}
          percentage={averageValue}
        />
      </div>
    </div>
  );
};
