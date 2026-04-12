"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";

const SuccessfulModal = ({
  showModal,
  setShowModal,
  text_one,
  text_two,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  text_one: string;
  text_two: string;
}) => {
  return (
    <>
      {showModal && (
        <div
          className={`fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto`}
        >
          <div
            className="fixed inset-0 bg-[#26002C80]"
            onClick={() => setShowModal(false)}
          ></div>
          <div
            className={`bg-white rounded-3xl shadow-lg z-60 w-full p-6 
      relative  max-w-lg max-md:mt-16 h-fit max-md:w-[96%]`}
          >
            <div className="flex flex-col items-center">
              <Image
                src={`/assets/check2.png`}
                alt="success"
                width={91}
                height={87}
                className="mt-7 object-contain mx-auto"
              />

              <div className="mt-6 text-xl font-semibold text-center">
                {text_one}
              </div>
              <p className="text-lg font-medium my-4 text-center">{text_two}</p>

              <Button
                className="!w-[95%] min-[480px]:!w-[280px] mx-auto"
                label="Okay"
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessfulModal;
