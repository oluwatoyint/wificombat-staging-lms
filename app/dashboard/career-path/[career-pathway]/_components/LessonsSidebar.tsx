import React from "react";
import { LessonItem } from "./LessonItem";
import { ModulePlanDropDown } from "./ModulePlanDropDown";
import { ModuleResponse } from "@/app/types/module-prop";
import { AssignmentDropDown } from "./AssignmentDropDown";

export const LessonsSidebar = ({ data }: { data: ModuleResponse }) => {
  return (
    <div className="overflow-auto min-h-[calc(100dvh-200px)] max-h-[calc(100dvh-200px)] scroll-style pb-20 pr-2">
      <ModulePlanDropDown data={data} />
      <div className="flex flex-col gap-4 mt-4">
        {data?.module_lessons?.map((item: any, index: any) => (
          <LessonItem key={index} item={item} index={index} />
        ))}
      </div>
      <AssignmentDropDown data={data} />
    </div>
  );
};
