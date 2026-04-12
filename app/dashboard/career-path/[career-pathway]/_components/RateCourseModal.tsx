import { Button } from "@/app/components/base-components/Button";
import { Mdiv, Mshow } from "@/app/libs/framer-exports";
import { useAddCourseModalStore } from "@/app/stores/career-pathways/useAddCourseModal";
import { Fragment, useEffect } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { useRateCourseModal } from "@/app/stores/career-pathways/useRateCourseModal";

export const RateCourseModal = () => {
  const { setOpenModal, openModal } = useRateCourseModal();
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
              className="relative max-w-[500px] flex flex-col justify-center items-center gap-4 z-[801] p-5 md:p-8 rounded-lg bg-white"
            >
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center">
                Rate The Course
              </h2>
              <p className="text-[#636369] font-normal text-sm md:text-base lg:text-lg text-center">
                Please rate the course, your answer will be use <br /> to
                improve and make the experience better.
              </p>
              <Rating
                value={2}
                onChange={(value: any) => console.log(value)}
                className="!w-56"
              />
              <div className="flex flex-wrap min-[476px]:flex-nowrap justify-center items-center gap-5 w-full">
                <Button
                  label="Not Now"
                  type="button"
                  onClick={() => setOpenModal(false) as any}
                  className="!w-full min-[476px]:!w-[170px]"
                />
                <Button
                  variant="outline"
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
