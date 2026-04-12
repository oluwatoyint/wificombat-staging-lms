import { merriweather } from "@/app/fonts";
import { useReportCard } from "@/app/hooks/report-card/useReportCard";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode, useMemo, useRef } from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Bar,
} from "recharts";
import { Button } from "../base-components/Button";
import { useGetSingleCourse } from "@/app/hooks/course/useGetSingleCourse";
import { Truncate } from "@/app/utils/truncate";
import { useGetProfileInfo } from "@/app/hooks/profile/useGetProfileInfo";

export type HeaderProps = {
  children: ReactNode;
};

type CardProps = {
  children: ReactNode;
  cardTitle: string;
};

const ReportHeader = ({ children }: HeaderProps) => {
  return (
    <header
      className={`mt-9 md:mt-12 w-full py-3 px-4 md:px-6 lg:px-8 bg-primary text-white text-center
     ${merriweather.className} text-lg md:text-xl font-bold capitalize`}
    >
      {children}
    </header>
  );
};

const Card = ({ children, cardTitle }: CardProps) => {
  return (
    <article
      className="relative w-full py-8 px-4 md:px-8 flex items-center
        border border-primary-200 rounded-xl"
    >
      <div
        className="z-[4] absolute top-[-1rem] left-[36%] bg-white text-center 
            border border-primary-200 py-[5px] px-6 rounded-2xl"
      >
        {cardTitle}
      </div>
      {children}
    </article>
  );
};

const CustomLineChart = ({ data }: { data: any }) => {
  const chartData = Object.entries(data?.modules as Record<string, any>)?.map(
    ([moduleName, values]) => ({
      module: moduleName,
      badge: data?.extra_info?.total_badges_earned, // Assuming it's the same for all modules
      score: values?.total_score,
      point: data.total_points, // Needs module-specific breakdown if available
    })
  );
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        layout="vertical" // This makes the chart vertical
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" domain={[0, 160]} tickCount={9} interval={0} />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        {/* Badge (Green) */}
        <Bar dataKey="badge" barSize={8} fill="#0784C3" />
        {/* Score (Yellow) */}
        <Bar dataKey="score" barSize={8} fill="#FFB700" />
        {/* Point (Purple) */}
        <Bar dataKey="point" barSize={8} fill="#BC00DD" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export const ReportCard = () => {
  const { courseId } = useParams();
  //
  const userId = getCookie("user_id");
  // this hooks gets the reort card details
  const { myReportCardDetails, loadingMyReportCardDetails } = useReportCard({
    course_id: courseId as string,
    user_id: userId as string,
  });
  //
  const { course, loadingCourse } = useGetSingleCourse({
    course_id: courseId as string,
  });
  // this hook gets the user profile details
  const { profileInfo, loadingProfileInfo } = useGetProfileInfo();
  //
  const courseModulesStats = useMemo(() => {
    if (myReportCardDetails) {
      const data = Object.entries(
        myReportCardDetails?.modules as Record<string, any>
      )?.map(([name, values]) => ({
        name: name,
        score: values?.total_score,
      }));
      return data;
    }
    return [];
  }, [myReportCardDetails]);
  //
  const reportReference = useRef<HTMLDivElement>(null);

  const downloadReportPDF = async () => {
    if (!reportReference.current) return;

    // Dynamically import html2pdf.js on the client
    const html2pdf = (await import("html2pdf.js")).default;

    html2pdf(reportReference.current, {
      margin: 10,
      filename: `${profileInfo?.first_name || ""}${
        profileInfo?.last_name || ""
      }_report.pdf`,
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 2, scrollX: 0, scrollY: 0 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    });
  };
  //
  return (
    <div className="w-full flex flex-col items-center justify-center overflow-y-auto">
      <div
        ref={reportReference}
        className="my-8 md:my-10 w-[95%] md:w-[80%] lg:w-[70%] bg-white text-black-500 mx-auto"
      >
        {/* HEADER */}
        <header className="w-full py-3 px-4 md:px-6 lg:px-8 bg-primary text-white flex items-center justify-between">
          <div className="basis-[30%] lg:basis-[35%]">
            <Image
              src={`/assets/auth/E-learn_logo_sidebar.png`}
              alt={`logo`}
              width={90}
              height={90}
              className="w-[60px] my-auto lg:w-[93px] object-contain text-neutral-400"
            />
          </div>

          <div className="basis-[70%] lg:basis-[65%]">
            {loadingProfileInfo && (
              <div className="h-[12px] w-[200px] bg-gray-200 animate-pulse" />
            )}
            <div className="w-fit">
              {profileInfo && (
                <h2
                  className={`${merriweather.className} font-bold text-2xl lg:text-3xl`}
                >
                  {`${profileInfo?.first_name} ${profileInfo?.last_name}`}
                </h2>
              )}
              {loadingProfileInfo && (
                <div className="h-[8px] w-[210px] mt-1 bg-gray-200 animate-pulse" />
              )}
              {profileInfo && (
                <h2 className="mt-1 font-semibold text-center">
                  {profileInfo?.email}
                </h2>
              )}
            </div>
          </div>
        </header>
        {/* HEADER */}

        <div className="py-3 px-4 md:px-6 lg:px-8">
          {/* STUDENT DETAILS */}
          <div className="mt-9 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card cardTitle="Learner">
              <div className="w-full">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="">Name:</h4>
                  {loadingProfileInfo && (
                    <div className="h-[8px] w-[120px] mt-1 bg-gray-200 animate-pulse" />
                  )}
                  {profileInfo && (
                    <h4 className="font-semibold">{`${profileInfo?.first_name} ${profileInfo?.last_name}`}</h4>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <h4 className="">Email:</h4>
                  {loadingProfileInfo && (
                    <div className="h-[8px] w-[120px] mt-1 bg-gray-200 animate-pulse" />
                  )}
                  {profileInfo && (
                    <h4 className="font-semibold break-all text-right">
                      {profileInfo?.email}
                    </h4>
                  )}
                </div>
              </div>
            </Card>

            <Card cardTitle="Course">
              <div className="w-full">
                {course && (
                  <h5 title={course?.title} className="font-semibold mb-5">
                    {Truncate(course?.title, 25)}
                  </h5>
                )}
                <div className="flex items-center justify-between gap-2">
                  <h4 className="">Registration ID:</h4>
                  {course && (
                    <h4 className="font-semibold">
                      {Truncate(course?.id, 12)}
                    </h4>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <h4 className="">Course Completion Date:</h4>
                  <h4 className="font-semibold">{"N/A"}</h4>
                </div>
              </div>
            </Card>
          </div>
          {/* STUDENT DETAILS */}

          {/* RESULT ANALYSIS */}
          <section>
            <ReportHeader>Result Analysis</ReportHeader>

            <div className="mt-8 shadow-md rounded-xl">
              {myReportCardDetails && (
                <CustomLineChart data={myReportCardDetails} />
              )}
            </div>
          </section>
          {/* RESULT ANALYSIS */}

          {/* MODULE ANALYSIS */}
          <section>
            <ReportHeader>Module Analysis</ReportHeader>

            <div className="mt-9 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card cardTitle="Modules">
                <div className="w-full flex flex-col items-center justify-center text-center gap-4">
                  {courseModulesStats?.map((item, index) => (
                    <h5 key={index}>{item?.name}</h5>
                  ))}
                </div>
              </Card>

              <Card cardTitle="Modules">
                <div className="w-full flex flex-col font-semibold items-center justify-center text-center gap-4">
                  {courseModulesStats?.map((item, index) => (
                    <h5 key={index}>{item?.score}%</h5>
                  ))}
                </div>
              </Card>
            </div>
          </section>
          {/* MODULE ANALYSIS */}

          {/* FINAL SCORE */}
          <section>
            <ReportHeader>Final Score</ReportHeader>

            <div className="mt-9 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card cardTitle="Name">
                <div className="w-full flex flex-col items-center justify-center text-center gap-4">
                  <h5>Required Score</h5>
                  <h5>Your Score</h5>
                  <h5>Badge</h5>
                  <h5>Points</h5>
                </div>
              </Card>

              <Card cardTitle="Grade">
                <div className="w-full flex flex-col font-semibold items-center justify-center text-center gap-4">
                  {loadingMyReportCardDetails &&
                    Array.from({ length: 4 }, (_, index) => (
                      <div
                        key={index}
                        className="h-[10px] w-[80px] bg-gray-200 animate-pulse rounded-sm"
                      />
                    ))}
                  {myReportCardDetails && (
                    <h5>{myReportCardDetails?.extra_info?.required_score}</h5>
                  )}
                  {myReportCardDetails && (
                    <h5>{myReportCardDetails?.total_score}</h5>
                  )}
                  {myReportCardDetails && (
                    <h5>
                      {myReportCardDetails?.extra_info?.total_badges_earned}
                    </h5>
                  )}
                  {myReportCardDetails && (
                    <h5>{myReportCardDetails?.total_points}</h5>
                  )}
                </div>
              </Card>
            </div>
          </section>
          {/* FINAL SCORE */}

          {/* OUTLINE AND RECOMMENDATION */}
          <section>
            <ReportHeader>Outline And Recommendation</ReportHeader>

            <div className="mt-9 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card cardTitle="Outcome">
                <div className="w-full flex flex-col items-center justify-center text-center gap-4">
                  {"N/A"}
                </div>
              </Card>

              <Card cardTitle="Grade">
                <div className="w-full flex flex-col font-semibold items-center justify-center text-center gap-4">
                  {myReportCardDetails && (
                    <h5>{myReportCardDetails?.total_score}</h5>
                  )}
                </div>
              </Card>
            </div>

            <div className="mt-8 mb-7 w-full grid grid-cols-1">
              <Card cardTitle="Recommendation">
                <div className="w-full flex flex-col items-center justify-center text-center gap-4">
                  {"N/A"}
                </div>
              </Card>
            </div>
          </section>
          {/* OUTLINE AND RECOMMENDATION */}
        </div>
      </div>

      {/* BUTTON */}
      <div className="w-full flex items-center justify-center">
        <Button label="Download Report" onClick={downloadReportPDF} />
      </div>
      {/* BUTTON */}
    </div>
  );
};
