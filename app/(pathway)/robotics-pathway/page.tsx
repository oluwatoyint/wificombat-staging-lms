"use client";

import { PathwayHero } from "../../components/CodingPathwayComps/hero";
import { Outcomes } from "../../components/CodingPathwayComps/outcomes";
import { PathwayRoadmap } from "../../components/CodingPathwayComps/pathway-roadmap";
import { TodayComp } from "../../components/CodingPathwayComps/today-comp";
import { WhyCodingPathway } from "../../components/CodingPathwayComps/why-coding";
import Footer from "../../components/general/Footer";
import GeneralNavbar from "../../components/general/GeneralNavbar";
import { iotSteps, robotComes } from "../../utils/types-and-links";
import { RoboticsOnboarding } from "../../components/OnboardingComps/robotics-onboarding";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PathwayHero
        image="/hero-5.png"
        desc="Step into the world of Robotics and IoT with our exclusive career pathway program. Design and implement groundbreaking technologies"
        header="Dive into the Robotics and IoT Career Pathway"
        bgColor="bg-blue-500"
      />
      <WhyCodingPathway
        pathwayImage="/assets/pathway/robotics-pathway-1.png"
        // images={roboticsPathwayImages}
        headerOne="Why Robotics and IOT Pathway?"
        pOne="The IoT/Robotics Pathway on our WiFiCombat eLearn platform is designed to immerse students 
        in the rapidly growing fields of automation, smart technology, and robotics. Through hands-on learning, 
        students explore how connected devices and robots can interact with the physical world, solve 
        real-life problems, and improve everyday life. "
        pTwo="This pathway introduces them to essential concepts such as sensors, actuators, and programming, 
        fostering critical thinking and innovation. As the demand for IoT and robotics solutions expands across 
        industries, this pathway prepares students for future careers in engineering, technology, and AI, equipping them with 
        the skills to build and control intelligent systems."
      />
      <PathwayRoadmap
        title="Robotics and Iot"
        steps={iotSteps}
        pathway="robotics-pathway"
      />
      <Outcomes outcomes={robotComes} />
      <RoboticsOnboarding />
      <TodayComp
        desc="Embark on an exciting journey into the world of robotics and IoT. Our program provides you with the skills and knowledge to design, build, and program innovative robotic systems. Start your adventure today!"
        header="Start Learning Robotics and IOT Today!"
        linkto="/schools/pricing-plan"
      />
      <Footer />
    </div>
  );
}
