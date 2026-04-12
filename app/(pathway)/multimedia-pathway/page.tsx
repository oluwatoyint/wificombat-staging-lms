"use client";

import { PathwayHero } from "../../components/CodingPathwayComps/hero";
import { Outcomes } from "../../components/CodingPathwayComps/outcomes";
import { PathwayRoadmap } from "../../components/CodingPathwayComps/pathway-roadmap";
import { TodayComp } from "../../components/CodingPathwayComps/today-comp";
import { WhyCodingPathway } from "../../components/CodingPathwayComps/why-coding";
import Footer from "../../components/general/Footer";
import GeneralNavbar from "../../components/general/GeneralNavbar";
import {
  multiComes,
  multimediaPathwayImages,
  multimediaSteps,
} from "../../utils/types-and-links";
import { MultimediaOnboarding } from "../../components/OnboardingComps/multimedia-onboarding";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PathwayHero
        image="/hero-3.png"
        widthStyle="w-[75%] object-contain"
        desc="Your Journey in Multimedia Starts Here! Join our program to become a skilled Animator, Illustrator, and 2D & 3D Designer. Shape your creative future with us."
        header="Explore the Multimedia Pathway"
        bgColor="bg-purple-500"
      />
      <WhyCodingPathway
        // images={multimediaPathwayImages}
        pathwayImage="/assets/pathway/multimedia-pathway-2.png"
        headerOne="Why Multimedia Pathway?"
        pOne="The Multimedia Pathway on our WiFiCombat eLearn platform empowers students to explore and 
        master the art of digital storytelling and content creation. Through engaging lessons in graphic 
        design, video production, animation, and audio editing, students learn how to craft compelling 
        multimedia projects that communicate ideas effectively across various platforms. "
        pTwo="This pathway encourages creativity, technical proficiency, and communication skills, preparing 
        students for careers in media, entertainment, marketing, and beyond. As digital media continues to 
        dominate industries, the Multimedia Pathway gives students the tools to turn their imagination 
        into impactful visual and auditory experiences."
      />
      <PathwayRoadmap
        title="Multimedia"
        steps={multimediaSteps}
        pathway="multimedia-pathway"
      />
      <Outcomes outcomes={multiComes} />
      <MultimediaOnboarding />
      <TodayComp
        desc="Unleash your creativity and bring your visions to life. Our Multimedia Design program equips you with the skills and tools to create stunning visuals and interactive experiences. Start your journey today!"
        header="Start Multimedia Design Today!"
        linkto="/schools/pricing-plan"
      />
      <Footer />
    </div>
  );
}
