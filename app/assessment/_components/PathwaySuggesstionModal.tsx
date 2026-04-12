import { Button } from "@/app/components/base-components/Button";
import { Mdiv } from "@/app/libs/framer-exports";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

export const PathwaySuggesstionModal = ({
  suggestedPathway,
  setShow,
}: {
  suggestedPathway: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  console.log(suggestedPathway);
  return (
    <Mdiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 top-0 right-0 bottom-0 left-0 bg-modal-bg flex flex-col justify-center items-center z-[999]"
    >
      <div
        className="fixed inset-0 bg-[#26002C80]"
        onClick={() => setShow(false)}
      ></div>
      <Mdiv
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="relative z-50 w-[94%] sm:w-[450px] rounded-2xl bg-white p-5"
      >
        <div className="flex flex-col items-center">
          <Image
            src={`/assets/check2.png`}
            alt="success"
            width={91}
            height={87}
            className="mt-2 object-contain mx-auto"
          />
          <div className="mt-8 p-6 bg-blue-50 rounded-lg text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-3">Assessment Complete!</h3>
            <p className="mb-4">
              After analyzing your answers, we find that your area of Interest
              would be in the <br />
              <span className="font-bold text-blue-600 capitalize text-lg 576:text-xl sm:text-2xl">{` "${suggestedPathway
                .replace(/[-_]+/g, " ")
                .trim()}" `}</span>
              <br />
              Pathway.
            </p>
            <Button
              onClick={() =>
                // router.push(`/courses?pathway=${suggestedPathway}`)
                router.push(`/courses`)
              }
              label="Explore Courses in This Pathway"
              className="!w-fit mx-auto text-white"
            />
            <p className="mt-3 text-sm text-gray-600 mb-4">
              Or select a different pathway from our course catalog
            </p>
            <Button
              onClick={() => router.push(`/courses`)}
              label="Explore Courses"
              className="!w-fit mx-auto text-white"
            />
          </div>
        </div>
      </Mdiv>
    </Mdiv>
  );
};
