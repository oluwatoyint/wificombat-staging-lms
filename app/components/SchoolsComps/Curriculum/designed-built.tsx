import Image from "next/image"
export const DesignedAndBuilt = () => {
    return (
        <section className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
            <div className="mt-20 md:mt-24">
            <h3 className="w-[90%] mx-auto text-center text-2xl md:text-4xl font-semibold">Designed & Built For Everyone </h3>
            <p className="mt-9 md:w-[80%] lg:w-[65%] mx-auto text-center md:text-xl">Our curriculum is grounded in real-world applications, preparing students for the challenges and opportunities of the 21st century.</p>
            </div>


            <div className="mt-10 md:mt-16 mb-20 flex flex-col gap-10 lg:gap-16 xl:gap-24 md:flex-row md:items-center md:justify-between">
                <div className="w-full md:basis-[50%]">
                    <div className="w-full h-[300px] rounded-2xl">
                        <Image 
                          src={`/teach-and-learn-1.png`}
                          alt="teach-and-learn"
                          width={500}
                          height={500}
                        />
                    </div>
                </div>

                <div className="w-full md:basis-[50%]">
                    <h3 className="md:w-[90%] font-semibold text-lg md:text-3xl">
                    Inclusive Learning for All
                    </h3>

                    <p className="mt-4 md:mt-6 md:w-[90%] lg:w-[85%] md:text-xl text-black-700 leading-8">
                    Our curriculum is designed to cater to the diverse needs and learning styles of all students. We believe in creating an inclusive and supportive learning environment where everyone feels valued and empowered. Our experienced teachers are committed to providing personalized instruction and accommodations to ensure that all students have the opportunity to succeed.
                    </p>
                </div>
            </div>
        </section>
    )
}