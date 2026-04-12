"use client";
import { Mdiv, Mshow } from "@/app/libs/framer-exports";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import { cn } from "@/app/utils/cn";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

export const LibraryPageHeader = () => {
  const { getShade } = usePrimaryColor();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const srt = searchParams.get("srt") || "video";
  // states
  const [showOptions, setShowOptions] = useState<boolean>(false);
  //
  return (
    <div className="max-w-[120px]">
      <div
        className="flex w-full items-center gap-3 justify-between px-4 py-2 rounded-md text-black-500 cursor-pointer capitalize font-semibold"
        style={{ backgroundColor: getShade(100) }}
        onClick={() => setShowOptions(!showOptions)}
      >
        <span>{srt || "Sort"}</span>
        <span>
          <BiChevronDown />
        </span>
      </div>
      {/*  */}
      <Mshow>
        {showOptions && (
          <Mdiv
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border rounded-md w-full mt-1 flex flex-col gap-1"
          >
            {sort_options?.map((option, idx) => (
              <div
                key={idx}
                className={cn(
                  "py-2 px-3 cursor-pointer hover:bg-gray-100",
                  srt === option && "bg-gray-100"
                )}
                onClick={() => {
                  params.set("srt", option);
                  router.replace(`?${params?.toString()}`);
                  setShowOptions(false);
                }}
              >
                {option}
              </div>
            ))}
          </Mdiv>
        )}
      </Mshow>
    </div>
  );
};

const sort_options = ["video", "slides"];
