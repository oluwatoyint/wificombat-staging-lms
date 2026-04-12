import Image from "next/image"
import HeadingDesignTwo from "../../general/HeaderDesignTwo"

const courseslist =  [
    "Personalized training sessions tailored to the specific needs of each school and educator.",
    "Comprehensive support materials such as video tutorials, user guides, and an online help center for quick assistance.",
    "Dedicated onboarding specialists to answer questions and provide hands-on help during the first few weeks of implementation.",
    "Regular check-ins and feedback loops to continuously improve teacher engagement and satisfaction with the platform."
   
  ]

export const OnboardingTeachers = () => {
    return (
        <section>
            <HeadingDesignTwo 
             heading="HOW WE ASSIST IN ONBOARDING TEACHERS"
             />
             <div>
                <p className="text-base font-normal leading-6 text-center">We are dedicated to ensuring that teachers have everything they need to succeed with WiFiCombat eLearn. Our onboarding process includes</p>
             </div>
            <div className="flex flex-col mt-16 mb-20 w-[93%] md:w-[90%] lg:w-[88%] mx-auto
            lg:flex-row lg:items-center lg:justify-center gap-10 md:gap-14 xl:gap-32">
                 <div className="grid grid-cols-1 gap-5">
                    {courseslist.map((list, index) => (
                      <ul key={index} className="flex gap-2 list-none">
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
                <div className="flex flex-col items-center justify-center">

                    <div className="relative md:top-8 w-[8rem] h-[8rem] md:w-[15rem] md:h-[15rem]">
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

                    <div className="flex gap-7 items-center justify-center">
                        <div className="relative w-[8rem] h-[8rem] md:w-[15rem] md:h-[15rem]">
                            <div className="polygon w-full h-full">
                              
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

            
            </div>
        </section>
    )
}