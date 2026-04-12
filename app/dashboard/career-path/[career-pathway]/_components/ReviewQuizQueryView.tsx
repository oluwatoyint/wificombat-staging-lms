import { BaseCircleProgressbar } from "@/app/components/base-components/BaseCircleProgressBar";
import { Button } from "@/app/components/base-components/Button";
import { InfoIcon3 } from "@/app/icons";
import { Mdiv, Mshow } from "@/app/libs/framer-exports";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import { gradeResponseProp } from "@/app/types/quiz-grade-props";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";

export const ReviewQuizQueryView = ({
  gradeResponse,
  view,
  setView,
}: {
  gradeResponse: gradeResponseProp | null;
  view: "review_view" | "default" | "review_query";
  setView: Dispatch<SetStateAction<"review_view" | "default" | "review_query">>;
}) => {
  const { getShade } = usePrimaryColor();

  const [showConfirmReviewModal, setShowConfirmReviewModal] =
    useState<boolean>(false);

  return (
    <Fragment>
      <div
        className="p-6 rounded-xl border max-w-xl mx-auto shadow-sm bg-white flex justify-center flex-col items-center gap-5"
        style={{ borderColor: getShade(200) }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl text-center mb-4 font-merriweather font-bold">
          Quiz Score
        </h2>
        <BaseCircleProgressbar
          size={160}
          strokeWidth={14}
          percentage={Number(gradeResponse?.percentage_grade)}
        />
        <p className="text-center font-semibold">{gradeResponse?.summary}</p>
        <Button
          label="Review Quiz"
          onClick={() => setShowConfirmReviewModal(true)}
        />
      </div>
      {showConfirmReviewModal && (
        <Mshow>
          <Mdiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 right-0 bottom-0 left-0 bg-modal-bg flex flex-col justify-center items-center"
          >
            <div
              className="absolute top-0 right-0 bottom-0 left-0 z-10"
              onClick={() => setShowConfirmReviewModal(false)}
            />
            <Mdiv
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="relative z-50 w-[94%] sm:w-[450px] rounded-2xl bg-white p-5"
            >
              <div className="overflow-auto max-h-[calc(100dvh-198px)] flex flex-col gap-4 items-center">
                <InfoIcon3 />
                <h3 className="text-center self-center text-lg sm:text-xl md:text-2xl font-bold text-black-500">
                  Please Note
                </h3>
                <p className="text-center self-center text-base sm:text-lg font-semibold text-black-800">
                  Please note that the questions you got correctly will be
                  highlighted in <span className="text-green-600">green</span>{" "}
                  color and the ones you got wrong will be in color{" "}
                  <span className="text-red-500">red</span>.
                </p>
                <Button
                  label="Continue"
                  className="flex-1 !w-full"
                  onClick={() => {
                    setView("review_view");
                    setShowConfirmReviewModal(false);
                  }}
                />
              </div>
            </Mdiv>
          </Mdiv>
        </Mshow>
      )}
    </Fragment>
  );
};
