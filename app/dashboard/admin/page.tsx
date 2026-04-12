import React from "react";
import { StatisticsGridList } from "./_components/StatisticsGridList";
import { SchoolPerfomance } from "./_components/SchoolPerfomance";
import { TopStudents } from "./_components/TopStudents";
import { RecentActivities } from "./_components/RecentActivities";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-5">
      <StatisticsGridList />
      <div className="grid grid-cols-1 min-[576px]:grid-cols-[2fr_1fr] gap-5">
        <SchoolPerfomance />
        <TopStudents />
      </div>
      <RecentActivities />
    </div>
  );
};

export default AdminDashboard;
