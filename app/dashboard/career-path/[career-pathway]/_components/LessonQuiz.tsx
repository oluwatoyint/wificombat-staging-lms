import { Button } from "@/app/components/base-components/Button";
import { LoadSpinner } from "@/app/components/loaders/LoadSpinner";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import api from "@/app/utils/auth-interceptor";
import { isAxiosError } from "axios";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { ReviewQuizQueryView } from "./ReviewQuizQueryView";
import { ReviewQuizView } from "./ReviewQuizView";
import { gradeResponseProp } from "@/app/types/quiz-grade-props";
import { ModuleResponse } from "@/app/types/module-prop";
import { useUnlockLesson } from "@/app/hooks/unlock-modules-and-lessons/useUnlockLesson";
import { useSelectedItemToView } from "@/app/stores/career-pathways/useSelectedItemToView";
import { useRouter, useSearchParams } from "next/navigation";

interface Option {
  id: string;
  text_option: string | null;
  option_label: string;
  image_option: string | null;
}

interface Quiz {
  id: string;
  question: string;
  type:
    | "multiple_choice"
    | "true_false"
    | "multiple_image"
    | "fill_in_blank"
    | "check_box"
    | "short_answer";
  lesson: string;
  correct_answer: string | string[];
  options: Option[];
}

export type LessonQuizView = "review_view" | "default" | "review_query";

export default function LessonQuiz({
  quizes,
  myLessons,
  goToNextLesson,
  module_id,
}: {
  quizes: Quiz[];
  myLessons: ModuleResponse;
  goToNextLesson: ({ to_vid }: { to_vid?: boolean }) => void;
  module_id: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submittingQuiz, setSubmittingQuiz] = useState<boolean>(false);

  const [view, setView] = useState<LessonQuizView>("default");

  const [gradeResponse, setGradeResponse] = useState<gradeResponseProp | null>(
    null
  );

  const { unlockLesson } = useUnlockLesson();
  const { selectedItem } = useSelectedItemToView();

  const { getShade } = usePrimaryColor();

  if (!quizes || quizes.length < 1) {
    return <div>No Lesson Quiz for this Lesson Item</div>;
  }

  const currentQuiz = quizes[currentIndex];
  const selectedAnswers = answers[currentQuiz.id] || [];

  const handleOptionClick = (optionLabel: string) => {
    const currentAnswers = answers[currentQuiz.id] || [];

    let updated: string[];

    if (currentQuiz.type === "check_box") {
      // Allow multiple selections for checkbox type
      if (currentAnswers.includes(optionLabel)) {
        updated = currentAnswers.filter((item) => item !== optionLabel);
      } else {
        updated = [...currentAnswers, optionLabel];
      }
    } else {
      // Single selection for other types
      updated = [optionLabel];
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuiz.id]: updated,
    }));
  };

  const handleTextAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuiz.id]: [value], // still store as array for consistency
    }));
  };

  const isCurrentAnswered = () => {
    // For questions without options (fill_in_blank, short_answer), you could later check text input instead.
    return selectedAnswers.length > 0;
  };

  const handleNext = () => {
    if (currentIndex < quizes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  // Handles the submission of quizz
  const handleSubmitQuizz = async () => {
    try {
      setSubmittingQuiz(true);
      const payload = {
        data: quizes.map((quiz) => ({
          id: quiz.id,
          type: quiz.type,
          question: quiz.question,
          lesson: quiz.lesson,
          correct_answer: quiz.correct_answer,
          student_answer:
            quiz.type === "check_box"
              ? answers[quiz.id] || []
              : answers[quiz.id]?.[0] || "",
          options: quiz.options,
        })),
      };
      const res = await api.post("/ai-agents/grade_quiz/", {
        payload: payload,
      });
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data?.data?.summary);
        setView("review_query");
        setGradeResponse(res.data?.data);
        await unlockLesson({ current_lesson_id: selectedItem?.id, module_id });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(`${error.response?.data.message}`);
      } else {
        toast.error("An error occurred!");
      }
    } finally {
      setSubmittingQuiz(false);
    }
  };

  switch (view) {
    case "default":
      return (
        <div
          className="p-6 rounded-xl border max-w-xl mx-auto shadow-sm bg-white"
          style={{ borderColor: getShade(200) }}
        >
          <h2 className="text-xl font-semibold text-center mb-4">Quiz</h2>

          <p className="text-lg font-medium mb-4 text-center">
            {currentQuiz.question}
          </p>

          <div className="flex flex-col gap-3 mb-6">
            {currentQuiz.options.map((option) => {
              const selected = selectedAnswers.includes(option.option_label);
              return (
                <label
                  key={option.id}
                  onClick={() => handleOptionClick(option.option_label)}
                  className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition`}
                  style={{
                    borderColor: selected ? getShade(500) : "#e5e7eb",
                    backgroundColor: selected ? getShade(50) : "",
                  }}
                >
                  <input
                    type={
                      currentQuiz.type === "check_box" ? "checkbox" : "radio"
                    }
                    name={`quiz-${currentQuiz.id}`}
                    checked={selected}
                    readOnly
                  />

                  {/* for quizzes that requires iput as answer */}
                  {(currentQuiz.type === "fill_in_blank" ||
                    currentQuiz.type === "short_answer") && (
                    <input
                      type="text"
                      value={selectedAnswers[0] || ""}
                      onChange={(e) => handleTextAnswer(e.target.value)}
                      className="border p-2 rounded w-full"
                      placeholder="Type your answer..."
                    />
                  )}

                  {option.image_option ? (
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        // src={`/api/image/${option.image_option}`}
                        src={`/logo.png`}
                        alt="option"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <span>{option.text_option}</span>
                  )}
                </label>
              );
            })}
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <Button
              disabled={currentIndex === 0 || submittingQuiz}
              onClick={handlePrevious}
              variant="outline"
              label="Previous"
              className="max-w-[85px] text-sm px-3 disabled:bg-transparent disabled:opacity-25"
            />
            <span>
              {currentIndex + 1} of {quizes.length}
            </span>
            {currentIndex === quizes?.length - 1 ? (
              <Button
                disabled={!isCurrentAnswered() || submittingQuiz}
                onClick={handleSubmitQuizz}
                label={submittingQuiz ? "Submitting" : "Submit Quiz"}
                className="max-w-[110px] text-sm px-3 disabled:opacity-25"
                icon={
                  submittingQuiz ? (
                    <LoadSpinner className="!w-[20px] !h-[20px] !mt-1" />
                  ) : (
                    <></>
                  )
                }
              />
            ) : (
              <Button
                disabled={
                  !isCurrentAnswered() || currentIndex === quizes.length - 1
                }
                onClick={handleNext}
                variant="outline"
                label="Next"
                className="max-w-[60px] text-sm px-3 disabled:bg-transparent disabled:opacity-25"
              />
            )}
          </div>
        </div>
      );
    case "review_query":
      return (
        <ReviewQuizQueryView
          gradeResponse={gradeResponse}
          setView={setView}
          view={view}
        />
      );
    case "review_view":
      return (
        <ReviewQuizView
          gradeResponse={gradeResponse}
          setView={setView}
          view={view}
          myLessons={myLessons}
          goToNextLesson={goToNextLesson}
        />
      );
    default:
      return <p>Loading View...</p>;
  }
}
