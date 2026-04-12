"use client";
import { FormValues } from "@/app/(auth)/create-profile/page";
import Link from "next/link";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { PiStarFourFill } from "react-icons/pi";

type Props = {
  defaultStyle?: boolean;
  billing: string;
  price: string;
  color: string;
  linkTo?: string;
  boxShadow?: boolean;
  setValue?: UseFormSetValue<FormValues>;
  selectedPlan?: string;
  onSelect?: (billing: string) => void;
};

export const PricingCard = ({
  billing,
  defaultStyle,
  price,
  color,
  linkTo,
  boxShadow,
  setValue,
  selectedPlan,
  onSelect,
}: Props) => {
  const handleSelectPlan = () => {
    if (onSelect && setValue) {
      onSelect(billing);
      setValue("payment.plan", billing);
    }
  };

  const isSelected = selectedPlan === billing;
  return (
    <div
      className={`relative w-full bg-white py-5 md:py-7 lg:py-9 px-4 text-black-500 rounded-3xl 
        ${boxShadow && "form-box md:basis-[46%] cursor-pointer"}
        ${defaultStyle && "border border-purple-500"}
        ${isSelected ? "border border-purple-500" : ""}
        transition-all duration-300`}
      onClick={handleSelectPlan}
    >
      {/* ABOSLUTE BLUR */}
      <div className="absolute flex items-center justify-end inset-0">
        {/* <div className="absolute right-[4rem] lg:right-[5rem] top-3">
                <svg 
                className="max-md:w-5"
                width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 1.44077L17.3123 10.3922L17.3921 10.6079L17.6078 10.6877L26.5592 14L17.6078 17.3123L17.3921 17.3921L17.3123 17.6078L14 26.5592L10.6877 17.6078L10.6079 17.3921L10.3922 17.3123L1.44077 14L10.3922 10.6877L10.6079 10.6079L10.6877 10.3922L14 1.44077Z" fill="white" stroke="#BC00DD"/>
                </svg>
            </div>

            <div className="absolute right-4 top-8 lg:top-14">
                <svg 
                className="max-md:w-5"
                width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 1.44077L17.3123 10.3922L17.3921 10.6079L17.6078 10.6877L26.5592 14L17.6078 17.3123L17.3921 17.3921L17.3123 17.6078L14 26.5592L10.6877 17.6078L10.6079 17.3921L10.3922 17.3123L1.44077 14L10.3922 10.6877L10.6079 10.6079L10.6877 10.3922L14 1.44077Z" fill="white" stroke="#BC00DD"/>
                </svg>
            </div> */}

        {/* <div className="w-[60%] h-full grid grid-cols-3">
                    <div className={`w-[90%] ml-auto h-[25%] rounded-b-[40px] ${color} 
                    ${boxShadow && "bg-opacity-30"} blur-lg`}></div>
                    <div className={`w-[90%] ml-auto h-[45%] rounded-b-[40px] ${color} 
                    ${boxShadow && "bg-opacity-30"} blur-lg`}></div>
                    <div className={`w-[90%] ml-auto h-[65%] rounded-b-[40px] ${color} 
                    ${boxShadow && "bg-opacity-30"} blur-lg`}> </div>
                </div> */}
      </div>
      {/* ABOSLUTE BLUR */}

      <div className="z-[4] relative">
        <h3 className="font-semibold text-2xl md:text-3xl">{billing}</h3>

        <p className={`mt-3 ${!boxShadow && "w-[80%] lg:w-[70%]"}`}>
          Lorem ipsum dolor sit amet consectetur. Facilisis arcu{" "}
        </p>

        <h3 className="text-black-500 mt-8 md:mt-10 text-2xl md:text-4xl font-medium">
          {price}
        </h3>

        {linkTo && (
          <div className="mt-7 md:mt-10 w-full text-white">
            <Link
              href={linkTo}
              className="w-full flex items-center justify-center font-medium 
                    bg-black-500 py-4 rounded-lg transition duration-300 hover:bg-opacity-90"
            >
              Start Learning
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
