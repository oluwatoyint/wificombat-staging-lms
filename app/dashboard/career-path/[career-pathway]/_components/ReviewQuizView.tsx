import { gradeResponseProp } from "@/app/types/quiz-grade-props";
import React, { Dispatch, SetStateAction, useState } from "react";

import Image from "next/image";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import { Button } from "@/app/components/base-components/Button";
import { ModuleResponse } from "@/app/types/module-prop";
import { useSearchParams } from "next/navigation";

type LessonQuizView = "review_view" | "default" | "review_query";

export const ReviewQuizView = ({
  gradeResponse,
  view,
  setView,
  myLessons,
  goToNextLesson,
}: {
  gradeResponse: gradeResponseProp | null;
  view: LessonQuizView;
  setView: Dispatch<SetStateAction<LessonQuizView>>;
  myLessons: ModuleResponse;
  goToNextLesson: ({ to_vid }: { to_vid?: boolean }) => void;
}) => {
  const { getShade } = usePrimaryColor();
  const [currentIndex, setCurrentIndex] = useState(0);
  const searchParams = useSearchParams();

  if (!gradeResponse || gradeResponse?.data?.length === 0) {
    return <p>No graded quiz data available.</p>;
  }
  const lessonIndex = parseInt(searchParams.get("lessonIndex") || "0", 10);

  const currentQuiz = gradeResponse?.data?.[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < gradeResponse?.data?.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  const handleFinish = () => {
    goToNextLesson({ to_vid: true });
  };

  return (
    <div
      className="p-6 rounded-xl border max-w-xl mx-auto shadow-sm bg-white"
      style={{ borderColor: getShade(200) }}
    >
      <h2 className="text-xl font-semibold text-center mb-4">Review Quiz</h2>

      <p className="text-lg font-medium mb-4 text-center">
        {currentQuiz.question}
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {currentQuiz.options.map((option) => {
          const isStudentAnswer =
            option.option_label === currentQuiz.student_answer;
          const isCorrectAnswer =
            option.text_option === currentQuiz.correct_answer;

          return (
            <div
              key={option.id}
              className={`flex items-center gap-3 border p-3 rounded-lg transition
                ${isCorrectAnswer ? "border-green-500 bg-green-50" : ""}
                ${
                  isStudentAnswer && !isCorrectAnswer
                    ? "border-red-500 bg-red-50"
                    : ""
                }
              `}
            >
              <input type="radio" checked={isStudentAnswer} disabled readOnly />
              {option.image_option ? (
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={`/logo.png`} // replace with `/api/image/${option.image_option}` when real
                    alt="option"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <span>{option.text_option}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <Button
          disabled={currentIndex === 0}
          onClick={handlePrevious}
          variant="outline"
          label="Previous"
          className="max-w-[85px] text-sm px-3 disabled:bg-transparent disabled:opacity-25"
        />

        <span>
          {currentIndex + 1} of {gradeResponse?.data?.length}
        </span>

        {currentIndex === gradeResponse?.data?.length - 1 ? (
          <>
            {myLessons?.module_lessons?.length - 1 !== lessonIndex && (
              <Button
                onClick={handleFinish}
                label="Next Lesson"
                className="max-w-[110px] text-sm px-3"
              />
            )}
          </>
        ) : (
          <Button
            onClick={handleNext}
            variant="outline"
            label="Next"
            className="max-w-[60px] text-sm px-3 disabled:bg-transparent disabled:opacity-25"
          />
        )}
      </div>
    </div>
  );
};
