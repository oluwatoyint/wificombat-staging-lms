"use client";

import { PathwayHero } from "../../components/CodingPathwayComps/hero";
import { Outcomes } from "../../components/CodingPathwayComps/outcomes";
import { PathwayRoadmap } from "../../components/CodingPathwayComps/pathway-roadmap";
import { TodayComp } from "../../components/CodingPathwayComps/today-comp";
import { WhyCodingPathway } from "../../components/CodingPathwayComps/why-coding";
import Footer from "../../components/general/Footer";
import GeneralNavbar from "../../components/general/GeneralNavbar";
import { techComes, techpreneurshipSteps } from "../../utils/types-and-links";
import { TechprenuershipOnboarding } from "../../components/OnboardingComps/techpreneurship-onboarding";
import Image from "next/image";
export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PathwayHero
        image="/hero-6.png"
        widthStyle="w-full object-contain"
        desc="Our Techpreneurship Pathway provides a comprehensive curriculum designed to equip you with the essential skills and knowledge needed to thrive in the dynamic world of technology. From identifying market trends to building sustainable business models,"
        header="Navigate the Techprenuership Career Pathway"
        bgColor="bg-yellow-500"
      />
      <WhyCodingPathway
        // images={["", "", ""]}
        pathwayImage="/assets/pathway/tech-pathway.png"
        headerOne="Why Techprenuership Pathway?"
        pOne="The Techpreneurship Pathway on our WiFiCombat eLearn platform equips students 
        with the skills and mindset needed to become innovators and entrepreneurs in the 
        tech industry. Through this pathway, students learn how to identify market opportunities, 
        develop tech-based solutions, and build sustainable business models. "
        pTwo="They also gain practical knowledge in areas such as product development, 
        digital marketing, and startup management. By combining technology with entrepreneurship, 
        this pathway empowers students to not only create new tech products but also to understand 
        the business strategies behind successful ventures. It fosters creativity, leadership, and 
        resilience, preparing students to launch their own tech startups and shape the future of innovation "
      />
      <PathwayRoadmap
        title="Techprenuership"
        steps={techpreneurshipSteps}
        pathway="techpreneurship-pathway"
      />
      <Image
        src="/ROADMAP3b.png"
        alt=""
        width={500}
        height={500}
        className="w-full"
      />
      <Outcomes outcomes={techComes} />
      <TechprenuershipOnboarding />
      <TodayComp
        desc="Develop practical skills and hands-on experience in tech entrepreneurship. Our program offers a blend of theoretical knowledge and practical projects to help you apply your learning to real-world challenges."
        header="Start Learning About Techprenuership Today!"
        linkto="/schools/pricing-plan"
      />
      <Footer />
    </div>
  );
}
