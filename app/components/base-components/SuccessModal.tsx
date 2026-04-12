import { Mdiv, Mshow } from "@/app/libs/framer-exports";
import { Fragment, useEffect } from "react";

import "@smastrom/react-rating/style.css";
import { useRouter, useSearchParams } from "next/navigation";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

export const SuccessModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const is_success = searchParams.get("is_success");
  const params = new URLSearchParams(searchParams);
  //
  //
  useEffect(() => {
    const element = document.documentElement;
    if (element) {
      element.style.overflow = "hidden";
    }

    return () => {
      element.style.overflow = "unset";
    };
  }, []);
  //
  return (
    <Fragment>
      <Mshow mode="wait">
        {is_success && is_success === "true" && (
          <Mdiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[800] h-[100dvh] w-full flex flex-col justify-center bg-black/40 backdrop-blur-[2px] items-center"
          >
            <div className="fixed top-0 left-0 right-0 bottom-0" />
            <Mdiv
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative max-w-[500px] flex flex-col justify-center items-center gap-4 z-[801] p-5 md:p-8 rounded-lg bg-white"
            >
              <IoCheckmarkCircle size={70} className="text-green-700" />
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center">
                Wallet Funded
              </h2>
              <p className="text-[#636369] font-normal text-sm md:text-base lg:text-lg text-center">
                Your wallet has been funded successfully
              </p>
              <IoIosCloseCircle
                className="absolute cursor-pointer right-4 top-4 text-red-400"
                size={22}
                onClick={() => {
                  params.delete("is_success");
                  router.replace(`?${params}`);
                }}
              />
            </Mdiv>
          </Mdiv>
        )}
      </Mshow>
    </Fragment>
  );
};
