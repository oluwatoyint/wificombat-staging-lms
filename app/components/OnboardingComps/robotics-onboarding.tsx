import { OnboardingCard } from "../Home/onboarding-card"

export const RoboticsOnboarding = () => {
    return (
        <section>
            <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto mb-20 space-y-9 md:space-y-32 lg:space-y-40">
                <OnboardingCard 
                checkmark
                title={"\"Let's Build Something Awesome!\""}
                listdesc={[
                   "Interactive robotics and IOT exercises and tutorials",
                   "Gamified learning experiences",
                    "Project-based learning with real-world applications",
                    "Creative challenges with robotics and IOT elements",]}
                reverse={true}
                image="/hero-5.png"
                imageHeight={400}
                imageWidth={450}
                widthStyle="max-md:w-[250px] object-contain"
                />

                <OnboardingCard 
                subdesc="Robotics and IOT tools and resources that is used for the robotics and IOT pathway"
                checkmark
                title="Robotics Tools & Resources"
                listdesc={[
                    "Sensors",
                    "Arduino",
                    "Raspberry Pi",
                    "Tinkercard circuits",]}
                    image="/assets/pathway/iot-tools.png"
                    imageHeight={220}
                    imageWidth={380}
                    widthStyle="relative max-md:w-[320px] lg:right-[5%] object-contain"
                />
            </div>
        </section>
    )
}