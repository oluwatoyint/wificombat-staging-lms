import Image from "next/image";
import { Fragment } from "react";
import { StatisticsGridList } from "./_components/StatisticsGridList";
import { ClassPerfomanceBox } from "./_components/ClassPerfomanceBox";
import { CourseProgressBox } from "./_components/CourseProgressBox";
import { TopStudentsBox } from "./_components/TopStudentsBox";
import { ContinueTeachingSection } from "./_components/ContinueTeachingSection";

const TeacherDashboard = () => {
  return (
    <Fragment>
      <StatisticsGridList />
      <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] min-[1140px]:grid-cols-[2fr_1fr_1.2fr] gap-3">
        <ClassPerfomanceBox />
        <CourseProgressBox />
        <TopStudentsBox />
      </div>
      <ContinueTeachingSection percentage={40} />
    </Fragment>
  );
};

export default TeacherDashboard;
