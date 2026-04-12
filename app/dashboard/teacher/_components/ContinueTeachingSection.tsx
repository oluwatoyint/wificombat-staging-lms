import Image from "next/image";
import React from "react";

export const ContinueTeachingSection = ({
  percentage,
}: {
  percentage: number;
}) => {
  return (
    <div>
      <h3 className="font-bold text-2xl md:text-3xl mb-5">Continue Teaching</h3>
      {/*  */}
      <div className="flex w-full flex-wrap sm:flex-nowrap gap-4">
        <Image
          src={"/assets/computer-img.svg"}
          alt="continue teaching image"
          width={80}
          height={80}
        />
        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl sm:text-2xl">
              Coding Fundamental 1
            </h3>
            <p className="text-primary font-bold text-xl">{percentage}%</p>
          </div>
          <div className="flex gap-2 text-black/70 items-center flex-wrap">
            <p>Module 1</p>
            <p>Lesson 2</p>
          </div>
          <div className="bg-primary-100 h-[8px] w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
