import { Button } from "@/app/components/base-components/Button";
import { LoadSpinner } from "@/app/components/loaders/LoadSpinner";
import { AssessmentQuestion } from "@/app/types/AssessmentQuestionProp";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useState } from "react";
import { getMostFrequentPathway } from "./getMostOccuredPathways";
import { Mshow } from "@/app/libs/framer-exports";
import toast from "react-hot-toast";
import { PathwaySuggesstionModal } from "./PathwaySuggesstionModal";
import api from "@/app/utils/auth-interceptor";
import { isAxiosError } from "axios";

export const AssessmentsSteps = ({
  assessmentQuestions,
  setShowSuggestionModal,
  suggestedPathway,
  setSuggestedPathway,
}: {
  assessmentQuestions: AssessmentQuestion[];
  setShowSuggestionModal: React.Dispatch<React.SetStateAction<boolean>>;
  suggestedPathway: string;
  setSuggestedPathway: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [submittingAssessment, setSubmittingAssessment] =
    useState<boolean>(false);

  const currentQuestion = assessmentQuestions[currentIndex];

  const isCurrentQuestionAnswered = () => {
    return !!answers[currentQuestion.id];
  };

  const handleNext = () => {
    if (currentIndex < assessmentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex === 0) {
      params.set("vw", "1");
      params.set("ser_fo_st", "3");
      router.replace(`?${params.toString()}`);
      return;
    }
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleOptionClick = (option: AssessmentQuestion["options"][0]) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option.opt_pathway,
    }));
  };

  const isOptionSelected = (option: AssessmentQuestion["options"][0]) => {
    return answers[currentQuestion.id] === option.opt_pathway;
  };

  const handleSubmitAssessment = async () => {
    try {
      const answersArray = Object.values(answers);
      // console.log(answersArray);
      // const mostFrequentPathway = await getMostFrequentPathway(answersArray);
      // if (mostFrequentPathway?.length < 1) {
      //   toast.error("Please answer at least one question.");
      //   return;
      // }
      // setSuggestedPathway(mostFrequentPathway);
      // setShowSuggestionModal(true);

      const res = await api.post(
        `/assessement/determine-career-interest/rank-career-interests/`,
        { interests: answersArray }
      );
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data?.message);
        localStorage.setItem("recommendations", JSON.stringify(res.data?.data));
        router.push("/recommendation");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("An error occurred.");
      }
    }
  };

  if (!assessmentQuestions || assessmentQuestions?.length < 1)
    return <div>No Assessment Questions</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-4">
        Part 2. Interest-Based Questions
      </h2>

      <p className="text-lg font-medium mb-4 text-center">
        {currentQuestion?.qus}
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {currentQuestion?.options.map((option) => {
          const selected = isOptionSelected(option);
          const inputId = `question-${option?.value}`;

          return (
            <label
              key={option?.value}
              className={`flex items-center gap-3 border px-4 py-5 rounded-lg cursor-pointer transition`}
              style={{
                borderColor: selected ? "#6bbee7" : "#e5e7eb",
                backgroundColor: selected ? "#E6F6FE" : "",
              }}
              htmlFor={inputId}
            >
              <input
                type="radio"
                id={inputId}
                name={`question-${currentQuestion?.id}`}
                checked={selected}
                onChange={() => handleOptionClick(option)}
                // className="sr-only"
                className="size-[18px] text-blue-500"
              />
              <span className="text-sm">{option?.opt_text}</span>
            </label>
          );
        })}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <Button
          disabled={submittingAssessment}
          onClick={handlePrevious}
          variant="outline"
          label="Previous"
          className="max-w-[85px] text-sm px-3 disabled:bg-transparent disabled:opacity-25"
        />
        <span>
          {currentIndex + 1} of {assessmentQuestions?.length}
        </span>
        {currentIndex === assessmentQuestions?.length - 1 ? (
          <Button
            disabled={!isCurrentQuestionAnswered() || submittingAssessment}
            onClick={handleSubmitAssessment}
            label={submittingAssessment ? "Submitting" : "Submit Quiz"}
            className="max-w-[110px] text-sm px-3 disabled:opacity-25"
            icon={
              submittingAssessment ? (
                <LoadSpinner className="!w-[20px] !h-[20px] !mt-1" />
              ) : (
                <></>
              )
            }
          />
        ) : (
          <Button
            disabled={
              !isCurrentQuestionAnswered() ||
              currentIndex === assessmentQuestions?.length - 1
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
};
