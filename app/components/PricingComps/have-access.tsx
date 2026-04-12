import HeadingDesign from "../general/HeaderDesign";
import { OnboardingCard } from "../Home/onboarding-card";

export const HaveAccessTo = () => {
  return (
    <section>
      <HeadingDesign heading="have access to" />

      <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto mt-8 md:mt-12 mb-20 space-y-9 md:space-y-32 lg:space-y-40">
        <OnboardingCard
          reverse={true}
          title="Lorem ipsum dolor sit amet consectetur. Duis libero fermentum ."
          listdesc={[
            "Lorem ipsum dolor sit amet consectetur. Etiam in ut rhoncus cursus amet dolor arcu faucibus arcu. Viverra",
            "risus arcu quis ut sagittis. Urna in dictum facilisis libero egestas tortor sit odio. Id non eu faucibus proin hendrerit ut eget. Adipiscing neque pharetra sapien pharetra vitae",
            "Dapibus elit ut mattis varius faucibus et dictumst. Eget vel blandit volutpat donec.",
          ]}
        />

        <OnboardingCard
          title="Lorem ipsum dolor sit amet consectetur. Duis libero fermentum ."
          listdesc={[
            "Lorem ipsum dolor sit amet consectetur. Etiam in ut rhoncus cursus amet dolor arcu faucibus arcu. Viverra",
            "risus arcu quis ut sagittis. Urna in dictum facilisis libero egestas tortor sit odio. Id non eu faucibus proin hendrerit ut eget. Adipiscing neque pharetra sapien pharetra vitae",
            "Dapibus elit ut mattis varius faucibus et dictumst. Eget vel blandit volutpat donec.",
          ]}
        />
      </div>
    </section>
  );
};
