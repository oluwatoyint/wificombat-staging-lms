import HeadingDesign from "../../general/HeaderDesign";
import { BenefitCard } from "../../Home/benefits-card";

export const EmpowerLearningJourney = () => {
  return (
    <section>
      <HeadingDesign heading="empower your learning journey" />

      <div className="mt-12 md:mt-16 lg:mt-20 mb-20 w-[93%] md:w-[90] lg:w-[88%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
          <BenefitCard
            borderColor="border-blue-500"
            bgColor="bg-blue-500"
            desc="Apply knowledge from various disciplines to complete real-world projects."
            title="Project-Based Learning"
            col={true}
            image="/empower-journey-1.png"
          />

          <BenefitCard
            borderColor="border-yellow-300"
            bgColor="bg-yellow-300"
            desc="Enhance critical thinking and innovation skills by solving complex problems across different technological domains."
            title="Critical Thinking"
            col={true}
            image="/empower-journey-2.png"
          />

          <BenefitCard
          borderColor="border-black-300"
          bgColor="bg-black-300"
          desc="Develop the ability to present technical ideas clearly and effectively, both in writing and orally."
          title="Communication skills"
          col={true}
          image="/empower-journey-3.png"
          />

          <BenefitCard
            borderColor="border-purple-200"
            bgColor="bg-purple-200"
            desc="Prepare for careers in technology through internships, industry certifications, and portfolio development."
            title="Career Readiness"
            col={true}
            image="/empower-journey-4.png"
          />
        </div>
      </div>

      {/* <div className="h-[900px]"></div> */}
    </section>
  );
};
