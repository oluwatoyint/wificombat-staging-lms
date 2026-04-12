"use client";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import HeadingDesign from "../general/HeaderDesign";
import { motion } from "framer-motion";
import { PathwayCourses } from "./courses";
import Image from "next/image";

const pathwayCourses = [
  {
    pathway: "Gaming",
    courses: 50,
    lessons: 120,
    projects: 20,
    courseslist: [
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
    ],
  },

  {
    pathway: "Coding",
    courses: 50,
    lessons: 120,
    projects: 20,
    courseslist: [
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
    ],
  },

  {
    pathway: "Multimedia",
    courses: 50,
    lessons: 120,
    projects: 20,
    courseslist: [
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
    ],
  },

  {
    pathway: "Robotics & IOT",
    courses: 50,
    lessons: 120,
    projects: 20,
    courseslist: [
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
    ],
  },

  {
    pathway: "AI",
    courses: 50,
    lessons: 120,
    projects: 20,
    courseslist: [
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
    ],
  },

  {
    pathway: "Techpreneurship",
    courses: 50,
    lessons: 120,
    projects: 20,
    courseslist: [
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
      "Lorem ipsum dolor sit ame",
    ],
  },
];

export const CareerPathwayCourses = () => {
  const [seeMoreIndex, setSeeMoreIndex] = useState(-1); // State to track which pathway is expanded

  const toggleMore = (index: number) => {
    setSeeMoreIndex(index === seeMoreIndex ? -1 : index); // Toggle pathway visibility
  };

  return (
    <section>
      <HeadingDesign heading="career pathways courses" />

      <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto mt-9 md:mt-16 mb-20 space-y-8">
        {pathwayCourses.map((pathway, index) => (
          <div
            key={index}
            className="bg-blue-50 border border-blue-200 py-8 px-5 md:px-8 flex flex-col rounded-3xl"
          >
            <div className="flex justify-between">
              <div className="flex gap-2 md:gap-5 lg:gap-8">
                <div className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] bg-primary-gray rounded-full"></div>
                <div className="text-black-500">
                  <h2 className="font-semibold text-xl md:text-3xl lg:text-4xl">
                    {pathway.pathway} Pathway
                  </h2>
                  <p className="mt-3 text-black-800 md:text-2xl">
                    {pathway.courses} Courses, {pathway.lessons} Lessons,{" "}
                    {pathway.projects} Projects
                  </p>
                </div>
              </div>

              <div
                onClick={() => toggleMore(index)}
                className="max-sm:w-10 cursor-pointer"
              >
                {seeMoreIndex === index ? (
                  <IoIosArrowDown size={32} />
                ) : (
                  <IoIosArrowUp size={32} />
                )}
              </div>
            </div>

            {seeMoreIndex === index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-9 md:mt-12 md:px-10"
              >
                <div>
                  <h3 className="font-semibold text-black-500 text-xl md:text-2xl">
                    Courses they will learn
                  </h3>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {pathway.courseslist.map((list, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Image
                          width={24}
                          height={24}
                          src={`/star.png`}
                          alt="star"
                          className="object-contain aspect-auto"
                        />
                        <p className="text-black-500 md:text-lg">{list}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
