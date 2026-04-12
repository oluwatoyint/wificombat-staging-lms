"use client";
import { useGetDashboardStats } from "@/app/hooks/user/useGetDashboardStats";
import { useGetMyBadges } from "@/app/hooks/user/useGetMyBadges";
import Image from "next/image";

export const StatisticsGridList = () => {
  //
  const { dashboardStats, loadingDashboardStats } = useGetDashboardStats();
  const { myBadges, loadingMyBadges } = useGetMyBadges();
  //
  return (
    <div className="grid grid-cols-1 min-[476px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="bg-[#E6F6FE] rounded-lg p-5 flex justify-center items-center flex-col gap-3">
        <Image
          src="/assets/open-book-colored.svg"
          alt="courses completed icon"
          width={64}
          height={64}
        />
        <p className="text-sm text-black/80">Courses completed</p>
        {loadingDashboardStats && (
          <div className="h-[15px] w-[15px] bg-gray-200 animate-pulse" />
        )}
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {dashboardStats?.total_course_completed}
        </h2>
      </div>
      {/*  */}
      <div className="bg-[#FBE5FF] rounded-lg p-5 flex justify-center items-center flex-col gap-3">
        <Image
          src="/assets/folder-colored.svg"
          alt="courses completed icon"
          width={64}
          height={64}
        />
        <p className="text-sm text-black/80">Completed Projects</p>
        {loadingDashboardStats && (
          <div className="h-[15px] w-[15px] bg-gray-200 animate-pulse" />
        )}
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {dashboardStats?.total_course_completed}
        </h2>
      </div>
      {/*  */}
      <div className="bg-[#FFF1CC] rounded-lg p-5 flex justify-center items-center flex-col gap-3">
        <Image
          src="/assets/cup-colored.svg"
          alt="courses completed icon"
          width={64}
          height={64}
        />
        <p className="text-sm text-black/80">Badges Earned</p>
        {loadingMyBadges && (
          <div className="h-[15px] w-[15px] bg-gray-200 animate-pulse" />
        )}
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {myBadges?.length}
        </h2>
      </div>
      {/*  */}
      <div className="bg-[#F2F2F3] rounded-lg p-5 flex justify-center items-center flex-col gap-3">
        <Image
          src="/assets/certificate-colored.svg"
          alt="courses completed icon"
          width={64}
          height={64}
        />
        <p className="text-sm text-black/80">Certificates</p>
        {loadingDashboardStats && (
          <div className="h-[15px] w-[15px] bg-gray-200 animate-pulse" />
        )}
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {dashboardStats?.total_certificates_earned}
        </h2>
      </div>
      {/*  */}
    </div>
  );
};
