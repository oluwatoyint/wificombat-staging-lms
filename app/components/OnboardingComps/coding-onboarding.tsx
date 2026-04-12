import { OnboardingCard } from "../Home/onboarding-card"

export const CodingOnboarding = () => {
    return (
        <section>
            <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto mb-20 space-y-9 md:space-y-32 lg:space-y-40">
                <OnboardingCard 
                checkmark
                title={"\"Let's Build Something Awesome!\""}
                listdesc={[
                    "Interactive coding exercises and tutorials ",
                    "Gamified learning experiences",
                    "Project-based learning with real-world applications",
                    "Creative challenges with coding elements"]}
                reverse={true}
                image="/assets/pathway/something-awesome.png"
                imageHeight={400}
                imageWidth={250}
                widthStyle="max-md:w-[200px] object-contain"
                />

                <OnboardingCard 
                checkmark
                title="Coding Tools & Resources"
                subdesc="Coding tools and resources that is used for the coding pathway"
                listdesc={[
                    "Mblock",
                    "Pictoblox",
                    "App Inventor",
                    "Bitsbox",]}
                    image="/assets/pathway/coding-tools.png"
                    imageHeight={220}
                    imageWidth={310}
                    widthStyle="max-md:w-[200px] object-contain"
                />
            </div>
        </section>
    )
}