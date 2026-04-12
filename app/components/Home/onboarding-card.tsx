import Image from "next/image";
import Link from "next/link"
import { FaCircleCheck } from "react-icons/fa6";

type Props = {
    reverse?: boolean;
    title: string;
    desc?: string;
    listdesc?: string[];
    checkmark?:boolean;
    buttonText?: string;
    linkTo?: string;
    image?: string;
    imageWidth?: number;
    widthStyle?:string;
    imageHeight?: number;
    dontCenter?: boolean;
    subdesc?: string;
    pinkBg?: boolean;
}

export const OnboardingCard = ({buttonText, checkmark, dontCenter, title, desc, subdesc,listdesc, 
    reverse, linkTo, image, imageHeight, imageWidth, widthStyle, pinkBg}: Props) => {
    return (
        <div className={`w-full flex flex-col ${reverse? "md:flex-row-reverse" : "md:flex-row"} md:items-center md:justify-between gap-16`}>
            <div className="w-full md:basis-[50%]">
                <h3 className="text-2xl lg:text-3xl text-black-500 font-semibold">{title}</h3>
                {desc ? 
                <>
                    <p className="pt-4 text-black-600 font-semibold md:text-xl">{desc}</p>
                </> :
                <>
                    {listdesc && 
                    <>
                    {subdesc && <p className="pt-4 text-black-600 font-semibold md:text-xl">{subdesc}</p>}
                    <ul className={`pt-4 text-black-600 font-semibold md:text-xl space-y-[2px] 
                    ${checkmark ? "pt-7 space-y-2" : "list-disc"}`}>
                        {listdesc.map((item, index) => (
                            <div key={index} className={`${checkmark && "flex items-center gap-1 py-2"}`}>
                                 {checkmark && <FaCircleCheck size={25} className="text-yellow-500"/>}
                                <li key={index} className={`ml-4 ${ checkmark && "font-medium"}`}>{item}</li>
                            </div>
                        ))}
                    </ul>
                    </>}
                </>}

              {buttonText &&  
                <div className="mt-14">
                    <Link
                    href={linkTo ?? "/registration"}
                    className="rounded-lg bg-[#131314] px-8 py-5 font-medium text-white shadow-sm hover:bg-black/80 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                    {buttonText}
                    </Link>
               </div>}
            </div>

            <div className={`w-full md:basis-[50%] ${!reverse && "flex items-center justify-center"}`}>
                <div className={`w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center
                 ${pinkBg ? "bg-purple-50" : "bg-blue-500"} 
                 rounded-full max-md:mx-auto`}>
                    {image &&
                    <Image
                    src={image} 
                    alt="onboarding"
                    width={imageWidth}
                    height={imageHeight}
                    className={`${widthStyle} object-contain flex-shrink-0  
                    ${dontCenter && "relative left-[-1rem] md:left-[-2rem]"}`}
                    />}
                </div>
            </div>
        </div>
    )
}