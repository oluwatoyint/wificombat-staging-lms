import Boy from "@/app/utils/boy";
import React from "react";
import { BiBell } from "react-icons/bi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

type Props = {
  name?: string;
};

export default function TopBar({ name }: Props) {
  return (
    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center py-7 lg:px-10 max-lg:pr-2.5 border-b border-black-50">
      <div className="text-lg lg:items-center font-semibold leading-6 text-gray-900 hidden lg:flex">
        <Boy />
        <div>
          <p>Hi, {name}</p>
          <p className="font-normal text-sm text-[#4B4B4E]">
            Please continue learning
          </p>
        </div>
      </div>

      <form className="max-w-xl ml-auto flex-1 flex items-center">
        <label
          htmlFor="search-field"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <HiOutlineMagnifyingGlass
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
            />
          </div>
          <input
            type="search"
            id="search-field"
            className="outline-none block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Search for courses, lessons, assignment...."
          />
        </div>
        <div className="flex items-center gap-3 ml-3">
          <div className="bg-[#E6F6FE] p-2 rounded-[6px]">
            <BiBell className="text-[20px]" />
          </div>
          <img
            src="/dashboard-logo.png"
            className="w-[40px] h-[40px] object-cover rounded-full"
            alt=""
          />
        </div>
      </form>
    </div>
  );
}
