"use client";
import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import Image from "next/image";
import { useGetCertificates } from "@/app/hooks/user/useGetCertificates";

type Props = {};

const Card = () => {
  return (
    <div className="w-full h-[160px] lg:h-[200px] 2xl:h-[300px] relative bg-primary-gray rounded-2xl">
      <div className="absolute right-2 bottom-2 bg-black-50 py-3 px-4 rounded-lg flex items-center justify-center">
        <MdOutlineFileDownload size={25} className="text-black-600" />
      </div>
    </div>
  );
};

const Certificates = (props: Props) => {
  const { myCertificates, loadingMyCertificates } = useGetCertificates();
  return (
    <div className="w-[95%] mx-auto">
      <h2 className="mt-4 text-lg font-semibold text-black-800">
        Certificates
      </h2>
      <p className="text-sm md:text-base text-black-600">
        Certificates of my completed courses
      </p>

      {myCertificates && myCertificates?.length < 1 && (
        <p className="mt-6 text-black-600 text-sm md:text-base">
          There&apos;s currently no certificate available
        </p>
      )}
      <div className="mt-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loadingMyCertificates &&
          Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="rounded-md h-[80px] w-[100px] bg-gray-200 animate-pulse"
            />
          ))}
        {myCertificates &&
          myCertificates?.map((item: any) => (
            <Image
              key={item?.id}
              src={item?.certificate_file?.media}
              alt={`logo`}
              width={500}
              height={500}
              className="w-full my-auto lg:w-[93px] object-contain text-neutral-400"
            />
          ))}
      </div>
    </div>
  );
};

export default Certificates;
