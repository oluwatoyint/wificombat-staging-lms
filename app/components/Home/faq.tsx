import { FaqCard } from "./faq-card"

type Props = {
    noSpace?: boolean;
}

const faq = [
    { title: "What career pathways are available on your platform?",
     content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },

    { title: "Who are these courses designed for?",
    content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },

    { title: "How can I determine which career pathway is right for me?",
    content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },

    { title: "What skills will I learn in the Coding pathway?",
    content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },

    { title: "What does the Robotics pathway cover?",
    content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },

    { title: "What can I expect from the Multimedia Design pathway?",
    content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },
]

export const FAQ = ({noSpace}: Props) => {
    return (
        <div className="">
        <div className={`${noSpace ? "h-[2rem]" : "h-[17rem] md:h-[18rem]" }`}></div>

            <div>
                <h2 className="w-[90%] mx-auto font-semibold pt-4 text-2xl md:text-3xl lg:text-5xl text-center">Frequently Asked Questions</h2>
                <p className='mt-3 md:mt-5 w-[90%] md:w-[75%] lg:w-[65%] mx-auto md:text-xl text-center'>
                    Feel free to contact our support team if you have any additional questions or specific 
                    inquiries not covered in this FAQ. Happy learning!
                </p>

                <div className="md:w-[90%] mx-auto mt-14 space-y-8">
                   {faq.map((faq, index) => (
                     <FaqCard
                     key={index}
                     title={faq.title}
                     content={faq.content}
                     />
                   ))}
                </div>
            </div>

            <div className="h-[4rem]"></div>
        </div>
    )
}