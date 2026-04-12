import { Button } from "@/app/components/base-components/Button";
import { Mdiv, Mshow } from "@/app/libs/framer-exports";
import { useWhatWentWrong } from "@/app/stores/career-pathways/useWhatWentWrong";
import { cn } from "@/app/utils/cn";
import { Fragment, useEffect } from "react";

export const WhatWentWrongModal2 = () => {
  const { showModal2, setShowModal2, wrongType, setWrongType } =
    useWhatWentWrong();
  useEffect(() => {
    const element = document.documentElement;
    if (element) {
      element.style.overflow = "hidden";
    }

    return () => {
      element.style.overflow = "unset";
    };
  }, []);
  return (
    <Fragment>
      <Mshow mode="wait">
        {showModal2 && (
          <Mdiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[800] h-[100dvh] w-full flex flex-col justify-center bg-black/40 backdrop-blur-[2px] items-center"
          >
            <div
              className="fixed top-0 left-0 right-0 bottom-0"
              onClick={() => setShowModal2(false)}
            />
            <Mdiv
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative min-w-[200px] max-w-[550px] flex flex-col justify-center gap-4 z-[801] p-5 md:p-8 rounded-lg bg-white w-[90%] mx-auto"
            >
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center">
                What went wrong?
              </h2>
              <div className="flex items-center justify-center">
                <p
                  className={cn(
                    "capitalize flex justify-center cursor-pointer border-b-[2px] pb-1 w-[100px]",
                    wrongType === "audio" && "border-b-purple-500"
                  )}
                  onClick={() => setWrongType("audio")}
                >
                  Audio
                </p>
                <p
                  className={cn(
                    "capitalize flex justify-center cursor-pointer border-b-[2px] pb-1 w-[100px]",
                    wrongType === "video" && "border-b-purple-500"
                  )}
                  onClick={() => setWrongType("video")}
                >
                  Video
                </p>
              </div>
              {/*  */}
              {wrongType === "audio" ? (
                <div className="flex flex-col gap-3">
                  <label htmlFor="report1" className="flex items-center gap-4">
                    <input
                      id="report1"
                      type="checkbox"
                      className="h-[18px] w-[18px] cursor-pointer"
                    />
                    <span>The audio was breaking up</span>
                  </label>
                  {/*  */}
                  <label htmlFor="report2" className="flex items-center gap-4">
                    <input
                      id="report2"
                      type="checkbox"
                      className="h-[18px] w-[18px] cursor-pointer"
                    />
                    <span>There was an echo</span>
                  </label>
                  {/*  */}
                  <label htmlFor="report3" className="flex items-center gap-4">
                    <input
                      id="report3"
                      type="checkbox"
                      className="h-[18px] w-[18px] cursor-pointer"
                    />
                    <span>The sound was delayed</span>
                  </label>
                  {/*  */}
                  <label htmlFor="report3" className="flex items-center gap-4">
                    <input
                      id="report3"
                      type="checkbox"
                      className="h-[18px] w-[18px] cursor-pointer"
                    />
                    <span>The voice was not audible</span>
                  </label>
                  {/*  */}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <label htmlFor="report1" className="flex items-center gap-4">
                    <input
                      id="report1"
                      type="checkbox"
                      className="h-[18px] w-[18px] cursor-pointer"
                    />
                    <span>The video was cracking</span>
                  </label>
                  {/*  */}
                  <label htmlFor="report2" className="flex items-center gap-4">
                    <input
                      id="report2"
                      type="checkbox"
                      className="h-[18px] w-[18px] cursor-pointer"
                    />
                    <span>There was an echo</span>
                  </label>
                  {/*  */}
                  <label htmlFor="report3" className="flex items-center gap-4">
                    <input
                      id="report3"
                      type="checkbox"
                      className="h-[18px] w-[18px] cursor-pointer"
                    />
                    <span>The Video is stuttering</span>
                  </label>
                  {/*  */}
                  <label htmlFor="report3" className="flex items-center gap-4">
                    <input
                      id="report3"
                      type="checkbox"
                      className="h-[18px] w-[18px] cursor-pointer"
                    />
                    <span>The voice was not audible</span>
                  </label>
                  {/*  */}
                </div>
              )}
              <div className="flex flex-wrap min-[476px]:flex-nowrap justify-center items-center gap-5 w-full">
                <Button
                  variant="outline"
                  label="Close"
                  type="button"
                  onClick={() => setShowModal2(false) as any}
                  className="!w-full min-[476px]:!w-[170px]"
                />
                <Button
                  label="Submit"
                  type="button"
                  className="!w-full min-[476px]:!w-[170px]"
                />
              </div>
            </Mdiv>
          </Mdiv>
        )}
      </Mshow>
    </Fragment>
  );
};
