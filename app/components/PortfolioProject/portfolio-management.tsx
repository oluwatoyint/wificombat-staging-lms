import Image from "next/image"
export const PortfolioManagement = () => {
    return (
        <section className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
                <div className="mt-10 md:mt-16 mb-20 flex flex-col gap-10 lg:gap-16 xl:gap-24 md:flex-row md:items-center md:justify-between">
                <div className="w-full md:basis-[50%]">
                    <h3 className="md:w-[90%] font-semibold text-lg md:text-3xl">
                    WiFiCombat eLearn: Portfolio Management Feature

                    </h3>

                    <p className="mt-4 md:mt-6 md:w-[90%] lg:w-[85%] md:text-xl text-black-700 leading-8">
                    Our Portfolio Management feature on WiFiCombat eLearn is a transformative tool designed to help students actively track, document, and showcase their entire learning and career development journey. This feature empowers students to build a personal, digital portfolio that highlights their skills, achievements, and growth as they progress through the various career pathways on our platform.

                  </p>
                </div>
                <div className="w-full md:basis-[50%]">
                    <div className="w-full h-[300px] rounded-2xl">
                        <Image 
                          src={`/portpic.png`}
                          alt="teach-and-learn"
                          width={500}
                          height={500}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
