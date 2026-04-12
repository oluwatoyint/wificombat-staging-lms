import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { CurriculumCertification } from "@/app/components/StudentsComps/Curriculum/certification";
import { LearningOutcomes } from "@/app/components/StudentsComps/Curriculum/learning-outcomes";
import { CareerPathwayCurriculum } from "@/app/components/StudentsComps/Curriculum/pathway-curriculum";
import { StudentsHero } from "@/app/components/StudentsComps/Overview/hero";
export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <StudentsHero
        text="student-curriculum.png"
        headerOne="Explore Our Tech Career Pathway Curriculum."
        headerTwo="Discover a curriculum designed to guide K-12 students through essential tech skills. 
      From coding to AI and robotics, we provide the tools and resources to prepare them for exciting tech careers."
        bgColor="purple"
        btnColor={true}
        textColor={true}
      />
      <CareerPathwayCurriculum />
      <LearningOutcomes />
      <CurriculumCertification />
      <Footer />
    </div>
  );
}
