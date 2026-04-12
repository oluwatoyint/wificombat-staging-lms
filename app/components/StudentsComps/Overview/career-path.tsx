import HeadingDesign from "../../general/HeaderDesign";
import { CurriculumCard } from "../../Home/curriculum-card";

export const IntroducingCareerPath = () => {
  return (
    <section>
      <HeadingDesign heading="introducing career path" />

      <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
        <p className="md:w-[88%] mx-auto mt-6 md:mt-9 lg:mt-12 md:text-2xl text-center font-medium">
        The WiFiCombat eLearn platform&apos;s Career Pathway feature guides students in discovering their ideal tech careers through personalized assessments and tailored learning resources.

        </p>

        <div className="mt-14 md:mt-24 mb-20 grid grid-cols-1 lg:grid-cols-3 gap-9">
          <CurriculumCard
            borderColor="border-purple-500"
            bgColor="bg-purple-50"
            title="Beginner (Level 1)"
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
            title="Intermediary"
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
            title="Advanced"
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
      </div>
    </section>
  );
};
