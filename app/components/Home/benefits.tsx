import HeadingDesign from "../general/HeaderDesign";
import { BenefitCard } from "./benefits-card";

export const Benefits = () => {
  return (
    <section className="relative">
      <HeadingDesign heading="benefits" />

      <div className="mt-12 md:mt-16 mb-20 w-[93%] md:w-[90] lg:w-[88%] 2xl:w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 2xl:gap-14">
          <BenefitCard
            borderColor="border-blue-500"
            bgColor="bg-blue-500"
            desc="Gain in-depth knowledge and practical skills in high-demand tech fields like coding, 
                robotics, multimedia design, IoT, and AI. Our courses are designed to build a strong foundation 
                and advance your expertise."
            title="Comprehensive Skill Development"
            image="/skill-1.png"
          />

          <BenefitCard
            borderColor="border-purple-200"
            bgColor="bg-purple-200"
            desc="Our pathways are structured to cater to different learning stages, from beginners 
                to advanced learners. Personalized assessments help you find the right starting point 
                and progress at your own pace."
            title="Tailored Learning Experience"
            image="/skill-2.png"
          />

          <BenefitCard
            borderColor="border-yellow-300"
            bgColor="bg-yellow-300"
            desc="Engage in interactive, hands-on projects that simulate real-world scenarios. This practical 
                approach ensures you not only understand the concepts but also know how to apply them effectively."
            title="Hands-On Learning"
            image="/skill-3.png"
          />

          <BenefitCard
            borderColor="border-blue-200"
            bgColor="bg-blue-200"
            desc="Prepare for future career opportunities with industry-relevant skills and certifications. 
                Our pathways are aligned with current market trends and demands, ensuring you're ready to meet 
                employer expectations."
            title="Career Readiness"
            image="/skill-4.png"
          />

          <BenefitCard
            borderColor="border-purple-500"
            bgColor="bg-purple-500"
            desc="Utilize cutting-edge learning tools and resources, including solar-powered tablets for sustainable 
                learning, advanced software, and state-of-the-art labs to enhance your educational experience."
            title="Innovative Learning Tools"
            image="/skill-5.png"
          />

          <BenefitCard
            borderColor="border-yellow-500"
            bgColor="bg-yellow-500"
            desc="We assist children in building their portfolios tailored to their chosen career pathway. By showcasing 
                relevant skills, projects, and achievements, we help them create a compelling portfolio that aligns with their 
                future career goals. "
            title="Portfolio Building"
            image="/skill-6.png"
          />
        </div>
      </div>
    </section>
  );
};
