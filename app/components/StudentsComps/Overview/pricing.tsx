import { Breadcrumbs } from "@/app/utils/breadcrumb";
import HeadingDesign from "../../general/HeaderDesign";
import { PricingCard } from "./pricing-card";
import BreadcrumbsWrapper from "@/app/utils/breadcrumbsWrapper";

type Props = {
  pricingPage?: boolean;
};

export const pricingPlans = [
  { id: 1, pricing: "₦10,000", billing: "Monthly", color: "bg-[#E866FF66]" },
  { id: 2, pricing: "₦40,000", billing: "Quarterly", color: "bg-[#FFC53366]" },
  { id: 3, pricing: "₦100,000", billing: "Yearly", color: "bg-[#96969C66]" },
];

export const PricingPlan = ({ pricingPage }: Props) => {
  return (
    <BreadcrumbsWrapper>
    <section>
      {pricingPage ? <></> : <HeadingDesign heading="pricing plan" />}

      <div
        className={`w-full relative
        ${!pricingPage ? "mt-9 bg-blue-50" : ""} py-10 md:py-14 lg:py-20`}
      >
        {pricingPage && (
          <>
            <div className="md:w-[80%] mx-auto mb-9 xl:mb-16 text-black-500 relative">
            <Breadcrumbs homeLabel="Home" lightMode/>
            </div>
          <h2 className="mt-8 lg:mt-10 mb-6 text-center md:text-3xl text-2xl lg:text-5xl uppercase font-semibold md:font-medium">
            PRICING PLAN
          </h2>
          </>
        )}
        <p className="md:w-[80%] lg:w-[50%] mx-auto md:text-xl text-center font-semibold">
          Lorem ipsum dolor sit amet consectetur. Facilisis arcu adipiscing mi
          ullamcorper. A aliquet non pellentesque vulputate
        </p>

        <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto mt-9 md:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricingPlans.map((plans) => (
            <PricingCard
              defaultStyle
              key={plans.id}
              price={plans.pricing}
              billing={plans.billing}
              color={plans.color}
              linkTo="/registration"
            />
          ))}
        </div>
      </div>
    </section>
    </BreadcrumbsWrapper>
  );
};
