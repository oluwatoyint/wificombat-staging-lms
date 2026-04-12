"use client";
import Image from "next/image";
import HeadingDesign from "../general/HeaderDesign";

const outcomes = [
  {
    desc: "Understand the basic concept of coding and its importance",
    bgImage: "/mdi_code-block-tags.png",
  },
  {
    desc: "Identify and explain simple algorithms annd sequences",
    bgImage: "/mdi_state-machine.png",
  },
  {
    desc: "Recognize and create simple patterns using code",
    bgImage: "/mdi_code-braces.png",
  },
  {
    desc: "Develop problem solving skills through coding activities",
    bgImage: "/mdi_console.png",
  },
  {
    desc: "Understand the concept of step by step instructions ",
    bgImage: "/mynaui_list.png",
  },
  {
    desc: "Create simple programs using visual programming tools",
    bgImage: "/Vector.png",
  },
];
export const OutCome = ({ modules }: { modules: any }) => {
  return (
    <section className="mb-10">
      <HeadingDesign heading="LEARNING OUTCOMES" />
      <div className="mt-8 w-[93%] md:w-[90%] lg:w-[88%] mx-auto md:mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-9">
        {modules?.map((module: any) => (
          <div key={module?.id} className="w-full text-center">
            <div
              dangerouslySetInnerHTML={{ __html: module?.learning_outcome }}
              className="styleElements"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
