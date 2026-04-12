import React from "react";
import { CircleProgressbar } from "./CircleProgressbar";

export const CourseProgressBox = () => {
  return (
    <div className="rounded-xl font-bold text-lg sm:text-xl border">
      <h3 className="border-b p-5">Course Progress</h3>
      <div className="w-full flex justify-center items-center">
        <CircleProgressbar strokeWidth={24} size={200} percentage={45} />
      </div>
    </div>
  );
};
