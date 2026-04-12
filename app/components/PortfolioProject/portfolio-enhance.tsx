import Image from "next/image";
import HeadingDesign from "../general/HeaderDesign"

const outcomes = [
    {desc: "Technical expertise through documented projects and assignments", bgImage: "/mdi_laptop.png"},
    {desc: "Problem-solving and critical thinking skills demonstrated through reflective writing on projects and activities.", bgImage: "/mdi_head-dots-horizontal-outline.png"},
    {desc: "Real-world accomplishments such as certificates, awards, and competition wins.", bgImage: "/mdi_certificate-outline.png"},
    {desc: "Extracurricular involvement and leadership experiences, providing a well-rounded profile.", bgImage: "/mdi_creation-outline.png"},
];
;

export const PortfolioEnhance = () => {
    return (
        <section>
            <HeadingDesign heading="HOW PORTFOLIO ENHANCES CAREER READINESS" />
           <p className="text-center">The Portfolio Management feature helps students build a robust digital portfolio that not only tracks their academic journey but also serves as a valuable career development tool. By the time students complete a career pathway, they will have a portfolio that showcases their</p>
            <div className="mt-8 w-[93%] md:w-[90%] lg:w-[88%] mx-auto md:mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9">
                {outcomes.map((outcome, index) => (
                    <div 
                    key={index}
                    className="w-full text-center"
                    >
                        <div 
                            className="w-16 h-16 mx-auto bg-black-50 flex items-center justify-center
                            rounded-full bg-cover bg-center"
                        >
                            <Image 
                                src={outcome.bgImage}
                                alt="image"
                                width={64}
                                height={64}
                                className="w-8 object-cover aspect-auto"
                            />
                        </div>
                        <p className="mt-4">{outcome.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
