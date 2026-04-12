import { CurriculumCard } from "./curriculum-card";
import { Onboarding } from "./onboarding";
import HeadingDesign from "../general/HeaderDesign";

type Props = {
  dontShowOnboarding?: boolean;
}

export const SchoolCurriculum = ({dontShowOnboarding}: Props) => {
  return (
    <section className="relative">
      <HeadingDesign heading="Career Pathway school curriculum" />

      <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
        <p className="md:w-[80%] lg:w-[70%] mx-auto mt-6 md:mt-9 lg:mt-12 text-center font-medium">
        The Career Pathway School Curriculum on the WiFiCombat eLearn platform is designed to equip students with essential tech skills through a structured program that aligns with their academic journey, preparing them for future careers in fields like coding, AI, robotics, and multimedia
        </p>

        <div className="mt-14 md:mt-24 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          <CurriculumCard
            borderColor="border-purple-500"
            bgColor="bg-purple-50"
            title="Elementary"
            star="/star-1.svg"
            list={["Introduction to algorithm and LightBot",
                  "Getting Started with programming on Pictoblox",
                  "Introduction to MBlock",
                  "Basic Programming Concepts",
                  "Getting Started with Bitsbox",
                  "Multimedia and Animations",
                  "Events in JavaScript",]}
          />
          <CurriculumCard
            borderColor="border-blue-500"
            bgColor="bg-blue-50"
            title="Junior High School"
            star="/star-2.svg"
            list={["Getting Started with App Inventor",
              "Basic Components in App Inventor",
              "Introduction to Blocks Programming",
              "Advanced Blocks and Layouts",
              "Introduction to AI",
              "Introduction to Machine Learning",
              "Image Recognition",
            "Intermediate User Interface and Multimedia",]}
          />
          <CurriculumCard
            borderColor="border-black-500"
            bgColor="bg-black-50"
            title="Senior Secondary School"
            star="/star-3.svg"
            list={["Web Development basics",
              "Building Web Pages",
              "Introduction to Styling",
              "Introduction to SASS",
              "Introduction to JavaScript Basics",
              "Introduction to Bootstrap",
              "Version Control (Git & Github)",]}
          />
        </div>

        {!dontShowOnboarding && 
        <div className="">
          <Onboarding />
        </div>}
        
      </div>
    </section>
  );
};