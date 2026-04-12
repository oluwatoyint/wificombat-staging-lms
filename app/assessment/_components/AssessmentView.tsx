"use client";
import AssessmentDesign from "@/app/components/AssessmentComps/assessment-design";
import { AssessmentUserInfo } from "@/app/types/AssessmentUserInfo";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GetUserInfoSteps } from "./GetUserInfoSteps";
import { AssessmentsSteps } from "./AssessmentsSteps";
import { BackIcon } from "@/app/icons";
import { cn } from "@/app/utils/cn";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/auth-interceptor";
import { Mshow } from "@/app/libs/framer-exports";
import { PathwaySuggesstionModal } from "./PathwaySuggesstionModal";

export const AssessmentView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const view = searchParams.get("vw") || "1";
  const infoStep = searchParams.get("ser_fo_st") || "1";

  const [showSuggestionModal, setShowSuggestionModal] =
    useState<boolean>(false);
  const [suggestedPathway, setSuggestedPathway] = useState<string>("");

  const [userInfo, setUserInfo] = useState<AssessmentUserInfo>(() => {
    // This function will only run on the client during initial render
    if (typeof window === "undefined") {
      return {
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        gender: "",
      };
    }

    const storedInfo = localStorage.getItem("assessmentUserInfo");
    return storedInfo
      ? JSON.parse(storedInfo)
      : {
          first_name: "",
          last_name: "",
          email: "",
          age: "",
          gender: "",
        };
  });

  const { data: assessmentQuestions, isLoading: loadingAssessmentQuestions } =
    useQuery({
      queryKey: ["get-assessment-questions", userInfo?.age],
      queryFn: async () => {
        const res = await api.get(
          `/assessement/determine-career-interest/?question_type=determine_interest&age_grp=${userInfo?.age}`
        );
        return res?.data?.data;
      },
      enabled: !!userInfo?.age,
    });

  // This is to get the user info from local storage and set it in the state
  useEffect(() => {
    const userInfo = localStorage.getItem("assessmentUserInfo");
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
    }
  }, []);

  // This is to save the user info in local storage when a change is made
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("assessmentUserInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  return (
    <Fragment>
      <section className="relative w-full bg-white pb-20 flex justify-center mb-6">
        <BackIcon
          size="72"
          onClick={() => router.back()}
          className="absolute z-[99] top-5 left-5 sm:left-10"
        />
        <AssessmentDesign />
        <Toaster />
        {/*  */}
        <div
          className={cn(
            "mt-20 mb-20 relative z-[96] min-w-[94%] min-[680px]:min-w-[668px] max-w-[668px] rounded-3xl shadow-[2px_4px_8px_4px_#B1B1B133] p-5 sm:p-6 md:p-10",
            infoStep === "3" ? "min-h-[900px]" : "min-h-[564px]"
          )}
        >
          {view === "1" ? (
            <GetUserInfoSteps
              assessmentQuestions={assessmentQuestions}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          ) : (
            <>
              {assessmentQuestions && (
                <AssessmentsSteps
                  setShowSuggestionModal={setShowSuggestionModal}
                  assessmentQuestions={assessmentQuestions}
                  setSuggestedPathway={setSuggestedPathway}
                  suggestedPathway={suggestedPathway}
                />
              )}
            </>
          )}
        </div>
      </section>
      <Mshow>
        {showSuggestionModal && (
          // <PathwaySuggesstionModal
          //   setShow={setShowSuggestionModal}
          //   suggestedPathway={suggestedPathway}
          // />
          <></>
        )}
      </Mshow>
    </Fragment>
  );
};
