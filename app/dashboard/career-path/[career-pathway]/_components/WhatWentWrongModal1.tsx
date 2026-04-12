import { Button } from "@/app/components/base-components/Button";
import { Mdiv, Mshow } from "@/app/libs/framer-exports";
import { useWhatWentWrong } from "@/app/stores/career-pathways/useWhatWentWrong";
import { Fragment, useEffect } from "react";

export const WhatWentWrongModal1 = () => {
  const { setOpenModal, openModal } = useWhatWentWrong();
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
        {openModal && (
          <Mdiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[800] h-[100dvh] w-full flex flex-col justify-center bg-black/40 backdrop-blur-[2px] items-center"
          >
            <div
              className="fixed top-0 left-0 right-0 bottom-0"
              onClick={() => setOpenModal(false)}
            />
            <Mdiv
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative max-w-[550px] flex flex-col justify-center items-center gap-4 z-[801] p-5 md:p-8 rounded-lg bg-white w-[90%] mx-auto"
            >
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center">
                What went wrong?
              </h2>
              <p className="text-[#636369] font-normal text-sm md:text-base lg:text-lg text-center">
                Please your honest answer would help us <br />
                improve and make the experience better.
              </p>

              <textarea
                rows={6}
                className="w-[96%] mx-auto p-3 outline-none border-[1.8px] border-gray-400 rounded-lg resize-none"
              ></textarea>
              <div className="flex flex-wrap min-[476px]:flex-nowrap justify-center items-center gap-5 w-full">
                <Button
                  variant="outline"
                  label="Cancel"
                  type="button"
                  onClick={() => setOpenModal(false) as any}
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
