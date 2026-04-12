import Image from "next/image"
import HeadingDesign from "../../general/HeaderDesign"

const courseslist =  [
    "Access to engaging and interactive lessons",
    "Teachers can track student progress",
    "Students can explore a variety of career pathways",
    "Learn from experienced educators",
    "Engage in interactive learning activities",
    "Access personalized support"
  ]

export const TeachAndLearnWithWifi = () => {
    return (
        <section>
            <HeadingDesign heading="teach and learn with wificombat"/>

            <div className="mt-16 mb-20 w-[93%] md:w-[90%] lg:w-[88%] mx-auto flex flex-col 
            lg:flex-row lg:items-center lg:justify-center gap-10 md:gap-14 xl:gap-32">
                <div className="flex flex-col items-center justify-center">

                    <div className="relative md:top-8 w-[8rem] h-[8rem] md:w-[15rem] md:h-[15rem]">
                        <div className="polygon w-full h-full">
                            <Image 
                            src={`/teach-and-learn-1.png`}
                            alt="skill"
                            width={414}
                            height={427}
                            className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex gap-7 items-center justify-center">
                        <div className="relative w-[8rem] h-[8rem] md:w-[15rem] md:h-[15rem]">
                            <div className="polygon w-full h-full">
                                <Image 
                                src={`/teach-and-learn-2.png`}
                                alt="skill"
                                width={414}
                                height={427}
                                className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="relative w-[8rem] h-[8rem] md:w-[15rem] md:h-[15rem]">
                            <div className="polygon w-full h-full">
                                <Image 
                                src={`/teach-and-learn-3.png`}
                                alt="skill"
                                width={414}
                                height={427}
                                className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="grid grid-cols-1 gap-5">
                    <h4 className="font-semibold mb-2 whitespace-nowrap text-black-500 text-2xl md:text-3xl">Collaborative Learning Experience</h4>
                    {courseslist.map((list, index) => (
                      <ul key={index} className="flex whitespace-nowrap gap-2 list-none">
                        <Image
                          width={24}
                          height={24}
                          src={`/star-1.svg`}
                          alt="star"
                          className="object-contain aspect-auto"
                        />
                        <li className="md:w-[80%] text-black-500 md:text-lg ml-4">{list}</li>
                      </ul>
                    ))}
                </div>
            </div>
        </section>
    )
}