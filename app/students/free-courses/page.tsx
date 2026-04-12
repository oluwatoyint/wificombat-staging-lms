import GeneralNavbar from "@/app/components/general/GeneralNavbar"
import { StudentsHero } from "@/app/components/StudentsComps/Overview/hero"
import Footer from "@/app/components/general/Footer"
import { FAQ } from "@/app/components/Home/faq"
import { BePart } from "@/app/components/StudentsComps/free-courses/be-part" 
import {FreeCourses} from "@/app/components/StudentsComps/free-courses/free-course"
export default function Page() {
  return (
    <>
     <div className="mx-auto relative container w-full max-w-[2000px]">
     <GeneralNavbar />
     <StudentsHero 
      text="free-course.png"
       headerOne="Start Learning With Free Career Courses"
       headerTwo="Kickstart your journey with our carefully curated selection of free courses. Whether you're exploring new interests or building fundamental skills, these courses provide the same quality education without the cost."
       bgColor="blue"
       btnColor={true}
       textColor={true}
       />
       {/* <CoursePage/> */}
      <FreeCourses/>
      <FAQ noSpace={true}/>
      <BePart/>
      <Footer />
     </div>
    </>
  )
}