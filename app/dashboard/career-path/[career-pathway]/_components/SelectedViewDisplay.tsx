import { useSelectedItemToView } from "@/app/stores/career-pathways/useSelectedItemToView";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import VideoPlayer from "./VideoPlayer";
import LessonQuiz from "./LessonQuiz";
import { LessonAssignments } from "./LessonAssignments";
import { ModuleResponse } from "@/app/types/module-prop";

export const SelectedViewDisplay = ({
  myLessons,
  goToNextLesson,
  module_id,
}: {
  myLessons: ModuleResponse;
  goToNextLesson: () => void;
  module_id: string;
}) => {
  const { setSelectedItem, selectedItem } = useSelectedItemToView();
  //
  //
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  const view = searchParams.get("v_n") || "vid";
  console.log(selectedItem);

  switch (view) {
    case "vid":
      return (
        <div className="flex flex-col gap-2">
          <VideoPlayer videoHtml={selectedItem?.video_embed} />

          <div
            dangerouslySetInnerHTML={{
              __html: selectedItem?.title,
            }}
            className="styleElements"
          />
          <div
            dangerouslySetInnerHTML={{
              __html: selectedItem?.transcript,
            }}
            className="styleElements"
          />
        </div>
      );
    case "note":
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: selectedItem?.note,
          }}
          className="styleElements"
        />
      );
    case "quiz":
      return (
        <LessonQuiz
          myLessons={myLessons}
          goToNextLesson={goToNextLesson}
          quizes={selectedItem?.lesson_quizes}
          module_id={module_id}
        />
      );
    // return "";
    case "obj":
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: selectedItem?.obj,
          }}
          className="styleElements"
        />
      );
    case "leotc":
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: selectedItem?.leotc,
          }}
          className="styleElements"
        />
      );
    case "assignments":
      return <LessonAssignments assignment={selectedItem} />;
    default:
      return <p>Please Select a Lesson Item</p>;
  }
};
