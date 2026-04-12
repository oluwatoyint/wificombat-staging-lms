import Image from "next/image"
export const Prepare = () => {
    return (
        <section className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
                <div className="mt-10 md:mt-16 mb-20 flex flex-col gap-10 lg:gap-16 xl:gap-24 md:flex-row md:items-center md:justify-between">
                <div className="w-full md:basis-[50%]">
                    <div className="w-full h-[300px] rounded-2xl">
                        <Image 
                          src={`/teacher_2.png`}
                          alt="teach-and-learn"
                          width={500}
                          height={500}
                        />
                    </div>
                </div>

                <div className="w-full md:basis-[50%]">
                    <p className="md:w-[90%] font-semibold text-[30px] md:text-3xl">
                    Preparing For The Future
                    </p>

                    <p className="mt-4 md:mt-6 text-[20px]  leading-[30px] text-left md:w-[90%] lg:w-[85%] md:text-xl text-black-700">
                    Students who actively use the Portfolio Management feature are better prepared to transition into the next stages of their academic or professional careers. Whether they are applying to colleges, 
seeking internships, or entering the workforce, the portfolio serves as a professional tool that demonstrates their capabilities and readiness for future opportunities.

By providing students with the means to document, organize, and reflect on their achievements, the Portfolio Management feature on WiFiCombat eLearn sets them up for success in both academic and professional environments, giving them a competitive edge in today’s tech-driven world.
                    </p>
                </div>
            </div>
        </section>
    )
}