import { Mdiv } from "@/app/libs/framer-exports";
import { LibraryItem } from "@/app/types/library-type";
import { getVideoEmbedUrl } from "@/app/utils/getEmbedUrl";
import React from "react";

export const LibraryCard = ({ library }: { library: LibraryItem }) => {
  switch (library?.library_type) {
    case "video":
      return (
        <Mdiv
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col gap-3"
        >
          <div className="h-[200px] overflow-hidden border border-gray-400 rounded-xl">
            <iframe
              src={getVideoEmbedUrl(
                library?.video_embed || "Invalid Video Url"
              )}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg md:text-xl text-black-500 line-clamp-2">
              {library?.title}
            </h3>
            <p className="font-normal text-sm sm:text-base text-black-550 line-clamp-3">
              {library?.description}
            </p>
          </div>
        </Mdiv>
      );
    case "slides":
      return (
        <div>
          <p>Not worked (no data to use to work on it)</p>
        </div>
      );
    default:
      return <div>Library type not supported</div>;
  }
};
