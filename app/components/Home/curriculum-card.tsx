import Image from "next/image";

type Props = {
    borderColor: string,
    bgColor: string;
    title: string;
    star: string;
    list: string[];
}

const listItems = [
    "Introduction to algorithm and LightBot",
    "Getting Started with programming on Pictoblox",
    "Introduction to MBlock",
    "Basic Programming Concepts",
    "Getting Started with Bitsbox",
    "Multimedia and Animations",
    "Events in JavaScript",
];

export const CurriculumCard = ({bgColor, borderColor, title, star, list}: Props) => {
    return (
        <div className={`w-full py-12 px-4 rounded-3xl border-t-4 ${borderColor} ${bgColor}`}>
            {/* <div className="w-full flex items-center justify-center">
                <div className="w-24 h-24 bg-primary-gray rounded-full"></div>
            </div> */}

                <h3 className="w-full mt-4 text-center font-semibold text-2xl">{title}</h3>

                <ul className="mt-5 space-y-3">
                    {list.map((item, index) => (
                        <div key={index} className="flex items-start justify-start gap-2 mx-auto">
                            <Image src={star} 
                            width={24} 
                            height={24} 
                            alt="star" 
                            className="object-contain flex-shrink-0"/>
                            <li className="text-black-500">{item}</li>
                        </div>
                    ))}
                </ul>
        </div>
    )
}