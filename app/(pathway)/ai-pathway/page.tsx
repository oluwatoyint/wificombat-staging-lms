"use client";

import { PathwayHero } from "@/app/components/CodingPathwayComps/hero";
import { Outcomes } from "@/app/components/CodingPathwayComps/outcomes";
import { PathwayRoadmap } from "@/app/components/CodingPathwayComps/pathway-roadmap";
import { TodayComp } from "@/app/components/CodingPathwayComps/today-comp";
import { WhyCodingPathway } from "@/app/components/CodingPathwayComps/why-coding";
import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { AIOnboarding } from "@/app/components/OnboardingComps/ai-onboarding";
import { aiSteps, aiComes } from "@/app/utils/types-and-links";
// import { Suspense } from 'react'

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[4000px]">
      <GeneralNavbar />

      <PathwayHero
        image="/hero-4.png"
        widthStyle="w-[75%]"
        desc="Dive into the exciting world of artificial intelligence. Gain expertise, innovate, and lead the way in AI technology with our specialized career pathway."
        header="Navigate the AI Career Pathway"
        bgColor="bg-black-500"
        buttonWhite
      />

      <WhyCodingPathway
        pathwayImage="/assets/pathway/ai-pathway.png"
        headerOne="Why Artifical Intelligence Pathway?"
        pOne="The AI Pathway on our WiFiCombat eLearn platform offers students a deep dive into the world of artificial 
        intelligence, empowering them to understand and create intelligent systems. By exploring machine learning, 
        data science, and natural language processing, students gain the skills to build AI models that can analyze 
        data, make decisions, and solve complex problems. "
        pTwo="This pathway encourages critical thinking, creativity, and problem-solving, preparing students for 
        careers in cutting-edge fields like automation, predictive analytics, and AI-driven technology. As AI 
        continues to shape the future, this pathway equips learners with the knowledge and tools to ead and 
        innovate in a rapidly evolving digital world."
      />

      <PathwayRoadmap
        title="Artifical Intelligence"
        steps={aiSteps}
        pathway="ai-pathway"
      />

      <Outcomes outcomes={aiComes} />

      <AIOnboarding />

      <TodayComp
        desc="Embark on a transformative journey into the world of artificial intelligence. Our program equips you with the skills and knowledge to develop intelligent systems and applications. Start your AI adventure today!"
        header="Start Learning Artifical Intelligence Today!"
        linkto="/schools/pricing-plan"
      />

      <Footer />
    </div>
  );
}
