"use client";

import { Dispatch, SetStateAction } from "react";
import { HiBars3 } from "react-icons/hi2";
import Header from "./Header";
import { useGetProfileInfo } from "@/app/hooks/profile/useGetProfileInfo";

type Props = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  name?: string;
};

const DashboardHeader = ({ setSidebarOpen, name }: Props) => {
  //
  // getting the user profile details function and logic here...
  const { profileInfo, loadingProfileInfo } = useGetProfileInfo();
  //
  return (
    <div className="sticky top-0 z-40 flex shrink-0 items-center gap-x-4 bg-white sm:gap-x-6">
      <button
        type="button"
        className="p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <HiBars3 size={30} className="h-8 w-8" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <Header
        profile_pic={profileInfo?.profile_pic?.media}
        name={`${profileInfo?.first_name || ""} ${
          profileInfo?.last_name || ""
        }`}
        teacherName={profileInfo?.first_name}
      />
    </div>
  );
};

export default DashboardHeader;
