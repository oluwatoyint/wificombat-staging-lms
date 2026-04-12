import { OnboardingCard } from "../Home/onboarding-card"
import HeadingDesign from "../../components/general/HeaderDesign"

export const PortfolioBenefit = () => {
    return (
       <section className="-mt-14"> 
         <HeadingDesign heading="KEY BENEFITS OF PORTFOLIO MANAGEMENT FEATURE" />
        <div className="w-[93%] md:w-[80%] lg:w-[85%] mx-auto mt-20 mb-24 space-y-9 md:space-y-32 lg:space-y-40">
            <OnboardingCard
            pinkBg={true}
            title="Track Your Career Journey"
            desc="The Portfolio Management tool allows students to continuously track their progress across different career pathways. Whether they are learning to code, mastering multimedia, exploring robotics, or diving into entrepreneurship, students can monitor their development and ensure they are moving toward their career goals. This helps them take ownership of their learning and better understand how each activity or project contributes to their future career path."
            image="/portfolio-support.png"
            imageWidth={412}
            imageHeight={303}
            />

            <OnboardingCard
            pinkBg={true} 
            title="Upload Project and Document Learning"
            desc="Students can upload projects they have completed, including coding assignments, robotics builds, multimedia creations, and tech startup ideas. Each project can include detailed descriptions, images, videos, and even code samples, allowing students to showcase their technical skills and creativity. By documenting their work, students are able to build a rich portfolio that reflects their practical experience and problem-solving abilities."
            reverse={true}
            image="/uploadimgaesss.png"
            imageWidth={412}
            imageHeight={303}
            />

            <OnboardingCard
            pinkBg={true}
            title="Store Assessment Report and Certificates"
            desc="As students complete lessons and assessments on WiFiCombat eLearn, they will receive detailed reports on their performance. 
            These reports, along with any certifications they earn through completing specific pathways, can be uploaded to their portfolio. This provides a comprehensive view of their learning progress and accomplishments, making it easier to showcase their academic achievements and skills."
            image="/portfolio-support.png"
            // imageWidth={446}
            // imageHeight={328}
            imageWidth={412}
            imageHeight={303}
            />

            <OnboardingCard
            pinkBg={true} 
            title="Write About Projects, Competitions and Extracurricular Activities"
            desc="In addition to uploading projects and certificates, students can write reflective entries about their experiences. They can describe the projects they’ve worked on, the competitions they’ve participated in, and any extracurricular activities they’ve engaged in, such as hackathons, coding boot camps, or 
              innovation challenges. This encourages students to reflect on their learning journey and think critically about their growth, challenges, and successes."
            reverse={true}
            image="/uploadimgaesss.png"
            imageWidth={412}
            imageHeight={303}
            widthStyle="max-md:h-[100%]"/>            

<OnboardingCard
            pinkBg={true} 
            title="Showcase Achievements and Milestones"
            desc="The portfolio serves as a space for students to showcase their achievements. Whether it’s a coding project, a robotics competition, or an entrepreneurship challenge, students can highlight the milestones that have shaped their career trajectory. This makes it easier for them to communicate their skills and experiences to potential employers, educators, or mentors."
            reverse={false}
            image="/shotcase.png"
            imageWidth={412}
            imageHeight={303}
            widthStyle="max-md:h-[100%]"/>

            <OnboardingCard
            pinkBg={true} 
            title="Generate a Personal Statement"
            desc="Upon completing a career pathway, 
WiFiCombat eLearn’s Portfolio Management feature automatically generates a Personal Statement summarizing the student’s accomplishments. This statement includes a comprehensive overview of the student’s projects, certifications, competition results, and other milestones, creating a polished, professional document that students can use for college applications, internships, or job opportunities."
            reverse={true}
            image="/789shot.png"
            imageWidth={412}
            imageHeight={303}
            widthStyle="max-md:h-[100%]"/>

        </div>
        </section>
    )
}