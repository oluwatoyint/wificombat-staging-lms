import Image from "next/image";
import React from "react";

export const StatisticsGridList = () => {
  return (
    <div className="grid grid-cols-1 min-[476px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="flex gap-3 p-3 rounded-[10px] border border-[#E5E5E6] items-start">
        <Image width={30} height={30} src="/assets/totalUsers.svg" alt="" />
        <div>
          <p className="text-sm">Number of student</p>
          <p className="font-[700] text-[40px] my-[-5px] text-[#131314]">20</p>
          <p className={"text-red-500"}>20</p>
        </div>
      </div>
      <div className="flex gap-3 p-3 rounded-[10px] border border-[#E5E5E6] items-start">
        <Image width={30} height={30} src="/assets/folder-icon.svg" alt="" />
        <div>
          <p className="text-sm">Average Progress</p>
          <p className="font-[700] text-[40px] my-[-5px] text-[#131314]">20</p>
          <p className={"text-red-500"}>35</p>
        </div>
      </div>
      <div className="flex gap-3 p-3 rounded-[10px] border border-[#E5E5E6] items-start">
        <Image width={30} height={30} src="/assets/open-book-icon.svg" alt="" />
        <div>
          <p className="text-sm">Courses Completed</p>
          <p className="font-[700] text-[40px] my-[-5px] text-[#131314]">50</p>
          <p className={"text-red-500"}>45</p>
        </div>
      </div>
      <div className="flex gap-3 p-3 rounded-[10px] border border-[#E5E5E6] items-start">
        <Image width={30} height={30} src="/assets/info-icon.svg" alt="" />
        <div>
          <p className="text-sm">Need Attention</p>
          <p className="font-[700] text-[40px] my-[-5px] text-[#131314]">12</p>
          <p className={"text-red-500"}>48</p>
        </div>
      </div>
    </div>
  );
};
