import React from "react";

export const LibraryLoadingCard = () => {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-xs border rounded-xl">
      {/* Thumbnail */}
      <div className="w-full h-[200px] rounded-xl bg-gray-200 animate-pulse" />

      {/* Content */}
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />{" "}
        {/* Title */}
        <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />{" "}
        {/* Subtitle */}
        <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />{" "}
        {/* Description */}
        {/* Progress bar */}
        <div className="mt-3">
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-2 bg-gray-500 rounded animate-pulse w-[30%]" />
          </div>
          <div className="text-xs text-gray-400 mt-1 text-right">00%</div>
        </div>
      </div>
    </div>
  );
};
