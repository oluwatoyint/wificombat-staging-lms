import { OnboardingCard } from "../Home/onboarding-card"

export const AIOnboarding = () => {
    return (
        <section>
            <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto mb-20 space-y-9 md:space-y-32 lg:space-y-40">
                <OnboardingCard 
                checkmark
                title={"\"Let's Build Something Awesome!\""}
                listdesc={[
                    "Interactive AI exercises and tutorials",
                    "Gamified learning experiences",
                    "Project-based learning with real-world applications",
                    "Creative challenges with AI elements",]}
                reverse={true}
                image="/ml-coder.png"
                imageHeight={400}
                imageWidth={350}
                widthStyle="max-md:w-[250px] object-contain"
                />

                <OnboardingCard 
                subdesc="Artificial Intelligence tools and resources that is used for the artificial intelligence pathway"
                checkmark
                title="Artifical Intelligence Tools & Resources"
                listdesc={[
                    "AI Pictoblock",
                    "Python",
                    "Machine Language",]}
                    image="/assets/pathway/ai-tools.png"
                    imageHeight={220}
                    imageWidth={310}
                    widthStyle="max-md:w-[200px] object-contain"
                />
            </div>
        </section>
    )
}