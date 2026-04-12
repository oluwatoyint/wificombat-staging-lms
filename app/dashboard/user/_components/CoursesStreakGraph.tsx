"use client";
import { InfoIcon } from "@/app/icons";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import { cn } from "@/app/utils/cn";
import { periods } from "@/app/utils/vars";
import React, { Dispatch, SetStateAction } from "react";
import { BiChevronDown } from "react-icons/bi";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
//
export const CoursesStreakGraph = ({
  chartData,
  period,
  showPeriods,
  setPeriod,
  setShowPeriods,
}: {
  chartData?: any;
  period: any;
  setPeriod: Dispatch<SetStateAction<any>>;
  showPeriods: boolean;
  setShowPeriods: Dispatch<SetStateAction<boolean>>;
}) => {
  const transformedData = chartData?.labels?.map((day: any, index: any) => {
    let entry: Record<string, any> = { day };
    chartData?.datasets?.forEach((dataset: any) => {
      entry[dataset?.label] = dataset?.data[index]; // Add each dataset's value for this day
    });
    return entry;
  });
  //
  const { getShade } = usePrimaryColor();
  //
  return (
    <div
      className="shadow-md py-5 px-3"
      style={{ width: "100%", height: "420px" }}
    >
      <h2 className="font-bold text-lg sm:text-xl text-black/90">
        Courses Streak
      </h2>
      {/* periods dropdown */}
      <div className="relative select-none mb-6 mt-2">
        {/* paths dropdown trigger */}
        <div
          className="border flex items-center gap-2 cursor-pointer w-fit px-2 py-2 rounded-md"
          onClick={() => setShowPeriods(!showPeriods)}
        >
          <span className="text-sm">{period?.name || "Select Period"}</span>
          <span>
            <BiChevronDown />
          </span>
        </div>
        {/* paths dropdown list */}
        <div
          className={cn(
            "absolute top-[45px] left-0 flex flex-col transition-all duration-300 overflow-hidden w-fit bg-white rounded-md z-50",
            showPeriods ? "border" : "border-none"
          )}
          style={{ height: showPeriods ? "160px" : "0px" }}
        >
          {periods?.map((item: any, index: number) => (
            <div
              key={index}
              className="cursor-pointer text-sm py-2 hover:bg-gray-50 px-1"
              onClick={() => {
                setPeriod({ name: item?.name, value: item?.value });
                setShowPeriods(!showPeriods);
              }}
            >
              {item?.name}
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer height={300}>
        <LineChart data={transformedData}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="day" />
          <YAxis tickFormatter={(tick) => `${tick}%`} />
          <Tooltip formatter={(value) => `${value}%`} />

          {/* Generate a line for each dataset dynamically */}
          {chartData?.datasets?.map((dataset: any, idx: any) => (
            <Line
              key={idx}
              type="monotone"
              dataKey={dataset?.label} // Use dataset label as key
              stroke={idx === 0 ? "#C400FF" : getShade(500)} // Different colors for each dataset
              strokeWidth={3}
              dot={{ fill: idx === 0 ? "#C400FF" : getShade(500), r: 5 }}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
