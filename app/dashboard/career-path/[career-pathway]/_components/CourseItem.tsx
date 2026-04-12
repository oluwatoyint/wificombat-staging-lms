import { Button } from "@/app/components/base-components/Button";
import { useAddCourseModalStore } from "@/app/stores/career-pathways/useAddCourseModal";
import { useRateCourseModal } from "@/app/stores/career-pathways/useRateCourseModal";
import { useWhatWentWrong } from "@/app/stores/career-pathways/useWhatWentWrong";
import { CourseModuleProp } from "@/app/types/course-modules-prop";
import api from "@/app/utils/auth-interceptor";
import { RemoveTags } from "@/app/utils/strip-tags";
import { Truncate } from "@/app/utils/truncate";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { Fragment } from "react";
import { BiLock } from "react-icons/bi";
import { AddCourseCodeModal } from "./AddCourseCodeModal";
import { RateCourseModal } from "./RateCourseModal";
import { WhatWentWrongModal1 } from "./WhatWentWrongModal1";
import { getCookie } from "cookies-next";
import { Locked, Unlocked } from "@/app/icons";
import { CardTagWrap } from "@/app/components/base-components/CardTagWrap";

export const CourseItem = ({ course }: { course: any }) => {
  const params = useParams();
  //
  const role = getCookie("role");

  const { setOpenModal, openModal } = useAddCourseModalStore();
  const { setOpenModal: setOpenModal1, openModal: openModal1 } =
    useRateCourseModal();
  const { setOpenModal: setOpenModal2, openModal: openModal2 } =
    useWhatWentWrong();

  // function that gets the course modules
  const { data: modules, isLoading: loadingModules } = useQuery({
    queryKey: ["course-modules", course?.id],
    queryFn: async () => {
      const res = await api.get(`/my-learning-dashboard/modules/${course?.id}`);
      // const res = await api.get(`/modules/get_modules/${course?.id}`);
      return res.data;
    },
    enabled: !!course?.id,
  });
  //
  const { data: projects, isLoading: loadingCourseProjects } = useQuery({
    queryKey: ["get-course-projects", course?.id],
    queryFn: async () => {
      const res = await api.get(`/projects/get_projects/${course?.id}`);
      return res.data?.data;
    },
    enabled: !!course?.id,
  });
  //
  console.log("course projects", projects);
  //
  return (
    <Fragment>
      <div className="flex items-center flex-wrap gap-3">
        <div className="px-5 py-3 text-black-500 bg-[#FBE5FF] rounded-lg cursor-pointer font-semibold text-sm md:text-base capitalize">
          {course?.stage}
        </div>
        <div className="px-5 py-3 text-black-500 bg-[#E6F6FE] rounded-lg cursor-pointer font-semibold text-sm md:text-base capitalize">
          Level {course?.level}
        </div>
        {role === "student" && (
          <div
            onClick={() => setOpenModal(true)}
            // onClick={() => setOpenModal1(true)}
            // onClick={() => setOpenModal2(true)}
            className="px-5 py-3 text-white bg-black-500 rounded-lg cursor-pointer font-semibold text-sm md:text-base"
          >
            Add course code
          </div>
        )}
        {openModal && <AddCourseCodeModal />}
        {openModal1 && <RateCourseModal />}
        {openModal2 && <WhatWentWrongModal1 />}
      </div>
      {/*  */}
      <div className="flex justify-between items-center flex-wrap gap-5">
        <h3 className="font-semibold md:font-bold text-base min-[476px]:text-lg sm:text-xl md:text-2xl">
          {course?.title}
        </h3>
        <Link href={`/dashboard/report-card/${course?.id}`}>
          <Button
            // disabled
            label="Report Card"
          />
        </Link>
      </div>
      <div className="flex items-stretch gap-9 scrollable whitespace-nowrap">
        {loadingModules ? (
          <>
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="h-[300px] w-[296px] rounded-lg bg-gray-200 flex-shrink-0 animate-pulse"
              />
            ))}
          </>
        ) : (
          modules &&
          modules?.data?.map((module: CourseModuleProp) => {
            return (
              <CardTagWrap
                is_unlocked={module?.is_unlocked_for_user}
                href={`/dashboard/career-path/${params["career-pathway"]}/course-module/${module?.id}`}
                key={module?.id}
              >
                <div className="w-full h-[180px] overflow-hidden rounded-xl">
                  <Image
                    src={module?.cover_image?.media}
                    alt={module?.title}
                    width={100}
                    height={80}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col gap-2 p-2">
                  <div className="flex justify-between items-center gap-2 text-gray-700">
                    <h3
                      title={module?.title}
                      className="font-bold text-sm sm:text-base line-clamp-1"
                    >
                      {module?.title}
                    </h3>
                    <span>
                      {!module?.is_unlocked_for_user ? (
                        <Locked />
                      ) : (
                        <Unlocked />
                      )}
                    </span>
                  </div>
                  <h4
                    className="font-medium text-gray-600 text-base sm:text-lg styleElements"
                    dangerouslySetInnerHTML={{
                      __html: Truncate(module?.objectives, 20),
                    }}
                    title={RemoveTags(module?.objectives)}
                  />
                  <div className="flex flex-wrap gap-2 justify-between items-center text-gray-500">
                    <p className="flex items-center gap-1">
                      <span>{module?.total_lessons}</span>
                      <span>
                        {module?.total_lessons > 1 ? "Lessons" : "Lesson"}
                      </span>
                    </p>
                    <p className="flex items-center gap-1">
                      <span>{module?.total_quizzes}</span>
                      <span>
                        {module?.total_quizzes > 1 ? "Quizzes" : "Quiz"}
                      </span>
                    </p>
                    <p className="flex items-center gap-1">
                      <span>{module?.total_assignments}</span>
                      <span>
                        {module?.total_assignments > 1
                          ? "Assignments"
                          : "Assignment"}
                      </span>
                    </p>
                  </div>
                  {/*  */}
                  <div className="flex justify-between gap-3 items-center">
                    <div className="w-full bg-gray-300/60 h-[6px] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${module?.module_progress_percentage}%`,
                        }}
                      />
                    </div>
                    <p>{Math.round(module?.module_progress_percentage)}%</p>
                  </div>
                </div>
              </CardTagWrap>
            );
          })
        )}
        {loadingCourseProjects ? (
          <>
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="h-[300px] w-[296px] rounded-lg bg-gray-200 flex-shrink-0 animate-pulse"
              />
            ))}
          </>
        ) : (
          projects &&
          projects?.map((project: any) => {
            return (
              <CardTagWrap
                is_unlocked={project?.is_locked}
                href={`/dashboard/career-path/${params["career-pathway"]}/course-project/${project?.id}`}
                key={project?.id}
              >
                <div className="w-full h-[180px] overflow-hidden rounded-xl">
                  <Image
                    src={project?.course?.cover_image?.media}
                    alt={project?.title}
                    width={100}
                    height={80}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col gap-2 p-2">
                  <div className="flex justify-between items-center gap-2 text-gray-700">
                    <h3
                      title={project?.title}
                      className="font-bold text-sm sm:text-base line-clamp-1"
                    >
                      {project?.title}
                    </h3>
                    <span>
                      {project?.is_locked ? <Locked /> : <Unlocked />}
                    </span>
                  </div>
                  <h4
                    className="font-medium text-gray-600 text-base sm:text-lg styleElements"
                    dangerouslySetInnerHTML={{
                      __html: Truncate(project?.grading_description, 20),
                    }}
                    title={RemoveTags(project?.grading_description)}
                  />
                  {/* <div className="flex flex-wrap gap-2 justify-between items-center text-gray-500">
                    <p className="flex items-center gap-1">
                      <span>{project?.total_lessons}</span>
                      <span>
                        {project?.total_lessons > 1 ? "Lessons" : "Lesson"}
                      </span>
                    </p>
                    <p className="flex items-center gap-1">
                      <span>{project?.total_quizzes}</span>
                      <span>
                        {project?.total_quizzes > 1 ? "Quizzes" : "Quiz"}
                      </span>
                    </p>
                    <p className="flex items-center gap-1">
                      <span>{project?.total_assignments}</span>
                      <span>
                        {project?.total_assignments > 1
                          ? "Assignments"
                          : "Assignment"}
                      </span>
                    </p>
                  </div> */}
                  {/*  */}
                  {/* <div className="flex justify-between gap-3 items-center">
                    <div className="w-full bg-gray-300/60 h-[6px] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `0%` }}
                      />
                    </div>
                    <p>0%</p>
                  </div> */}
                </div>
              </CardTagWrap>
            );
          })
        )}
      </div>
    </Fragment>
  );
};
