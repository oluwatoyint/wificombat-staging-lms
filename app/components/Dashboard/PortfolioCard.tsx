"use client";
import { merriweather } from "@/app/fonts";
import Image from "next/image";
import { HeaderProps } from "./ReportCard";
import { ProgressCircle } from "@/app/utils/progress-bar";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuCalendarDays } from "react-icons/lu";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";
import { useMemo, useRef } from "react";
import dayjs from "dayjs";
import { Button } from "../base-components/Button";
import { useGetStudentProgress } from "@/app/hooks/student/useGetStudentProgress";
import { useGetProjects } from "@/app/hooks/student/useGetProjects";
import { useGetProfileInfo } from "@/app/hooks/profile/useGetProfileInfo";

type PortfolioCardProps = {
  title: string;
  desc: string;
  date: string;
  teams: string;
  link: string;
};

const PortoflioHeader = ({ children }: HeaderProps) => {
  return (
    <header
      className={`mt-9 md:mt-12 w-full py-3 px-4 md:px-6 lg:px-8 bg-black-500 text-left text-white
      ${merriweather.className} text-lg md:text-xl font-bold capitalize`}
    >
      {children}
    </header>
  );
};

const Card = ({ title, desc, date, link, teams }: PortfolioCardProps) => {
  return (
    <article
      className="relative w-full py-8 px-4 md:px-8 flex flex-col
        border border-black-200 rounded-xl"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm mt-3">{desc}</p>

      <div className="mt-4 text-sm flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <HiOutlineUserGroup />
          <h4>Team Members:</h4>
        </div>
        <div className="flex flex-wrap gap-2 items-center">{teams}</div>
      </div>

      <div className="mt-4 text-sm flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <LuCalendarDays />
          <h4>{date}</h4>
        </div>

        <div className="flex items-center gap-2">
          <FaLink />
          <Link href={link} className="text-blue-500">
            {link}
          </Link>
        </div>
      </div>
    </article>
  );
};

export const PortfolioCard = () => {
  // const [progress, setProgress] = useState(65);
  const { profileInfo, loadingProfileInfo } = useGetProfileInfo();
  //
  const { studentProgress, loadingStudentProgress } = useGetStudentProgress();
  const { projects, loadingProjects } = useGetProjects();
  //
  // projects of content type of project
  const project_projects = useMemo((): any[] => {
    if (projects && projects?.results) {
      return projects?.results?.filter(
        (item: any) => item?.content_type === "project"
      );
    }
    return [];
  }, [projects]);
  // projects of content type of competition
  const competition_projects = useMemo((): any[] => {
    if (projects && projects?.results) {
      return projects?.results?.filter(
        (item: any) => item?.content_type === "competition"
      );
    }
    return [];
  }, [projects]);
  // projects of content type of techprenuership
  const tech_projects = useMemo((): any[] => {
    if (projects && projects?.results) {
      return projects?.results?.filter(
        (item: any) => item?.content_type === "techpreneurship"
      );
    }
    return [];
  }, [projects]);
  //

  // this logic handles converting an ddownloading the view to pdf
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
    <section>
      <div
        ref={reportReference}
        className="my-8 md:my-10 w-[95%] bg-white text-black-500 mx-auto "
      >
        {/* HEADER */}
        <header className="w-full py-3 px-4 md:px-6 lg:px-8 bg-black-500 text-white flex items-center justify-between">
          <div className="basis-[30%] lg:basis-[35%]">
            <Image
              src={`/assets/auth/E-learn_logo_sidebar.png`}
              alt={`logo`}
              width={93}
              height={93}
              className="w-[60px] my-auto lg:w-[93px] object-contain text-neutral-400"
            />
          </div>

          <div className="basis-[70%] lg:basis-[65%]">
            <div className="w-fit">
              {loadingProfileInfo && (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-[200px] h-5 bg-gray-200 animate-pulse rounded-sm" />
                  <div className="w-[130px] h-2 bg-gray-200 animate-pulse rounded-sm" />
                </div>
              )}
              {profileInfo && (
                <h2
                  className={`${merriweather.className} font-bold text-2xl lg:text-3xl`}
                >{`${profileInfo?.first_name} ${profileInfo?.last_name}`}</h2>
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

        {/* STUDENT INFO */}
        <div className="px-5 lg:px-7">
          <article>
            <h2
              className={`${merriweather.className} font-bold text-2xl lg:text-3xl mt-8`}
            >
              Bio
            </h2>
            {loadingProfileInfo && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-[250px] h-5 bg-gray-200 animate-pulse rounded-sm" />
                <div className="w-[150px] h-2 bg-gray-200 animate-pulse rounded-sm" />
              </div>
            )}
            {profileInfo && (
              <p
                className="mt-3 styleElements"
                dangerouslySetInnerHTML={{
                  __html: profileInfo?.bio || "N/A...",
                }}
              />
            )}
          </article>

          <article>
            <h2
              className={`${merriweather.className} font-bold text-2xl lg:text-3xl mt-8`}
            >
              Interest
            </h2>
            {loadingProfileInfo && (
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-5 bg-gray-200 animate-pulse rounded-sm" />
                <div className="w-[100px] h-2 bg-gray-200 animate-pulse rounded-sm" />
                <div className="w-[100px] h-2 bg-gray-200 animate-pulse rounded-sm" />
                <div className="w-[100px] h-2 bg-gray-200 animate-pulse rounded-sm" />
              </div>
            )}
            <ul className="mt-3 space-y-3 list-disc">
              {profileInfo && profileInfo?.user_interests?.length < 1 ? (
                <div>No interests yet...</div>
              ) : (
                profileInfo?.user_interests?.map(
                  (interest: string, index: number) => (
                    <li key={index} className="ml-4">
                      {interest}
                    </li>
                  )
                )
              )}
            </ul>
          </article>
          {/* STUDENT INFO */}

          {/* STUDENT PROGRESS */}
          <article>
            <PortoflioHeader>Student Progress</PortoflioHeader>

            <main className="mt-10 grid grid-cols-2 lg:grid-cols-4">
              {loadingStudentProgress &&
                Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="h-[140px] w-[140px] bg-gray-200 rounded-full animate-pulse"
                  />
                ))}
              {studentProgress && (
                <ProgressCircle
                  title="Quizzes"
                  value={studentProgress?.quiz_percentage}
                  progress={studentProgress?.quiz_percentage}
                  size={150}
                  strokeWidth={15}
                />
              )}
              {studentProgress && (
                <ProgressCircle
                  title="Assignment"
                  value={studentProgress?.assignment_percentage}
                  progress={studentProgress?.assignment_percentage}
                  size={150}
                  strokeWidth={15}
                />
              )}
              {studentProgress && (
                <ProgressCircle
                  title="Certificate"
                  value={studentProgress?.certificate_percentage}
                  progress={studentProgress?.certificate_percentage}
                  size={150}
                  strokeWidth={15}
                />
              )}
              {studentProgress && (
                <ProgressCircle
                  title="Projects"
                  value={studentProgress?.project_percentage}
                  progress={studentProgress?.project_percentage}
                  size={150}
                  strokeWidth={15}
                />
              )}
            </main>
          </article>
          {/* STUDENT PROGRESS */}

          {/* PROJECTS */}
          <article>
            <PortoflioHeader>Projects</PortoflioHeader>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {loadingProjects &&
                Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="min-h-[250px] bg-gray-200 animate-pulse rounded-md w-full"
                  />
                ))}
              {projects &&
                project_projects?.map((item: any) => (
                  <Card
                    key={item?.id}
                    desc={item?.description}
                    title={item?.title}
                    date={item?.date && dayjs(item?.date).format("dd/mm/yyyy")}
                    link={item?.link}
                    teams={item?.team_members}
                  />
                ))}
            </div>
          </article>
          {/* PROJECTS */}

          {/* COMPETITIONS */}
          <article>
            <PortoflioHeader>Competitions</PortoflioHeader>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {loadingProjects &&
                Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="min-h-[250px] bg-gray-200 animate-pulse rounded-md w-full"
                  />
                ))}
              {projects &&
                competition_projects?.map((item: any) => (
                  <Card
                    key={item?.id}
                    desc={item?.description}
                    title={item?.title}
                    date={item?.date && dayjs(item?.date).format("dd/mm/yyyy")}
                    link={item?.link}
                    teams={item?.team_members}
                  />
                ))}
            </div>
          </article>
          {/* COMPETITIONS */}

          {/* SDG AND TECHPRENEURSHIP PROJECTS */}
          <article>
            <PortoflioHeader>SDG and Techpreneurship Projects</PortoflioHeader>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {loadingProjects &&
                Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="min-h-[250px] bg-gray-200 animate-pulse rounded-md w-full"
                  />
                ))}
              {projects &&
                tech_projects?.map((item: any) => (
                  <Card
                    key={item?.id}
                    desc={item?.description}
                    title={item?.title}
                    date={item?.date && dayjs(item?.date).format("dd/mm/yyyy")}
                    link={item?.link}
                    teams={item?.team_members}
                  />
                ))}
            </div>
          </article>
          {/* SDG AND TECHPRENEURSHIP PROJECTS */}
        </div>
      </div>

      {/* BUTTON */}
      <div className="w-full flex items-center justify-center">
        <Button onClick={downloadReportPDF} label="Download Report" />
      </div>
      {/* BUTTON */}
    </section>
  );
};
