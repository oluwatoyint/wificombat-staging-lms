"use client";
import { Button } from "@/app/components/base-components/Button";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import { useGetAllQuotes } from "@/app/hooks/school_admin/useGetAllQuotes";
import { PlusIcon } from "@/app/icons";
import { cn } from "@/app/utils/cn";
import { terms } from "@/app/utils/terms";
import Link from "next/link";
import React, { Fragment, useState } from "react";

const AllQuotesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();

  const { quotes, loadingQuotes } = useGetAllQuotes();

  return (
    <Fragment>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative `}>
        <div
          className={`${
            toggleSidebar ? "lg:pl-36" : "lg:pl-64"
          } transition-all duration-500 ease-in-out`}
        >
          <DashboardHeader setSidebarOpen={setSidebarOpen} />
          <article className="px-4 sm:px-6 lg:px-8 space-y-10 pb-10 mt-8 flex flex-col justify-center">
            <div className="grid grid-cols-1 min-[540px]:grid-cols-2 min-[997px]:grid-cols-3 min-[1380px]:grid-cols-4 gap-y-6 gap-x-3">
              {loadingQuotes
                ? Array.from({ length: 5 }, (_, idx) => (
                    <div
                      key={idx}
                      className="border px-3 py-4 rounded-2xl flex flex-col gap-3 animate-pulse"
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
                  quotes?.map((quote: any) => (
                    <div
                      key={quote?.id}
                      className="border px-3 py-4 rounded-2xl flex flex-col gap-3"
                    >
                      <div className="flex flex-col gap-2">
                        <h3
                          className="text-xl font-semibold text-[#131314] line-clamp-1"
                          title={quote?.course_pathway?.title}
                        >
                          {quote?.course_pathway?.title}
                        </h3>
                        <p className="text-base font-normal text-[#636369]">
                          Term:
                          {
                            terms?.find((term) => term?.value === quote?.term)
                              ?.name
                          }
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
        </div>
      </div>
    </Fragment>
  );
};

export default AllQuotesPage;
