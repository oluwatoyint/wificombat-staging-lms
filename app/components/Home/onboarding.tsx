import { OnboardingCard } from "./onboarding-card"

export const Onboarding = () => {
    return (
        <div className="space-y-9 md:space-y-32 lg:space-y-40">
            <OnboardingCard
            linkTo="/assessment"
            buttonText="Take Assessment" 
            title="Take Our Assessment: Discover Your Path to Success"
            desc="Ready to unlock your potential? Take our assessment today and 
            uncover the perfect career pathway tailored just for you. Start your 
            journey towards a brighter future!"
            image="/coder.png"
            imageWidth={267}
            imageHeight={474}
            widthStyle="max-md:w-[60%]"
            />

            <OnboardingCard 
            buttonText="Learn More" 
            title="Techpreneurshup Pathway- Mastering Investment readiness"
            listdesc={[
                "By following the Techpreneurship Pathway focused on investment readiness, you'll gain the essential skills needed to attract and secure funding for your tech startup. ",
                "Learn how to create compelling business plans, deliver persuasive pitches, and understand financial basics. ",
                "Master the art of networking and building investor relationships to gain confidence from potential backers. ",
                "Turn your innovative ideas into a successful, well-funded tech venture and start shaping your future today."]}
            reverse={true}
            image="/hero-6.png"
            imageWidth={567}
            imageHeight={491}
            widthStyle="w-full h-full relative lg:left-[3.4rem]"
            />

            <OnboardingCard 
            buttonText="Learn More" 
            title="Discover the Future of Education with our Solar-Powered Tablets"
            listdesc={[
                "Empower students with sustainable learning solutions using solar-powered tablets in K-12 education.",
                "Revolutionize classrooms with eco-friendly technology that enhances engagement and learning outcomes.",
                "Join us in embracing innovation while preserving our planet's resources.",]}
            image="/tablet.png"
            imageWidth={374}
            imageHeight={297}
            widthStyle="max-md:w-[93%]"
            dontCenter
            />
        </div>
    )
}