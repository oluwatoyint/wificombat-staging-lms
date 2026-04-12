import { OnboardingCard } from "../Home/onboarding-card"

export const FeaturesOnboarding = () => {
    return (
        <div className="w-[93%] md:w-[80%] lg:w-[85%] mx-auto mt-20 mb-24 space-y-9 md:space-y-32 lg:space-y-40">
            <OnboardingCard
            pinkBg={true}
            title="Gamification Elements"
            desc="The WiFiCombat eLearn platform integrates gamification features like quizzes and flashcards to make learning more engaging for students. Quizzes are designed to challenge learners in real-time, encouraging them to test their knowledge and track their progress. Flashcards help reinforce key concepts, making it easier for students to retain information. By turning learning into an interactive experience, these tools foster a fun, competitive, and effective educational environment."
            image="/gamification-element.png"
            imageWidth={412}
            imageHeight={303}
            />

            <OnboardingCard
            pinkBg={true} 
            title="Portfolio Support Platform"
            desc="The WiFiCombat eLearn platform offers a comprehensive portfolio support system that allows students to track their entire learning journey. This feature enables users to store certificates, document completed projects, and monitor their participation in challenges, quizzes, and competitions. Additionally, the portfolio generates a personalized record of achievements, creating a detailed personal statement that reflects all the skills and experiences gained through the platform. This organized, easily accessible system helps students showcase their progress and accomplishments for future academic or professional opportunities."
            reverse={true}
            image="/portfolio-support.png"
            imageWidth={393}
            imageHeight={291}/>

            <OnboardingCard
            pinkBg={true}
            title="Diverse Cutting Edge Curriculum"
            desc="Our diverse curriculum offers a wide range of courses designed to equip students with the latest knowledge and skills in various fields. From cutting-edge technology to traditional disciplines, our program provides a well-rounded education that prepares students for success in today's competitive world."
            image="/diverse-edge-curriculum.png"
            imageWidth={446}
            imageHeight={328}
            />

            <OnboardingCard
            pinkBg={true} 
            title="Techprenuership Mentorship"
            desc="The WiFiCombat eLearn platform's Teen Techpreneurship Program is designed to nurture entrepreneurial skills in young tech enthusiasts, preparing them to become future leaders in the digital economy. This program equips teens with the knowledge and tools to develop innovative tech solutions, build startups, and create business models that address real-world challenges. Participants gain hands-on experience through workshops, mentorship, and collaborative projects, learning essential skills such as coding, product development, and business strategy. By the end of the program, students will have a solid foundation in both technology and entrepreneurship, empowering them to launch their own ventures."
            reverse={true}
            image="/teen-girl.png"
            imageWidth={192}
            imageHeight={460}
            widthStyle="max-md:h-[100%]"/>

        </div>
    )
}