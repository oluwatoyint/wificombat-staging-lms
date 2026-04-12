// components/DiscountPopup.tsx
"use client";
import { ThreeRightIcon } from "@/app/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";

const discountData = [
  {
    percent: 100,
    color: "bg-blue-400",
    theme: "text-black",
    text: "text-blue-400",
  },
  {
    percent: 15,
    color: "bg-yellow-400",
    theme: "text-black",
    text: "text-yellow-400",
  },
  {
    percent: 5,
    color: "bg-pink-300",
    theme: "text-black",
    text: "text-pink-300",
  },
  {
    percent: 20,
    color: "bg-orange-400",
    theme: "text-black",
    text: "text-orange-400",
  },
  {
    percent: 25,
    color: "bg-blue-500",
    theme: "text-white",
    text: "text-blue-500",
  },
  {
    percent: 50,
    color: "bg-fuchsia-600",
    theme: "text-white",
    text: "text-fuchsia-600",
  },
];

export default function DiscountPopup() {
  const [show, setShow] = useState(false);
  const [popupData, setPopupData] = useState<{
    percent: number;
    color: string;
    theme: string;
    text: string;
  } | null>(null);

  useEffect(() => {
    const tryShowPopup = () => {
      const alreadyShown = sessionStorage.getItem("discountShown");

      if (!alreadyShown) {
        const random = Math.floor(Math.random() * discountData.length);
        setPopupData(discountData[random]);
        setShow(true);
        sessionStorage.setItem("discountShown", "true");

        // Clear session flag after X seconds to allow another popup later
        setTimeout(() => {
          sessionStorage.removeItem("discountShown");
          tryShowPopup(); // Optionally trigger another immediately, or let another useEffect loop handle it
        }, 60000); // clear after 60 seconds (adjust as needed)
      } else {
        // Retry after a while to check again
        setTimeout(tryShowPopup, 10000); // check again in 10s
      }
    };

    // Initial delay before first popup
    const initialTimeout = setTimeout(
      tryShowPopup,
      Math.random() * 15000 + 10000
    ); // 10–25s

    return () => clearTimeout(initialTimeout);
  }, []);

  if (!show || !popupData) return null;

  // h-[calc(100dvh-220px)]

  return (
    <div className="fixed inset-0 bg-modal-bg top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center z-[9999]">
      <div className="relative overflow-auto h-[340px] bg-[#131314] w-[90%] min-[800px]:w-[768px] mx-auto px-4 py-3 flex gap-4 justify-between items-center">
        <div className="h-[240px] w-[240px] bg-[#19191A] rounded-full absolute -left-7 -top-10" />

        <div className="relative flex-[1.1] -ml-3 z-20 flex flex-col gap-14 justify-center items-center">
          <div className="flex flex-col gap-3 items-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-white">
              {popupData?.percent}%
            </h3>
            <h4
              className={`${popupData?.text} text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold`}
            >
              DISCOUNT
            </h4>
          </div>
          <Link href="/courses" onClick={() => setShow(false)}>
            <button className="mt-3 h-[48px] w-[154px] flex justify-center items-center font-semibold bg-white text-black-500 px-4 py-1 rounded">
              Buy Now
            </button>
          </Link>
        </div>

        <div className="relative z-20 flex flex-[1.5] flex-col gap-20 justify-center h-full">
          <div className="flex items-center gap-3 justify-between">
            <ThreeRightIcon />
            <p className="text-sm text-white/70">LIMITED OFFER</p>
            <BiX
              className="cursor-pointer text-white"
              size={28}
              onClick={() => setShow(false)}
            />
          </div>
          <div>
            <div
              className={`text-2xl w-fit sm:min-w-[348px] max-w-[348px] flex justify-center items-center sm:text-3xl md:text-4xl lg:text-5xl text-black-500 px-4 py-2 font-bold pb-8 mx-auto min-h-[154px] max-h-[154px] text-center ${popupData?.color}`}
            >
              DICOUNT <br />
              SALES
            </div>
            <div className="w-fit sm:min-w-[270px] sm:max-w-[270px] min-h-[56px] max-h-[56px] mx-auto relative z-20 -mt-5 text-2xl sm:text-3xl px-4 py-2 italic font-semibold bg-white flex justify-center items-center">
              MEGA SALES
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
