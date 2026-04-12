import { OnboardingCard } from "../Home/onboarding-card"

export const TechprenuershipOnboarding = () => {
    return (
        <section>
            <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto mb-20 space-y-9 md:space-y-32 lg:space-y-40">
                <OnboardingCard 
                checkmark
                title={"\"Let's Learn Something Awesome!\""}
                listdesc={[
                    "Interactive Techprenuership exercises and tutorials",
                    "Gamified learning experiences",
                    "Project-based learning with real-world applications",
                    "Creative challenges with different elements.",]}
                reverse={true}
                image="/teen-girl.png"
                imageHeight={400}
                imageWidth={200}
                widthStyle="max-md:w-[150px] object-contain"
                />

                <OnboardingCard 
                subdesc="Techprenuership tools and resources that is used for the techprenuership pathway"
                checkmark
                title="Techprenuership Tools & Resources"
                listdesc={[
                    "Business & Market Research",
                    "Product Development & Technology",
                    "Pitch Deck Design",
                    "Teams",]}
                    image="/assets/pathway/techpreneurship-tools.png"
                    imageHeight={220}
                    imageWidth={310}
                    widthStyle="max-md:w-[200px] object-contain"
                />
            </div>
        </section>
    )
}