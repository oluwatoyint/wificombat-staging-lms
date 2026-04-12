import { FaqCard } from "../Home/faq-card"

type Props = {
    noSpace?: boolean;
}

const faq = [
    { title: "What career pathways are available on your platform?",
     content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },

    { title: "Is there a free trial available?",
    content: "Yes, we offer a free trial period for selected courses, allowing students to explore our platform before making a commitment.",
    },

    { title: "What age groups does your platform cater to?",
      content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },

    { title: "Who are these courses designed for?",
    content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },

    { title: "How can I determine which career pathway is right for me?",
    content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },

    { title: "Are the courses self-paced or instructor-led?",
    content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },
    { title: "What skills will I learn in the Coding pathway?",
      content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },
    { title: "What can I expect from the Multimedia Design pathway?",
        content: "Our platform is designed for kids and teens, typically ranging from 8 to 18 years old.",
    },
    { title: "What tools or software do students need?",
        content: "Basic requirements include a computer or tablet with internet access. Specific software requirements are provided for each course.",
    },
    { title: "How do you ensure a safe online learning environment?",
        content: " We prioritize online safety through secure logins, age-appropriate content, and monitored discussion forums. Parental controls and progress tracking are also available.",
    },
    { title: "Do you offer any certifications upon course completion?",
        content: "Yes, students receive certificates upon successfully completing our courses, providing tangible recognition of their skills.",
    },
]

export const FAQContent = ({noSpace}: Props) => {
    return (
        <div className="">
        <div className={`${noSpace ? "h-[2rem]" : "h-[17rem] md:h-[18rem]" }`}></div>

            <div>
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