import { OnboardingCard } from "../Home/onboarding-card"

export const MultimediaOnboarding = () => {
    return (
        <section>
            <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto mb-20 space-y-9 md:space-y-32 lg:space-y-40">
                <OnboardingCard 
                checkmark
                title={"\"Let's Design Something Awesome!\""}
                listdesc={[
                    "Interactive multimedia exercises and tutorials",
                    "Gamified learning experiences",
                    "Project-based learning with real-world applications",
                    "Creative challenges with multimedia elements",]}
                reverse={true}
                image="/photographer.png"
                imageHeight={400}
                imageWidth={300}
                widthStyle="max-md:w-[200px] object-contain"
                />

                <OnboardingCard 
                subdesc="Multimedia design tools and resources that is used for the multimedia design pathway"
                checkmark
                title="Multimedia Tools & Resources"
                listdesc={[
                    "Blender",
                    "Photoshop",
                    "Adobe Premier",
                    "Wix",]}
                    image="/assets/pathway/multimedia-tools.png"
                    imageHeight={220}
                    imageWidth={310}
                    widthStyle="max-md:w-[200px] object-contain"
                />
            </div>
        </section>
    )
}