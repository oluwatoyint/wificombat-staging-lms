import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { BenefitOfTeachers } from "@/app/components/SchoolsComps/Overview/benefit-teachers";
import { Training } from "@/app/components/StudentsComps/training/training";
import { StudentsHero } from "@/app/components/StudentsComps/Overview/hero";
import { OnboardingTeachers } from "@/app/components/StudentsComps/training/onboarding-teachers";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <StudentsHero 
      text="school-training.png"
      headerOne="WiFiCombat eLearn: Empowering Teachers to Transform Education"
      headerTwo="At WiFiCombat eLearn, we believe that teachers are at the heart of the learning experience. Our platform is designed not 
       only to enrich students but also to provide teachers with powerful tools, resources, and support to enhance their teaching journey."
      bgColor="blue"
      btnColor={true}
      textColor={true}
      /> 
      
      <Training/>
      <BenefitOfTeachers/>
      <OnboardingTeachers/>
      <Footer />
    </div>
  );
}