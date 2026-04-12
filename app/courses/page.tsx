import React from "react";
import Footer from "../components/general/Footer";
import { CareerPathwayCurriculum } from "../components/StudentsComps/Curriculum/pathway-curriculum";
import GeneralNavbar from "../components/general/GeneralNavbar";
import Image from "next/image";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";

const CoursesPage = () => {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />

      <div className="p-6 sm:p-10 md:p-16 flex items-center gap-2 text-black-500">
        <Link href="/">
          <Image
            src={"/logo-plain-dark.svg"}
            alt="logo plain"
            width={90}
            height={80}
          />
        </Link>
        <BsChevronRight />
        <p className="cursor-pointer select-none">Courses</p>
      </div>

      <div className="px-6 sm:px-10 md:px-16 py-6 flex flex-col justify-center items-center gap-5">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black-500">
          Explore Courses
        </h3>
        <p className="font-semibold text-base md:text-lg lg:text-xl text-black-550 text-center">
          Explore our courses by going through our different career pathways and{" "}
          <br className="hidden sm:block" />
          the various level that have been listed out.
        </p>
      </div>

      <CareerPathwayCurriculum showHeadingDesign={false} />
      <Footer />
    </div>
  );
};

export default CoursesPage;
