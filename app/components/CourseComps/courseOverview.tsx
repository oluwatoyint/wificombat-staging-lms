import React from "react";
import { FaCheckCircle, FaLaptopCode, FaRegFileAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { LuBaby } from "react-icons/lu";
import { RiFoldersLine } from "react-icons/ri";
import { BsCardChecklist } from "react-icons/bs";
import { TbCertificate } from "react-icons/tb";

type Props = {
  desc: string;
  modules: any[];
};

const overview = [
  { image: <FaRegUser size={23} />, content: "Begineer" },
  { image: <LuBaby size={23} />, content: "Age" },
  { image: <FaRegFileAlt size={23} />, content: "11 Lessons" },
  { image: <RiFoldersLine size={23} />, content: "1 Project" },
  { image: <BsCardChecklist size={23} />, content: "11 Quizzes" },
  { image: <TbCertificate size={23} />, content: "1 Certificate" },
  { image: <FaLaptopCode size={23} />, content: "Self Learning" },
];

const objectives = [
  "Interactive coding exercises and tutorials",
  "Gamified learning experiences",
  "Project-based learning with real-world applications",
  "Creative challenges with coding elements",
];

const notes = [
  "You can buy the whole course or buy per module",
  "If you buy a course, you only have access to the course for 6 months",
  "If you buy a module, you only have access to the module for 6 weeks",
];

const CourseOverview = ({ desc, modules }: Props) => {
  return (
    <>
      <div className="py-8 md:py-12 lg:py-16 w-[93%] md:w-[90%] lg:w-[88%] mx-auto text-black-500">
        <h2 className="font-semibold text-2xl md:text-3xl xl:text-4xl">
          Course Overview
        </h2>

        <div
          className="mt-4 text-black-700 text-lg styleElements"
          dangerouslySetInnerHTML={{ __html: desc }} // Correct way to use dangerouslySetInnerHTML
        />

        <div className="mt-8 flex flex-wrap items-center gap-5">
          {overview.map((overview, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="relative w-[3.5rem] h-[3.5rem] md:w-[4.5rem] md:h-[4.5rem] ">
                <div className="polygon w-full h-full flex items-center justify-center bg-black-50">
                  <div className="text-2xl font-bold">{overview.image}</div>
                </div>
              </div>

              <div>
                <p className="text-lg md:text-lg 2xl:text-3xl">
                  {overview.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OBJECTIVES */}
      <div className="pt-5 pb-8 md:pb-12 lg:pb-16 text-black-500 bg-blue-50">
        <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-7">
            <div className="mt-7 flex flex-col gap-4">
              <h2 className="font-semibold text-2xl md:text-3xl">Objectives</h2>

              {modules?.map((module, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div>
                    <FaCheckCircle size={18} className="text-yellow-500" />
                  </div>

                  <div
                    dangerouslySetInnerHTML={{ __html: module?.objectives }}
                    className="styleElements"
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-4">
              <h2 className="font-semibold text-2xl md:text-3xl">
                Please Note:
              </h2>
              {notes.map((note, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div>
                    <FaCheckCircle size={18} className="text-yellow-500" />
                  </div>

                  <div>
                    <p className="md:text-lg">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* OBJECTIVES */}
    </>
  );
};

export default CourseOverview;
