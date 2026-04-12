import Image from "next/image";
import HeadingDesign from "../general/HeaderDesign"

type Props = {
    outcomes: outcome[];
}   

type outcome = {
    title: string,
    desc: string,
    bgImage?: string,
}

export const Outcomes = ({outcomes} : Props) => {
    return (
        <section>
            <HeadingDesign heading="learning outcomes" />
            <div className="mt-10 md:mt-16 mb-20 md:mb-28 w-[93%] md:w-[90%] lg:w-[88%] mx-auto 
            flex flex-col gap-10 lg:gap-16 xl:gap-24 md:flex-row md:items-center md:justify-between">

                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {outcomes.map((outcome, index) => (
                            <div 
                            key={index}
                            className="w-full max-md:text-center"
                            >
                            <div className="w-full flex">
                                <div 
                                className={`w-16 h-16 max-md:mx-auto ${outcome.bgImage ? "bg-black-50 " : "bg-black-200"}
                                flex items-center justify-center rounded-full bg-cover bg-center`}
                            >
                                {outcome.bgImage && 
                                <Image 
                                    src={outcome.bgImage}
                                    alt={outcome.title}
                                    width={64}
                                    height={64}
                                    className="w-8 object-cover aspect-auto"
                                />}
                            </div>
                                </div> 

                                <h3 className="mt-4  whitespace-nowrap mr-3 font-semibold text-[24px] md:text-2xl">{outcome.title}</h3>
                                <p className="mt-4">{outcome.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}