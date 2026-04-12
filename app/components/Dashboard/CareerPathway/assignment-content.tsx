import React, { useState, useEffect } from "react";
import Link from "next/link";
import { raleway } from "@/app/fonts";

type AssignmentContentProps = {
  currentAssignment: number;
  selectedAssignment: any[];
  isQuizMode: boolean;
  loadingQuiz: boolean;
  lessonIndex: number;
  assignmnetIndex: number;
  currentAssignmentSlide: number;
};

const AssignmentContent: React.FC<AssignmentContentProps> = ({
  currentAssignment,
  selectedAssignment,
  isQuizMode,
  loadingQuiz,
  lessonIndex,
  assignmnetIndex,
  currentAssignmentSlide,
}) => {
  useEffect(() => {
    // Scroll to the top of the content area when lesson or content changes
    const contentAssignment = document.querySelector(".assignment"); // Adjust the selector to target your content wrapper
    if (contentAssignment) {
      contentAssignment.scrollTop = 0;
    }
  }, [assignmnetIndex, selectedAssignment]);

  return (
    <>
      <div
        className="lesson-container relative mt-5 p-5 h-[24rem] lg:h-[110%] mb-6 bg-white
     shadow overflow-y-auto overflow-x-auto rounded-3xl"
      >
        {selectedAssignment.length > 0 ? (
          <div className="absolute top-0 left-0 w-full">
            <div className="relative z-[1] top-3 left-0 px-3">
              {/* Display current slide */}
              <div
                className={`${raleway.className}  bg-transparent styleElements`}
                dangerouslySetInnerHTML={{
                  __html: selectedAssignment[currentAssignmentSlide],
                }}
              />

              {/* Navigation Buttons lg:fixed lg:w-[52%] right-0  */}
              <div className="z-[1] relative px-4 sm:px-6 lg:px-8 py-8">
                <div className="mt-4 flex justify-end">
                  {/* {!isQuizMode && currentAssignmentSlide === selectedAssignment.length - 1 &&
                        <Link
                         href="/dashboard/career-path/submit"
                        className={`px-4 ${loadingQuiz && 'px-12'} py-2 bg-black-500 text-white border border-black-500 
                        flex items-center justify-center text-center rounded-lg 
                        disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed`}
                        >
                            Submit
                        </Link>} */}
                  <Link
                    href="/dashboard/career-path/submit"
                    className={`px-4 ${
                      loadingQuiz && "px-12"
                    } py-2 bg-black-500 text-white border border-black-500 
                        flex items-center justify-center text-center rounded-lg 
                        disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed`}
                  >
                    submit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="m-auto text-center">
            Select a lesson to view its content.
          </p>
        )}
      </div>
    </>
  );
};

export default AssignmentContent;
