import Image from "next/image";
import React from "react";

const Certificate = ({
  name = "Uchenna Mbah",
  course_name = "Web Development Foundation 1",
}: {
  name?: string;
  course_name?: string;
}) => {
  return (
    <div className="relative w-full min-h-[242px] border p-3 overflow-hidden">
      <Image
        src={"/cert/wifi-logo.png"}
        width={800}
        height={400}
        alt="wifi logo image"
        className="w-[80px]"
      />
      <div className="flex items-center gap-3 -rotate-[54deg] absolute top-5 right-2">
        <div className="h-4 w-4 bg-[#9370db]" />
        <div className="h-4 w-4 bg-[#ffd700]" />
      </div>
      {/*  */}
      <div className="flex flex-col gap-1 items-center justify-center mt-3 mb-4">
        <h3 className="text-2xl font-bold text-black">CERTIFICATE</h3>
        <h5 className="font-bold text-xs w-fit bg-[#ffd700] px-2 py-1">
          OF PARTICIPATION
        </h5>
      </div>
      {/*  */}
      <p className="text-xs text-gray-600 font-semibold text-center mb-5">
        THIS CERTIFICATE IS PRODULY PRESENTED TO
      </p>
      {/*  */}
      <div className="flex flex-col items-center justify-center mb-6">
        <h2 className="font-bold text-3xl text-black px-4 border-b-2 border-b-black">
          {name}
        </h2>
        <p className="text-center text-xs text-black/90 font-semibold my-1">
          Completed the <br />
          {course_name}
        </p>
      </div>
      {/*  */}
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col gap-1 items-center">
          <div className="min-w-[84px] border-b-2 border-b-black"></div>
          <p className="text-sm">DATE</p>
        </div>

        <Image
          src={"/cert/medal.png"}
          width={800}
          height={400}
          alt="wificombat logo image"
          className="w-[40px]"
        />

        <div className="flex flex-col gap-1 items-center">
          <div className="min-w-[84px] border-b-2 border-b-black"></div>
          <p className="text-sm">SIGNATURE</p>
        </div>
      </div>
      <Image
        src={"/cert/wificomabat-01.png"}
        width={800}
        height={400}
        alt="wificombat logo image"
        className="w-[120px] absolute -left-14 -bottom-5"
      />
    </div>
  );
};

export default Certificate;
