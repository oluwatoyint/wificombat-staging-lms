import React from "react";
import { LoadSpinner } from "./LoadSpinner";

export const SpinnerCoverUi = ({ text }: { text?: string }) => {
  return (
    <div className="absolute rounded-full flex justify-center items-center z-[87] inset-0 bg-black/65 backdrop-blur-sm h-full w-full overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-2">
        <LoadSpinner />
        <p className="text-white font-semibold text-xs">{text}</p>
      </div>
    </div>
  );
};
