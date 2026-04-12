"use client";

import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { LibraryLoadingCard } from "./LibraryLoadingCard";
import { LibraryCard } from "./LibraryCard";
import { LibraryItem } from "@/app/types/library-type";
import { Mshow } from "@/app/libs/framer-exports";
import { Fragment } from "react";

export const LibraryList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const srt = searchParams.get("srt") || "video";
  const page = searchParams.get("page") || "1";
  // states

  // get libraries
  const { data, isLoading } = useQuery({
    queryKey: ["get-libraries", srt, page],
    queryFn: async () => {
      const res = await api.get(`/library/?library_type=${srt}&page=${page}`);
      return res.data;
    },
  });
  //
  const handleNextPage = () => {
    const new_page = Number(page) + 1;
    params.set("page", new_page.toString());
    router.replace(`?${params.toString()}`);
  };

  const handlePrevPage = () => {
    const new_page = Number(page) - 1;
    params.set("page", new_page.toString());
    router.replace(`?${params.toString()}`);
  };
  //
  return (
    <Fragment>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 min-[1140px]:grid-cols-3 min-[1350px]:grid-cols-4 gap-4">
        <Mshow>
          {isLoading ? (
            Array.from({ length: 20 }, (_, idx) => (
              <LibraryLoadingCard key={idx} />
            ))
          ) : data && data?.data?.length < 1 ? (
            <div className="capitalize">No {srt} Library Available</div>
          ) : (
            data &&
            data?.data?.map((library: LibraryItem) => (
              <LibraryCard library={library} key={library?.id} />
            ))
          )}
        </Mshow>
      </div>
      {/*  */}
      {data && data?.total_pages > 1 && (
        <div className="flex justify-between items-center mt-6 mb-8 px-6">
          {data && (
            <p className="text-gray-600">
              Page {data?.current_page} of&nbsp;
              {data?.total_pages}
            </p>
          )}
          <div className="flex gap-2">
            {data && (
              <button
                disabled={!data?.previous}
                className="px-4 py-2 bg-white border border-gray-700 text-gray-700 rounded-md hover:bg-gray-300 disabled:hover:bg-white"
                onClick={handlePrevPage}
              >
                Previous
              </button>
            )}
            {data && (
              <button
                disabled={!data?.next}
                className="px-4 py-2 bg-white border border-gray-700 text-gray-700 rounded-md hover:bg-gray-300 disabled:hover:bg-white"
                onClick={handleNextPage}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};
