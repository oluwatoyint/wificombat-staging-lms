import { OnboardingCard } from "../Home/onboarding-card"

export const GamingOnboarding = () => {
    return (
        <section>
            <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto mb-20 space-y-9 md:space-y-32 lg:space-y-40">
                <OnboardingCard 
                checkmark
                title={"\"Let's Create Something Awesome!\""}
                listdesc={[
                    "Interactive gaming exercises and tutorials",
                    "Gamified learning experiences",
                    "Project-based learning with real-world applications",
                    "Creative challenges with gaming elements",]}
                reverse={true}
                image="/assets/pathway/gaming-laptop.png"
                imageHeight={400}
                imageWidth={450}
                widthStyle="max-md:w-[250px] object-contain"
                />

                <OnboardingCard 
                checkmark
                title="Gaming Tools & Resources"
                subdesc="Gaming tools and resources that is used for the gaming pathway"
                listdesc={[
                    "Roblox",
                    "Gdevelop",
                    "Manu Game",
                    "Unity Engine",]}
                    image="/assets/pathway/gaming-tools.png"
                    imageHeight={220}
                    imageWidth={310}
                    widthStyle="max-md:w-[200px] object-contain"
                />
            </div>
        </section>
    )
}