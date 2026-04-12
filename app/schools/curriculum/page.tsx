import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { DesignedAndBuilt } from "@/app/components/SchoolsComps/Curriculum/designed-built";
import { ExplorePricingPlan } from "@/app/components/SchoolsComps/Curriculum/explore-pricing";
import { LearningOutcomes } from "@/app/components/StudentsComps/Curriculum/learning-outcomes";
import { CareerPathwayCurriculum } from "@/app/components/StudentsComps/Curriculum/pathway-curriculum";
import { StudentsHero } from "@/app/components/StudentsComps/Overview/hero";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <StudentsHero 
      text="school-curriculum.png"
       headerOne="Comprehensive Curriculum for Future Success"
       headerTwo="Our curriculum is designed to equip students with the knowledge and skills they need to thrive in the 21st century. Our experienced teachers are dedicated to providing a stimulating and engaging learning environment that fosters critical thinking, creativity, and problem-solving."
       bgColor="blue"
       btnColor={true}
       textColor={true}
       />
      <CareerPathwayCurriculum schoolCurriculum/>
      <LearningOutcomes/>
      <DesignedAndBuilt />
      <ExplorePricingPlan />
      <Footer />
    </div>
  );
}
