"use client"
import { useState } from "react";
import { motion } from "framer-motion"
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

type Props = {
    title: string;
    content?: string
}

export const FaqCard = ({title, content}: Props) => {
    const [seeMore, setSeeMore] = useState(false);
    return (
        <div className="w-full">
            <div className="w-full pb-5 px-5 flex flex-col gap-5">

                <div className="flex items-center justify-between gap-8">
                    <div className="text-black-500 font-semibold text-lg md:text-2xl">
                        {title}
                    </div>

                    <div onClick={() => setSeeMore(!seeMore)}
                    className="cursor-pointer p-3 bg-black-500 text-white flex items-center justify-center rounded-lg">
                    {seeMore ? 
                    <FiMinus size={24} /> : 
                    <GoPlus size={24} />
                    }
                    </div>
                </div>

                {seeMore && 
                (<motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                >
                <p className="text-black-500 md:text-lg">{content}</p>
                </motion.div>)}

            </div>

            <div className="w-full h-px bg-primary-gray"></div>
        </div>
    )
}