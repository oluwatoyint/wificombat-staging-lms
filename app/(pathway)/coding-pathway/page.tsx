"use client";

import { PathwayHero } from "../../components/CodingPathwayComps/hero";
import { CodingOnboarding } from "../../components/OnboardingComps/coding-onboarding";
import { Outcomes } from "../../components/CodingPathwayComps/outcomes";
import { PathwayRoadmap } from "../../components/CodingPathwayComps/pathway-roadmap";
import { TodayComp } from "../../components/CodingPathwayComps/today-comp";
import { WhyCodingPathway } from "../../components/CodingPathwayComps/why-coding";
import Footer from "../../components/general/Footer";
import GeneralNavbar from "../../components/general/GeneralNavbar";
import { codingOutcomes, codingSteps } from "../../utils/types-and-links";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PathwayHero
        image="/hero-1.png"
        bgColor="bg-blue-500"
        header="Discover Your Coding Career Pathway"
        desc="Turn your passion for technology into a thriving career in software engineering or DevOps. 
      Begin your path with us"
      />
      <WhyCodingPathway
        // images={codingPathwayImages}
        pathwayImage="/assets/pathway/coding-pathway-2.png"
        headerOne="Why Coding Pathway?"
        pOne="The Coding Pathway on our WiFiCombat eLearn platform is designed to equip students with essential coding skills
         that are crucial for success in the digital age. Through interactive lessons, hands-on projects, and personalized 
         guidance, students can explore the world of programming, develop problem-solving abilities, and create innovative 
         solutions."
        pTwo="Whether they are interested in web development, app creation, or gaming, the Coding Pathway opens up endless 
        opportunities for young learners to discover their passion, build technical expertise, and prepare for future careers 
        in technology. Our goal is to nurture creativity and critical thinking, empowering students to become the next 
        generation of tech innovators."
      />
      <PathwayRoadmap
        title="Coding"
        steps={codingSteps}
        pathway="coding-pathway"
      />
      <Outcomes outcomes={codingOutcomes} />
      <CodingOnboarding />
      <TodayComp
        header="Start Coding Today"
        desc="Start your coding journey today and unlock a world of endless possibilities. Learn from experienced instructors and build amazing projects."
        linkto="/schools/pricing-plan"
      />
      <Footer />
    </div>
  );
}
