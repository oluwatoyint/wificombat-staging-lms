import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const HeroBtns = ({ slide }: { slide: any }) => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  //
  const role = getCookie("role");
  //
  if (!hydrated) return null;
  return (
    <div className="mt-12 lg:mt-16">
      {!role && (
        <Link
          href="/registration"
          className={`
                                                ${
                                                  slide.buttonBlack
                                                    ? "bg-[#131314] text-white focus-visible:outline-black "
                                                    : "bg-white text-black-500"
                                                } rounded-lg px-16 py-5 font-medium shadow-sm 
                                                hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                                focus-visible:outline-offset-2 `}
        >
          Register
        </Link>
      )}
      {role && (
        <Link
          href="/courses"
          className={`
                                                ${
                                                  slide.buttonBlack
                                                    ? "bg-[#131314] text-white focus-visible:outline-black "
                                                    : "bg-white text-black-500"
                                                } rounded-lg px-16 py-5 font-medium shadow-sm 
                                                hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                                focus-visible:outline-offset-2 `}
        >
          Purchase Course
        </Link>
      )}
    </div>
  );
};
