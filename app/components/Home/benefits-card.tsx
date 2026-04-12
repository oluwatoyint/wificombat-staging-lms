import Image from "next/image";

type Props = {
    borderColor: string;
    bgColor: string;
    title: string;
    desc: string;
    col?: boolean;
    noCircle?: boolean;
    image?: string;
}


export const BenefitCard = ({col, desc, borderColor, bgColor, title, noCircle, image}: Props) => {
    return (
        <div className={`w-full p-4 md:py-6 2xl:py-10 shadow-lg rounded-lg border-t-4 ${borderColor}`}>
            <div className={`flex gap-4 ${col && "flex-col items-center"}`}>
                {!noCircle && <div className={`w-16 h-16 flex-shrink-0 flex items-center justify-center ${bgColor} rounded-full`}>
                    {image!== undefined && 
                    <Image 
                        src={image}
                        alt={image}
                        width={32}
                        height={32}
                        className="w-7 object-contain"
                    />}
                    </div>
                }

                <div className={``}>
                <h3 className="text-lg md:text-[22px] text-black-500 font-semibold">{title}</h3>
                <p className="pt-4 text-black-700">{desc}</p>
                </div>
            </div>
        </div>
    )
}