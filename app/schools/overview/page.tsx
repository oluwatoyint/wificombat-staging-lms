import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { FAQ } from "@/app/components/Home/faq";
import Impact from "@/app/components/Home/Impact";
import { SchoolCurriculum } from "@/app/components/Home/school-curriculum";
import { EmpowerLearningJourney } from "@/app/components/SchoolsComps/Overview/empower-journey";
import { JoinOtherSchools } from "@/app/components/SchoolsComps/Overview/other-schools";
import { TeachAndLearnWithWifi } from "@/app/components/SchoolsComps/Overview/teach-and-learn";
import { StudentsHero } from "@/app/components/StudentsComps/Overview/hero";

export default function Page() {
    return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <StudentsHero 
      headerOne="Empower Your Students With Career Pathway"
      headerTwo="Our platform provides schools with a comprehensive solution to guide students towards successful careers. Easily register your school and purchase career pathways tailored to your students' needs. Our user-friendly platform enables teachers to deliver engaging lessons and track student progress."
      text="school-overview.png"
      bgColor="blue"
      btnColor={true}
      textColor={true}
      />
      <TeachAndLearnWithWifi/>
      <EmpowerLearningJourney />
      <SchoolCurriculum dontShowOnboarding />
      {/* <PerfectCurriculumThatAligns/> */}
      <Impact />
      <FAQ noSpace/>
      <JoinOtherSchools />
      <Footer />
    </div>
  );
}