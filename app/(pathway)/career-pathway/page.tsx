"use client"

import { Catalog } from "@/app/components/CareerPathwayComps/catalog";
import { CareerPathwayHero } from "@/app/components/CareerPathwayComps/hero";
import { CareerPathwayCourses } from "@/app/components/CareerPathwayComps/pathway-courses";
import { WhyCareerPathway } from "@/app/components/CareerPathwayComps/why-career";
import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";


export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <CareerPathwayHero />
      <WhyCareerPathway />
      <CareerPathwayCourses />
      <Catalog />
      <Footer />
    </div>
  );
}
