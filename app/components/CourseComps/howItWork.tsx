"use client"
import HeadingDesign from "../general/HeaderDesign";


type Step = {
    stepNumber: number;
    title: string;
    description: string;
}

type Props = {
    title: string;
    steps: Step[];
}

const WorkItem = ({ number, title, description, isLast}:
      {number: number, title:string, description: string, isLast: boolean}) => {
        
        return (
            <div className="w-full flex flex-row gap-4">
            <div className="relative">
            {!isLast && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[5%] border-r-[5px] border-dashed h-full"></div>
                    </div>
                )}
                <div className="relative w-[4rem] h-[5rem] md:w-[6rem] md:h-[7rem] ">
                    <div className="h-24 w-24 flex items-center justify-center rounded-full bg-[#CEEDFD] border">
                        <div className="text-2xl font-bold">{number}</div>
                    </div>
                </div>
            </div>

            <div className="relative mb-6 w-full py-6 px-8">
                <div className="space-y-3">
                    <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
                    <h2 className="text-xl md:text-2xl">{description}</h2>
                </div>   
            </div>
        </div>
        )

      }



export const  HowItWork = ({title, steps}: Props ) =>{
    return (
      <section>
         <HeadingDesign heading={`${title}`}/>
         <div className="py-20 w-[93%] md:w-[90%] lg:w-[88%] text-black-500 mx-auto">
                <div className="w-full flex flex-col">
                    {steps.map((step, index) => (
                        <WorkItem key={index} 
                        number={step.stepNumber} 
                        title={step.title} 
                        description={step.description} 
                        isLast={index === steps.length - 1}
                      />
                    ))}
                </div>
            </div>
      </section>
    )
}