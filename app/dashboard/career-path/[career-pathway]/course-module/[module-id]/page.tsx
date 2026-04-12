"use client";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Button } from "@/app/components/base-components/Button";
import { useRateAudioModal } from "@/app/stores/career-pathways/useRateAudioModal";
import { AudioRateModal } from "../../_components/AudioRateModal";
import { WhatWentWrongModal2 } from "../../_components/WhatWentWrongModal2";
import { useWhatWentWrong } from "@/app/stores/career-pathways/useWhatWentWrong";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/auth-interceptor";
import { BackIcon } from "@/app/icons";
import { moduleData } from "@/app/mock-data/module-lessons";
import { LessonsSidebar } from "../../_components/LessonsSidebar";
import { SelectedViewDisplay } from "../../_components/SelectedViewDisplay";
import { ModuleResponse } from "@/app/types/module-prop";
import { useSelectedItemToView } from "@/app/stores/career-pathways/useSelectedItemToView";
import toast from "react-hot-toast";

const CourseModuleInfoPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  //
  const params = useParams();
  const module_id = params["module-id"];
  //
  const router = useRouter();
  const searchParams = useSearchParams();
  // const
  //
  const { openModal, setOpenModal } = useRateAudioModal();
  const { showModal2, setShowModal2 } = useWhatWentWrong();
  //
  // this function blocks here gets the lessons, assignments and quizs on the course/course module

  // get lessons function
  const { data: lessons, isLoading: loadingLessons } = useQuery({
    queryKey: ["lessons", module_id],
    queryFn: async () => {
      // const res = await api.get(`/lessons/get_all?module_id=${module_id}`);
      const res = await api.get(
        `/my-learning-dashboard/detailed_module/${module_id}`
      );
      return res.data;
    },
    enabled: !!module_id,
  });
  //
  //
  const myLessons: ModuleResponse = useMemo(() => {
    if (lessons) {
      return lessons?.data;
    }
    return [];
  }, [lessons]);
  // const myLessons = moduleData;
  const { setSelectedItem, selectedItem } = useSelectedItemToView();
  //
  const view = searchParams.get("v_n") || "vid";
  const lessonIndex = parseInt(searchParams.get("lessonIndex") || "0", 10);
  // go to next lesson function
  const goToNextLesson = ({ to_vid }: { to_vid?: boolean } = {}) => {
    const nextIndex = lessonIndex + 1;
    if (lessons && nextIndex < myLessons?.module_lessons?.length) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("lessonIndex", nextIndex.toString());
      if (to_vid) {
        params.set("v_n", "vid");
      }
      router.replace(`?${params.toString()}`);
    } else {
      toast.error("You're on the last lesson item");
    }
  };

  //
  useEffect(() => {
    if (lessons) {
      setSelectedItem(myLessons?.module_lessons[lessonIndex]);
    }
  }, [lessonIndex, lessons]);
  // scroll to top on lesson change
  useEffect(() => {
    const view_container = document.querySelector(".view-container");

    window.scrollTo({ top: 0, behavior: "smooth" });
    if (view_container) view_container.scrollTo({ top: 0, behavior: "smooth" });
  }, [lessonIndex]);

  //
  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative `}>
        <div
          className={`${
            toggleSidebar ? "lg:pl-36" : "lg:pl-64"
          } transition-all duration-500 ease-in-out`}
        >
          <DashboardHeader setSidebarOpen={setSidebarOpen} />
          <div className="px-8 mt-4 block xl:hidden">
            <BackIcon onClick={() => router.back()} />
          </div>
          {loadingLessons ? (
            <div className="px-8 mt-6 mb-3 grid grid-cols-1 md:grid-cols-[250px_1fr] xl:overflow-hidden xl:h-[calc(100dvh-180px)]">
              <div className="flex flex-col gap-5">
                <div className="h-[14px] w-[90%] bg-gray-200 rounded-sm" />
                <div className="h-[14px] w-[50%] bg-gray-200 rounded-sm" />
                {Array.from({ length: 5 }, (_, idx) => (
                  <div
                    key={idx}
                    className="h-[10px] w-[78%] bg-gray-200 rounded-sm"
                  />
                ))}
              </div>
              {/*  */}
              <div className="flex flex-col gap-4">
                <div className="h-[240px] w-[90%] bg-gray-200 rounded-sm" />
                <div className="h-[24px] w-[50%] bg-gray-200 rounded-sm" />
                {Array.from({ length: 5 }, (_, idx) => (
                  <div
                    key={idx}
                    className="h-[10px] w-[78%] bg-gray-200 rounded-sm"
                  />
                ))}
              </div>
            </div>
          ) : (
            <main className="mt-8 px-5 grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-x-6 gap-y-4 relative xl:overflow-hidden xl:h-[calc(100dvh-180px)]">
              <div className="flex flex-col gap-2 order-2 xl:order-1">
                <div className="flex items-center gap-2">
                  <span className="hidden xl:block">
                    <BackIcon onClick={() => router.back()} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {lessons && myLessons?.title}
                    </h3>
                    <div className="text-xs flex items-center gap-10 xl:gap-4">
                      <span>{myLessons?.module_lessons?.length} Lesson(s)</span>
                      <span>
                        {myLessons?.module_lessons?.reduce(
                          (total: number, lesson: any) =>
                            total + (lesson.lesson_quizes?.length || 0),
                          0
                        )}
                        Quiz(s)
                      </span>
                      <span>
                        {myLessons?.module_assignments?.length} Assignment(s)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-8 mt-4">
                  <LessonsSidebar data={myLessons} />
                </div>
              </div>
              {/*  */}
              <div className="view-container h-[calc(100dvh-200px)] scroll-style overflow-y-auto bg-[#F9F9FF] p-4 py-6 xl:py-12 order-1 xl:order-2">
                <div className="rounded-xl overflow-hidden mb-5 min-h-full">
                  <Suspense>
                    <SelectedViewDisplay
                      myLessons={myLessons}
                      goToNextLesson={goToNextLesson}
                      module_id={String(module_id)}
                    />
                  </Suspense>
                </div>
                {selectedItem &&
                  selectedItem?.has_completed_lesson &&
                  view === "vid" && (
                    <Button
                      label="Proceed to next lesson"
                      className="min-[376px]:w-[200px] ml-auto !mt-auto"
                      onClick={() => goToNextLesson({ to_vid: true })}
                      disabled={
                        lessonIndex >= myLessons?.module_lessons?.length - 1
                      }
                    />
                  )}
              </div>
            </main>
          )}
        </div>
      </div>
      {openModal && <AudioRateModal />}
      {showModal2 && <WhatWentWrongModal2 />}
    </>
  );
};

export default CourseModuleInfoPage;
