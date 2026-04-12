import HeadingDesign from "../../general/HeaderDesign";
import { BenefitCard } from "../../Home/benefits-card";

export const EmpowerLearningJourney = () => {
  return (
    <section>
      <HeadingDesign heading="empower your learning journey" />

      <div className="mt-12 md:mt-16 lg:mt-20 mb-20 w-[93%] md:w-[90] lg:w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          <BenefitCard
            borderColor="border-blue-500"
            bgColor="bg-blue-500"
            desc="Gain in-depth knowledge and practical skills in high-demand tech fields like coding, robotics, multimedia design, IoT, and AI. Our courses are designed to build a strong foundation and advance your expertise."
            title="Skill Development"
            col={true}
            image="/empower-journey-1.png"
          />

          <BenefitCard
            borderColor="border-purple-200"
            bgColor="bg-purple-200"
            desc="Our pathways are structured to cater to different learning stages, from beginners to advanced learners. Personalized assessments help you find the right starting point and progress at your own pace."
            title="Tailored Learning Experience"
            col={true}
            image="/skill-2.png"
          />

          <BenefitCard
          borderColor="border-black-300"
          bgColor="bg-black-300"
          desc="Engage in interactive, hands-on projects that simulate real-world scenarios. This practical approach ensures you not only understand the concepts but also know how to apply them effectively."
          title="Hands-On-Learning"
          col={true}
          image="/skill-3.png"
          />
        </div>
      </div>

      {/* <div className="h-[900px]"></div> */}
    </section>
  );
};
