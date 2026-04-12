import GeneralNavbar from "./components/general/GeneralNavbar";
import Footer from "./components/general/Footer";
import { Benefits } from "./components/Home/benefits";
import { CareerPath } from "./components/Home/career-path";
import { CareerPathway } from "./components/Home/career-way";
import { CareerRoadmap } from "./components/Home/career-roadmap";
import { HomeCourses } from "./components/Home/courses";
import { Community } from "./components/Home/elearn-community";
import { FAQ } from "./components/Home/faq";
import { Hero } from "./components/Home/hero";
import Impact from "./components/Home/Impact";
import { SchoolCurriculum } from "./components/Home/school-curriculum";
import { Testimonials } from "./components/Home/testimonials";
import {Partner} from "./components/Home/partner"

export default function Home() {
  return (
    <div className="mx-auto relative container w-full max-w-[4000px]">
      <GeneralNavbar />
      <Hero />
      <CareerPathway />
      <CareerPath />
      <CareerRoadmap />
      <Benefits />
      <SchoolCurriculum />
      <HomeCourses />
      <Impact />
      <Testimonials />
      <Community />
      <FAQ />
      <Partner/>
      <Footer />
    </div>
  );
}