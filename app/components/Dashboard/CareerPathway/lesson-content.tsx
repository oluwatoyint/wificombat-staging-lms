"use client";
import { merriweather, raleway } from "@/app/fonts";
import Image from "next/image";
import React, { useEffect } from "react";
import { RiLoader4Fill } from "react-icons/ri";

type Props = {
  selectedContent: any[];
  handlePrevSlide: () => void;
  handleNextSlide: () => void;
  currentSlide: number;
  isQuizMode: boolean;
  loadingQuiz: boolean;
  fetchQuiz: () => void;
  lessonTitle: string;
  lessonIndex: number;
  totalSlides: number;
};

const LessonContent = ({
  currentSlide,
  handleNextSlide,
  handlePrevSlide,
  selectedContent,
  isQuizMode,
  loadingQuiz,
  fetchQuiz,
  lessonTitle,
  lessonIndex,
  totalSlides,
}: Props) => {
  useEffect(() => {
    // Scroll to the top of the content area when lesson or content changes
    const contentContainer = document.querySelector(".lesson-container"); // Adjust the selector to target your content wrapper
    if (contentContainer) {
      contentContainer.scrollTop = 0;
    }
  }, [lessonIndex, selectedContent]);

  return (
    <>
      <div
        className="lesson-container relative mt-5 p-5 h-[24rem] lg:h-[110%] mb-6 bg-white
     shadow overflow-y-auto overflow-x-auto rounded-3xl"
      >
        {/* <div className="sticky w-full inset-0 h-[45vh] bg-white flex items-center justify-center">
            <Image 
            src={`/logo.png`}
            alt='background'
            width={80}
            height={80}
            className='w-[90%] h-full object-contain invert-[100%] opacity-10'
            />
        </div> */}
        {selectedContent.length > 0 ? (
          <div className="absolute top-0 left-0 w-full">
            <div className="relative z-[1] top-3 left-0 px-3">
              <h3
                className={`${merriweather.className} text-center font-semibold text-xl lg:text-2xl mb-4`}
              >
                Lesson Note for Lesson {lessonIndex}
              </h3>
              {/* Display current slide */}
              <div
                className={`${raleway.className}  bg-transparent styleElements`}
                dangerouslySetInnerHTML={{
                  __html: selectedContent[currentSlide],
                }}
              />

              {/* Navigation Buttons lg:fixed lg:w-[52%] right-0  */}
              <div className="z-[1] relative px-4 sm:px-6 lg:px-8 py-8">
                <div className="mt-4 flex justify-end">
                  {!(currentSlide === selectedContent.length - 1) && (
                    <button
                      onClick={handleNextSlide}
                      disabled={currentSlide === selectedContent.length - 1}
                      className="px-4 py-2 bg-transparent border border-black-500 rounded-lg 
                        disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  )}

                  {!isQuizMode &&
                    currentSlide === selectedContent.length - 1 && (
                      <button
                        onClick={fetchQuiz}
                        className={`px-4 ${
                          loadingQuiz && "px-12"
                        } py-2 bg-black-500 text-white border border-black-500 
                        flex items-center justify-center text-center rounded-lg 
                        disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed`}
                      >
                        {loadingQuiz ? (
                          <RiLoader4Fill
                            size={23}
                            className="animate-spin mx-12"
                          />
                        ) : (
                          "Proceed to Quiz"
                        )}
                      </button>
                    )}
                </div>
              </div>
              {/* Navigation Buttons */}
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

export default LessonContent;
