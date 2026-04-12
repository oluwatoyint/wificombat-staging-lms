import { Button } from "@/app/components/base-components/Button";
import { LoadSpinner } from "@/app/components/loaders/LoadSpinner";
import { useCareerPathways } from "@/app/hooks/career-pathways/useCareerPathways";
import { Mdiv, Mshow } from "@/app/libs/framer-exports";
import { useAddCourseModalStore } from "@/app/stores/career-pathways/useAddCourseModal";
import OTPInput from "@/app/utils/otpInput";
import { Fragment, useEffect, useState } from "react";

export const AddCourseCodeModal = () => {
  const { setOpenModal, openModal } = useAddCourseModalStore();
  const [code, setCode] = useState<string>("");
  useEffect(() => {
    const element = document.documentElement;
    if (element) {
      element.style.overflow = "hidden";
    }

    return () => {
      element.style.overflow = "auto";
    };
  }, []);
  //
  const { unlockCourse, unlockingCourse } = useCareerPathways();
  //
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
                Add Course Code
              </h2>
              <p className="text-[#636369] font-normal text-sm md:text-base lg:text-lg text-center">
                Please add the course code that was sent to <br /> your email.
              </p>
              <OTPInput
                autoFocus
                isNumberInput
                length={6}
                inputStyle={{
                  borderTop: 0,
                  borderLeft: 0,
                  borderRight: 0,
                  borderRadius: 0,
                }}
                className="mx-auto my-10 appearance-none"
                inputClassName="w-5 h-10 md:w-8 md:h-12 mx-1 md:mx-2 text-2xl text-center rounded-md border border-gray-400 overflow-y-hidden focus:!outline-none"
                onChangeOTP={(value: string) => {
                  setCode(value);
                }}
              />
              <div className="flex flex-wrap min-[476px]:flex-nowrap justify-center items-center gap-5 w-full">
                <Button
                  disabled={unlockingCourse}
                  variant="outline"
                  label="Cancel"
                  type="button"
                  onClick={() => setOpenModal(false) as any}
                  className="!w-full min-[476px]:!w-[170px]"
                />
                <Button
                  disabled={code === "" || unlockingCourse}
                  label={unlockingCourse ? "Submitting" : "Submit"}
                  type="button"
                  className="!w-full min-[476px]:!w-[170px]"
                  onClick={() => unlockCourse(code)}
                  icon={
                    unlockingCourse ? (
                      <LoadSpinner className="!w-[20px] !h-[20px] !mt-1" />
                    ) : (
                      <></>
                    )
                  }
                />
              </div>
            </Mdiv>
          </Mdiv>
        )}
      </Mshow>
    </Fragment>
  );
};
