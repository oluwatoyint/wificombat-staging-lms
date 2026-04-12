import HeadingDesign from "../../general/HeaderDesign";
import { BenefitCard } from "../../Home/benefits-card";

export const BenefitOfTeachers = () => {
  return (
    <section>
      <HeadingDesign heading="BENEFITS FOR TEACHERS" />

      <div className="mt-12 md:mt-16 lg:mt-20 mb-20 w-[93%] md:w-[90] lg:w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          <BenefitCard
            borderColor="border-blue-500"
            bgColor="bg-blue-500"
            desc="WiFiCombat eLearn provides ongoing training and professional development opportunities to help teachers stay ahead of the curve in educationaltechnology. These courses include best practices in e-learning, digital classroom management, and integrating STEM subjects. Teachers will have access to workshops, certifications, and resources designed to enhance their tech skills and teaching methodologies."
            title="Professional Development and Training"
            col={true}
            image="/empower-journey-1.png"
          />

          <BenefitCard
            borderColor="border-purple-200"
            bgColor="bg-purple-200"
            desc="We understand that transitioning to a new platform can be challenging, which is why we offer personalized onboarding support. From step-by-step tutorials to one-on-one consultations, our team will assist teachers in navigating the platform, creating lesson plans, and utilizing the wide range of tools available. We’re committed to making the process seamless and efficient, ensuring that every teacher feels confident using WiFiCombat eLearn from day one."
            title="Comprehensive Onboarding Support"
            col={true}
            image="/skill-2.png"
          />

          <BenefitCard
          borderColor="border-black-300"
          bgColor="bg-black-300"
          desc="WiFiCombat eLearn offers an extensive collection of multimedia resources, including videos, simulations, coding exercises, and interactive quizzes, that help teachers create more engaging and effective lessons. This diverse content allows teachers to cater to different learning styles, helping students grasp complex concepts in fun and innovative ways."
          title="Access to Engaging and Interactive Content"
          col={true}
          image="/mdi_content.png"
          />
           <BenefitCard
          borderColor="border-black-300"
          bgColor="bg-yellow-100"
          desc="With our platform's built-in assessment tools, teachers can instantly gauge student understanding and provide immediate feedback. This allows for timely interventions, ensuring that no student falls behind. Teachers can also customize assessments to fit their unique curriculum needs and track each student’s growth throughout the year."
          title="Real Time Assessment and Feedback"
          col={true}
          image="/mdi_clock.png"
          />
           <BenefitCard
          borderColor="border-black-300"
          bgColor="bg-blue-200"
          desc="WiFiCombat eLearn fosters a collaborative environment where teachers can connect with other educators both locally and globally. This opens up opportunities to share ideas, lesson plans, and teaching strategies, creating a supportive community of educators dedicated to improving learning outcomes."
          title="Collaboration and Networking"
          col={true}
          image="/mdi_account.png"
          />
        </div>
      </div>

      {/* <div className="h-[900px]"></div> */}
    </section>
  );
};
