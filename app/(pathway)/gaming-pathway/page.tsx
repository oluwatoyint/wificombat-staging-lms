"use client";

import { PathwayHero } from "../../components/CodingPathwayComps/hero";
import { Outcomes } from "../../components/CodingPathwayComps/outcomes";
import { PathwayRoadmap } from "../../components/CodingPathwayComps/pathway-roadmap";
import { TodayComp } from "../../components/CodingPathwayComps/today-comp";
import { WhyCodingPathway } from "../../components/CodingPathwayComps/why-coding";
import Footer from "../../components/general/Footer";
import GeneralNavbar from "../../components/general/GeneralNavbar";
import {
  codingSteps,
  gamingOutcomes,
  gamingPathwayImages,
} from "../../utils/types-and-links";
import { GamingOnboarding } from "../../components/OnboardingComps/gaming-onboarding";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PathwayHero
        image="/hero-2.png"
        bgColor="bg-blue-300"
        header="Shape Your Gaming Career Pathway"
        desc="Ready to turn your passion for gaming into a career? Dive into the world of game development and start your game career pathway"
      />
      <WhyCodingPathway
        // images={gamingPathwayImages}
        pathwayImage="/assets/pathway/gaming-pathway-3.png"
        headerOne="Why Gaming Pathway?"
        pOne="The Gaming Pathway on our WiFiCombat eLearn platform introduces students to the exciting 
        world of game design and development. Through a combination of creativity, storytelling, and 
        technical skills, students learn how to design, build, and test their own games. "
        pTwo="This pathway not only teaches coding and programming but also fosters critical thinking,
         collaboration, and problem-solving skills. With gaming becoming a key industry in tech, the 
         Gaming Pathway equips learners with the knowledge and tools they need to explore careers in 
         game development, interactive media, and beyond, while turning their passion for gaming into real-world expertise."
      />
      <PathwayRoadmap
        title="Gaming"
        steps={codingSteps}
        pathway="gaming-pathway"
      />
      <Outcomes outcomes={gamingOutcomes} />
      <GamingOnboarding />
      <TodayComp
        desc="Unleash your creativity and bring your gaming ideas to life. Our Gaming Pathway provides you with the tools, skills, and knowledge you need to become a game developer. Start building your own games today!"
        header="Start Building Your Own Games Today!"
        linkto="/schools/pricing-plan"
      />
      <Footer />
    </div>
  );
}
