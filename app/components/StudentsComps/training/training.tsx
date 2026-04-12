import Image from "next/image"
import HeadingDesign from "../../general/HeaderDesign"

const training =  [
    "The platform also encourages collaboration and creativity, giving teachers the flexibility to create custom lesson plans, share content with colleagues, and foster a more dynamic learning environment. By leveraging the latest in educational technology, teachers can enhance the learning experience and help students reach their full potential."
]
  

export const Training = () => {
    return (
        <section>
            <HeadingDesign heading="WIFICOMBAT E-LEARN FOR TEACHERS"/>

            <div className="mt-16 mb-20 w-[93%] md:w-[90%] lg:w-[88%] mx-auto flex flex-col 
            lg:flex-row lg:items-center lg:justify-center gap-10 md:gap-14 xl:gap-32">
                <div className="flex flex-col items-center justify-center">

                    <div className="relative md:top-8 w-[8rem] h-[8rem] md:w-[15rem] md:h-[15rem]">
                        <div className="polygon w-full h-full">
                            <Image 
                            src={`/teamzz.png`}
                            alt="skill"
                            width={414}
                            height={427}
                            className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex gap-7 items-center justify-center">
                    </div>
                    
                </div>

                <div className="grid grid-cols-1 gap-5">
                    <h4 className="font-semibold mb-2  text-black-500 text-2xl md:text-3xl">What Teachers Gain from Using WiFiCombat eLearn</h4>
                 
                      <div className="gap-2 list-none">
                      <p className="md:w-[80%] text-black-500 md:text-lg ml-4">By integrating WiFiCombat eLearn into their classrooms, teachers can revolutionize the way they engage with their students. The platform offers a vast library of interactive learning resources across various subjects, making lessons more engaging and personalized for every student. With real-time progress tracking and advanced data analytics, teachers can easily monitor student performance, identify learning gaps, and adjust their teaching strategies to meet the needs of 
each learner.
 </p>
                        <p className="md:w-[80%] text-black-500 md:text-lg ml-4">The platform also encourages collaboration and creativity, giving teachers the flexibility to create custom lesson plans, share content with colleagues, and foster a more dynamic learning environment. By leveraging the latest in educational technology, teachers can enhance the learning experience and help students reach their full potential.</p>
                      </div>
    
                </div>
            </div>
        </section>
    )
}