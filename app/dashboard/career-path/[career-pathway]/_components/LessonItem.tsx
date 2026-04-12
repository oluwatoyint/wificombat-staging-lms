import { ArrowRight, Locked, Unlocked } from "@/app/icons";
import { Mdiv, Mshow } from "@/app/libs/framer-exports";
import { useSelectedItemToView } from "@/app/stores/career-pathways/useSelectedItemToView";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import { cn } from "@/app/utils/cn";
import { item_key } from "@/app/utils/vars";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Media {
  id: string;
  created_at: string;
  updated_at: string;
  is_fake_data: boolean;
  media_type: string;
  media: string;
  metadata: Record<string, unknown>;
  cover_art: null;
  downloaded_media: null;
  downloaded_media_url: null;
}
interface Quiz {
  id: string;
  type: "multiple_choice" | "true_false";
  question: string;
  lesson: string;
  correct_answer: string;
  options: QuizOption[];
}
interface QuizOption {
  id: string;
  text_option: string | null;
  option_label: string;
  image_option: string | null;
}
interface lessonItemProp {
  id: string;
  title: string;
  description: string;
  cover_image: Media;
  module: string;
  transcript: string;
  lesson_quizes: Quiz[];
  note: string;
  video_embed: string;
  order: number;
  created_at: string;
  updated_at: string;
  is_unlocked_for_user: boolean;
}

export const LessonItem = ({
  item,
  index,
}: {
  item: lessonItemProp;
  index: number;
}) => {
  const [showLessonItems, setShowLessonItems] = useState<boolean>(false);
  const { setSelectedItem, selectedItem } = useSelectedItemToView();
  const [hydrated, setHydrated] = useState(false);
  //
  useEffect(() => {
    try {
      const stored = localStorage.getItem(item_key);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSelectedItem(parsed);
      }
    } catch (err) {
      console.error("Error parsing stored item", err);
    } finally {
      setHydrated(true);
    }
  }, [setSelectedItem]);
  //
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("v_n") || "vid";
  const params = new URLSearchParams(searchParams?.toString());
  //
  const isActiveNote = selectedItem?.id === item?.id && view === "note";
  const isActiveVid = selectedItem?.id === item?.id && view === "vid";
  const isActiveQuiz = selectedItem?.id === item?.id && view === "quiz";
  //
  const { primaryColor } = usePrimaryColor();
  //
  if (!hydrated) return null;

  //
  return (
    <div className="mt-4">
      <div
        className={cn(
          "flex justify-between items-center gap-2 cursor-pointer font-semibold select-none",
          !item?.is_unlocked_for_user ? "text-black-800/60" : "text-black-500"
        )}
        onClick={() => {
          if (!item?.is_unlocked_for_user) return;
          setShowLessonItems(!showLessonItems);
        }}
      >
        <div className="flex gap-2 items-center">
          <Mdiv
            animate={{ rotate: showLessonItems ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ArrowRight />
          </Mdiv>
          <h3 className="text-sm md:text-base">{item?.title}</h3>
        </div>
        <span>{!item?.is_unlocked_for_user ? <Locked /> : <Unlocked />}</span>
      </div>
      {/*  */}
      <Mshow>
        {showLessonItems && (
          <Mdiv
            initial={{ height: 0, paddingTop: 0 }}
            animate={{ height: "auto", paddingTop: "16px" }}
            exit={{ height: 0, paddingTop: 0 }}
            className={"flex flex-col gap-5 pl-10 overflow-hidden"}
          >
            <div
              className="flex flex-col gap-1 text-black-550 cursor-pointer select-none"
              onClick={() => {
                params.set("v_n", "vid");
                params.set("lessonIndex", index.toString());
                router.replace(`?${params.toString()}`);
                setSelectedItem(item);
              }}
            >
              <span
                className="font-semibold text-sm"
                style={{ color: isActiveVid ? primaryColor : "" }}
              >
                {item?.title}
              </span>
              <span className="text-sm text-black-400">Video</span>
            </div>
            {/*  */}
            <div
              className="font-semibold text-sm text-black-550 cursor-pointer select-none"
              style={{ color: isActiveNote ? primaryColor : "" }}
              onClick={() => {
                params.set("v_n", "note");
                params.set("lessonIndex", index.toString());
                router.replace(`?${params.toString()}`);
                setSelectedItem(item);
              }}
            >
              Lesson note
            </div>
            {/*  */}
            <div
              className="font-semibold text-sm text-black-550 cursor-pointer select-none"
              style={{ color: isActiveQuiz ? primaryColor : "" }}
              onClick={() => {
                params.set("v_n", "quiz");
                params.set("lessonIndex", index.toString());
                router.replace(`?${params.toString()}`);
                setSelectedItem(item);
              }}
            >
              Quiz
            </div>
          </Mdiv>
        )}
      </Mshow>
    </div>
  );
};
