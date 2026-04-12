import { Button } from "@/app/components/base-components/Button";
import { useGetAllQuotes } from "@/app/hooks/school_admin/useGetAllQuotes";
import { PlusIcon } from "@/app/icons";
import { cn } from "@/app/utils/cn";
import { terms } from "@/app/utils/terms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const AdminPathwayView = () => {
  const router = useRouter();
  //
  const { quotes, loadingQuotes } = useGetAllQuotes();
  //
  return (
    <article className="px-4 sm:px-6 lg:px-8 space-y-10 pb-10 mt-8 flex flex-col justify-center">
      <div className="flex items-center gap-2 justify-between flex-wrap">
        <h3 className="font-semibold text-lg sm:text-xl text-primary">
          Recent Request
        </h3>
        <div className="flex items-center gap-6">
          <Link
            href={"/dashboard/quotes/all"}
            className="text-[#056494] underline underline-offset-1 font-semibold text-lg sm:text-xl"
          >
            History
          </Link>
          <Button
            label="Request Quote"
            onClick={() => router.push("/request-quote")}
          />
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col gap-5">
        {loadingQuotes
          ? Array.from({ length: 5 }, (_, idx) => (
              <div
                key={idx}
                className="border px-5 py-6 rounded-2xl flex justify-between items-center gap-6 flex-wrap animate-pulse"
              >
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <div className="wavy-loader h-6 w-48 bg-gray-200 rounded"></div>
                  <div className="wavy-loader h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="wavy-loader h-8 w-24 bg-gray-200 rounded-full"></div>
                </div>
                <div className="wavy-loader h-10 w-40 bg-gray-200 rounded-lg"></div>
              </div>
            ))
          : quotes &&
            quotes?.slice(0, 5)?.map((quote: any) => (
              <div
                key={quote?.id}
                className="border px-5 py-6 rounded-2xl flex justify-between items-center gap-6 flex-wrap"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-[#131314] line-clamp-1">
                    {quote?.course_pathway?.title}
                  </h3>
                  <p className="text-base font-normal text-[#636369]">
                    Term:{" "}
                    {terms?.find((term) => term?.value === quote?.term)?.name}
                  </p>
                  <p
                    className={cn(
                      "capitalize w-fit text-[10px] px-4 py-2 rounded-full",
                      quote?.status === "pending"
                        ? "text-yellow-700 bg-yellow-100"
                        : quote?.status === "approved"
                        ? "text-green-700 bg-green-100"
                        : "text-red-600 bg-red-100"
                    )}
                  >
                    {quote?.status}
                  </p>
                </div>
                <Link
                  href={`/dashboard/career-path/admin/quote/${quote?.id}`}
                  className={cn(
                    quote?.status !== "approved" && "pointer-events-none"
                  )}
                >
                  <Button
                    label="Add Students"
                    disabled={quote?.status !== "approved"}
                    className="!flex-row-reverse !gap-4"
                    icon={<PlusIcon />}
                  />
                </Link>
              </div>
            ))}
      </div>
    </article>
  );
};
