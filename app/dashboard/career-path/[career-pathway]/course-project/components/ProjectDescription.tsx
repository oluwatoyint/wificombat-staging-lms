import { ProjectProp } from "@/app/types/project-props";
import React from "react";

export const ProjectDescription = ({ project }: { project: ProjectProp }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-xl md:text-2xl">Project Description</h3>
      <div
        className="styleElement"
        dangerouslySetInnerHTML={{ __html: project?.description }}
      />
    </div>
  );
};
