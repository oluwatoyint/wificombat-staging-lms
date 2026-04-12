"use client";
import { GreenCheckmark } from "@/app/icons";
import { Mdiv } from "@/app/libs/framer-exports";
import React from "react";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

export const CoursePurchaseSuccessfulModal = () => {
  const router = useRouter();
  return (
    <Mdiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 top-0 right-0 bottom-0 left-0 bg-modal-bg flex flex-col justify-center items-center"
    >
      <Mdiv
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="relative z-50 w-[94%] sm:w-[450px] rounded-2xl bg-white p-5"
      >
        <div className="overflow-auto max-h-[calc(100dvh-198px)] flex flex-col gap-4 items-center">
          <GreenCheckmark />
          <h3 className="text-center self-center text-lg sm:text-xl md:text-2xl font-bold text-black-500">
            Purhcase Successful
          </h3>
          <p className="text-center self-center text-base sm:text-lg font-semibold text-black-800">
            Course purchase successful, click below to go to courses or continue
            purchasing favorite courses.
          </p>
          <div className="w-full flex flex-col 576:flex-row items-center gap-4 mt-12">
            <Button
              label="Purchase more"
              className="flex-1 w-full"
              variant="outline"
              onClick={() => {
                localStorage.removeItem("course_to_purchase");
                router.push("/courses");
              }}
            />
            <Button
              label="Go to courses"
              className="!flex-row-reverse flex-1 w-full"
              onClick={() => {
                localStorage.removeItem("course_to_purchase");
                router.push("/dashboard/career-path");
              }}
            />
          </div>
        </div>
      </Mdiv>
    </Mdiv>
  );
};
