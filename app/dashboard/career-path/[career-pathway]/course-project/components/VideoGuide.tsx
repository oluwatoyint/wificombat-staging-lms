import React from "react";
import VideoPlayer from "../../_components/VideoPlayer";
import { ProjectProp } from "@/app/types/project-props";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";

export const VideoGuide = ({ project }: { project: ProjectProp }) => {
  const { getShade } = usePrimaryColor();
  return (
    <div className="flex flex-col gap-4">
      <VideoPlayer videoHtml={project?.video_embed} />
      <h3 className="font-semibold text-base sm:text-lg md:text-xl">
        Project Video Guide
      </h3>

      <div className="flex flex-col gap-3">
        <p className="border" style={{ borderBottomColor: getShade(500) }}>
          Transcript
        </p>
        <div
          className="styleElement"
          dangerouslySetInnerHTML={{ __html: project?.transcript }}
        />
      </div>
    </div>
  );
};
