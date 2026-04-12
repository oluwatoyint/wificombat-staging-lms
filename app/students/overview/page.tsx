import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { FAQ } from "@/app/components/Home/faq";
import Impact from "@/app/components/Home/Impact";
import { IntroducingCareerPath } from "@/app/components/StudentsComps/Overview/career-path";
import { EmpowerLearningJourney } from "@/app/components/StudentsComps/Overview/empower-journey";
import { StudentsHero } from "@/app/components/StudentsComps/Overview/hero";
import { TechSkill } from "@/app/components/StudentsComps/Overview/learn-tech-skill";
import { PricingPlan } from "@/app/components/StudentsComps/Overview/pricing";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <StudentsHero 
      text="student-overview.png"
      headerOne="Empower K-12 Students with a Tech Pathway."
      headerTwo="Join a global network of schools offering top-notch education in coding, multimedia design, AI, 
      gaming, robotics, and IoT. Our platform provides the curriculum, tools, and guidance to help students 
      apply their skills and thrive in diverse tech industries. "
      bgColor="purple"
      btnColor={true}
      textColor={true}
      />
      <TechSkill />
      <EmpowerLearningJourney />
      <IntroducingCareerPath />
      {/* <PricingPlan/> */}
      <Impact />
      <FAQ noSpace={true}/>
      <Footer />
    </div>
  );
}