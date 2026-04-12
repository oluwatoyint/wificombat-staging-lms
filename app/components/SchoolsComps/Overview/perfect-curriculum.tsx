import { BenefitCard } from "../../Home/benefits-card"

export const PerfectCurriculumThatAligns = () => {
    return (
        <section className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
            <h2 className="mt-20 md:mt-28 w-[90%] mx-auto text-center font-semibold text-2xl md:text-3xl lg:text-4xl text-black-500"> 
            Perfect Curriculum That Aligns With
                <span
                className="gradient-text"
                > Learning Standards</span>
            </h2>

            <div className="mt-16 md:mt-20 lg:mt-24 mb-20 flex flex-col gap-9 md:flex-row md:items-center md:justify-between">

                <div className="w-full md:basis-[50%] text-black-700">
                    <h3 className="text-2xl md:text-4xl font-semibold">Lorem ipsum dolor sit amet consectetur. Cras aliquam at</h3>
                    <p className="mt-9 md:text-xl lg:w-[80%]">Lorem ipsum dolor sit amet consectetur. Cras aliquam at tincidunt fermentum quis ultricies leo. 
                        Accumsan tortor nunc facilisi posuere sapien in massa felis laoreet. Egestas accumsan in arcu 
                        integer ut quisque mollis et nec. Massa interdum </p>
                </div>

                <div className="w-full md:basis-[50%]">
                    <div className="grid grid-cols-1 gap-9">
                        <BenefitCard
                            borderColor="border-blue-500"
                            bgColor="bg-blue-500"
                            desc="Viverra est at vulputate sapien sit. Lorem at faucibus ut massa. Eu non porta ridiculus quam ultrices."
                            title="Mattis aliquet eget eu"
                            col={true}
                            noCircle={true}
                        />

                        <BenefitCard
                            borderColor="border-yellow-300"
                            bgColor="bg-yellow-300"
                            desc="Viverra est at vulputate sapien sit. Lorem at faucibus ut massa. Eu non porta ridiculus quam ultrices."
                            title="Mattis aliquet eget eu"
                            col={true}
                            noCircle={true}
                        />

                        <BenefitCard
                            borderColor="border-purple-200"
                            bgColor="bg-purple-200"
                            desc="Viverra est at vulputate sapien sit. Lorem at faucibus ut massa. Eu non porta ridiculus quam ultrices."
                            title="Mattis aliquet eget eu"
                            col={true}
                            noCircle={true}
                        />
                        </div>
                </div>
            </div>
        </section>
    )
}