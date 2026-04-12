import { Button } from "@/app/components/base-components/Button";
import { Truncate } from "@/app/utils/truncate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const UserAndStudentPathwayView = ({ pathways }: { pathways: any }) => {
  const router = useRouter();
  //
  return (
    <article className="px-4 sm:px-6 lg:px-8 space-y-10 pb-10 mt-8 min-h-[300px] flex flex-col justify-center">
      {pathways?.length < 1 ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <svg
            width="60"
            height="46"
            viewBox="0 0 60 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.0003 45.3333C26.4003 43.0667 19.867 41.3333 15.3337 41.3333C10.9337 41.3333 6.40033 42.1333 2.66699 44.1333C2.40033 44.2667 2.26699 44.2667 2.00033 44.2667C1.33366 44.2667 0.666992 43.6 0.666992 42.9333V4C2.26699 2.8 4.00033 2 6.00033 1.33333C8.96033 0.4 12.2137 0 15.3337 0C20.5337 0 26.1337 1.06667 30.0003 4C33.867 1.06667 39.467 0 44.667 0C47.787 0 51.0403 0.4 54.0003 1.33333C56.0003 2 57.7337 2.8 59.3337 4V42.9333C59.3337 43.6 58.667 44.2667 58.0003 44.2667C57.7337 44.2667 57.6003 44.2667 57.3337 44.1333C53.6003 42.1333 49.067 41.3333 44.667 41.3333C40.1337 41.3333 33.6003 43.0667 30.0003 45.3333ZM27.3337 8C23.707 6.4 18.907 5.33333 15.3337 5.33333C12.1337 5.33333 8.93366 5.73333 6.00033 6.66667V37.3333C8.93366 36.4 12.1337 36 15.3337 36C18.907 36 23.707 37.0667 27.3337 38.6667V8ZM32.667 38.6667C36.2937 37.0667 41.0937 36 44.667 36C47.867 36 51.067 36.4 54.0003 37.3333V6.66667C51.067 5.73333 47.867 5.33333 44.667 5.33333C41.0937 5.33333 36.2937 6.4 32.667 8V38.6667Z"
              fill="#636369"
            />
          </svg>

          <h2 className="font-semibold w-[90%] mx-auto text-center text-gray-500">
            You do not have any active course yet, Please click the button below
            to purchase a course
          </h2>
          <Button
            onClick={() => router.push("/courses")}
            label="Purchase Course"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[576px]grid-col-2 md:grid-cols-3 gap-x-4 gap-y-6">
          {pathways?.map((item: any) => (
            <div
              key={item?.id}
              className="flex flex-col gap-2 border border-gray-400 rounded-md items-center p-4"
            >
              <div className="h-[150px]">
                <Image
                  src={item?.cover_image?.media}
                  alt={item?.title}
                  width={100}
                  height={80}
                  className="w-full object-cover object-center"
                />
              </div>
              <h3
                title={item?.title}
                className="line-clamp-1 font-semibold text-gray-700"
              >
                {item?.title}
              </h3>
              <p title={item?.description} className="text-gray-500">
                {Truncate(item?.description, 20)}
              </p>
              <Link href={`/dashboard/career-path/${item?.id}`}>
                <Button label="View Courses" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};
