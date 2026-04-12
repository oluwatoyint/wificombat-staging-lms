"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/autoplay";
import { useState } from "react";
import { merriweather } from "@/app/fonts";

const testimonialData = [

  { name:"Temitayo Asani", 
    role: "Alumini studying  Mechatronics Engineering in the USA", 
    testimonial:'Her tech journey began at WiFiCombat Academy in 2015, where she honed her programming skills after teaching herself coding from the age of 12. At the academy, she developed her ability to build apps, which earned her the prestigious Oracle Student Recognition Award. Temitayo attended the Wificombat Career Wirkshop , were she and her team did an SDGs project and  co-founded the NGO "Never Your Fault," an organization dedicated to eradicating child marriage in Nigeria. This initiative gained significant international attention, with  media outlets such as CNN, BBC, the Malala Foundation, Cosmopolitan Her accomplishments continue at university, where she and her team successfully built a spacecraft, further showcasing her exceptional talents in the tech field. Temitayo credits WiFiCombat Academy as a key influence in shaping her path, providing her with the necessary skills and mentorship to excel in her tech career WiFiCombat Academy not only equips you with the skills to begin your tech journey, but it also connects you with mentors who guide you in fulfilling your tech career aspirations." ',
    image: "/WhatsApp_wifi.png",
  },
  { name:"Ayomide Tejuoso", 
    role: "Alumini of the Wificombat Academy First Class  student in Art & Design, from the Univesity of La Head Geneva  ", 
    testimonial:"Winner for Best Student Award ;Prix Tremplin Leenaards 2024 / HEAD pour les Arts visuels (trois prix différents seront décernés) Ayomide Tejuoso, a Nigerian artist and alumna of WiFiCombat Academy, has carved a name for herself in the contemporary art world. After attending edutech classes at the academy from the age of 11 to 17, she developed a strong foundation in digital tools like Photoshop and web design, which sparked her passion for creativity. By the age of 15, Ayomide began her artistic journey, working on digital art and photography projects in Lagos , Johannesburg.Italy, Amsterdam,UK and Geneva Over the past seven years, she has garnered significant recognition, winning prestigious awards such as Foam Talent 2021, PhotoVogue Festival 2021, and the VoiceHq Photo Vogue Festival NFT residency in 2022. Her work has also been featured in exhibitions at Rele Gallery, Affinity Gallery, and in publications like Homeschool and New Currency magazines. Ayomide and her team did the PhotoVogue Campaign 2023 Ayomide sees her art as a tool for revolution and community building. WiFiCombat Academy played a vital role in helping her find her artistic voice,",
    image: "/WhatsApp_wifi2.png",
    },
  { name:"Tobi Tejuoso", 
    role: "Alumini of the Wificombat", 
    testimonial:'Tobi Tejuoso a photographer and studying film production in the UK started his journey at a very young age at the age of 7 years at the Wificombat Academy. He used the platform to horn his skills especially in the multimedia design arm of theWificombat Academy.  The Academy placed him in top production  companies were he built his skills in film  production and had been part of several  NETFLIX FILMS He also built his photography skills and was offered internship in a top creative industry in the UK. He had the opportunity to shoot LIAM PAYNE ALBUM ,  NOCTA ( Nike  Campaigm) ,  OFFWHITE SKATE  EXHIBITION In his words "Wificombat Academy prepared me for the opportunities I have"',
    image: "/WhatsApp_wifi3.png",
    },
    { name:"Kudirat Abiola", 
      role: "Alumina of Wificombat and a Studebt at the London School Of Economics", 
      testimonial:"Launched the “Never Your Fault” Campaign Child Bride Marriage in Nigeria that had international publicity from CNN, BBC, Malala Foundation 400,000 Petition Pass the Bill  to raise the age  of marriage in Nigera Scholarship to ALA and LSE She attended a transformative career workshop hosted by the academy, which provided her with valuable skills in research, public speaking, and personal branding.",
      image: "/WhatsApp_wifi4.png",
      },
    { name:"Wonderful Adeneken", 
      role: "Alumina of Wificombat Academy Frontend Engineer and Javascript Engineer", 
      testimonial:"Wonderful attended the Wificombat Academy when he was just 13 years from 2015 - 2017 were he was introduced to Coding. He won the best student at the academy were He was  offered   an internship with a top  tech company in Lagos. He has horned his skills over the years and was a facilitator at the academy. Wonderful is a top software engineer and has worked with multi national firms across the world.",
      image: "/WhatsApp_wifi5.png",
    },
    { name:"Mariam Hamzat", 
        role: "Mobile App Developer", 
        testimonial:"Mariam Hamzat is a graduate at the Federal University of Technology, Akure. She studied software development with a focus on mobile development using the Flutter framework. Her journey into tech began six years ago when she attended a four-week boot camp sponsored by WiFiCombat Academy. Currently, Mariam works as a mobile developer and serves as the community manager at her school, holding the role of GDSC Lead. She also worked as a Program Manager at the Wificombat Academy building the Wificombat Elearning platform.",
        image: "/WhatsApp_wifi6.png",
    },

];
export const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  return (
    <div className="w-full py-7 pb-40 bg-black-500">
      <div className="w-[93%] md:w-[88%] mx-auto mt-3 flex flex-row items-center justify-center gap-2 md:gap-4">
        <div className={`${merriweather.className} text-white font-semibold text-lg md:text-2xl`}>
          TESTIMONIALS FROM OUR USERS
        </div>
      </div>

      <div className="mt-14 w-full px-4">
        <div className="mx-auto text-center text-white">
          <Swiper
            autoplay={{ delay: 10000 }}
            modules={[Autoplay]}
            spaceBetween={20} // Reduced the default space between slides
            slidesPerView={1.1}
            breakpoints={{
    320: { slidesPerView: 1, spaceBetween: 10 }, // Reduced space for mobile devices
    640: { slidesPerView: 1.5, spaceBetween: 15 }, // Reduced space for medium devices
    1000: { slidesPerView: 1.1, spaceBetween: 20 }, // Reduced space for larger devices
    1440: {
      slidesPerView: 2,
      spaceBetween: 30, // Smaller space for larger screens
    },
            }}
            onActiveIndexChange={(swiper) => setActiveSlide(swiper.realIndex)}
            className="!px-4"
          >
            {testimonialData.map((testimonial, index) => (
              <SwiperSlide key={index}>
                
                <div className="flex flex-col w-[1343px] h-[524px] md:flex-row rounded-xl overflow-hidden sm:flex sm:flex-col">
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name}'s testimonial`}
                      width={294}
                      height={524}
                      className="object-cover"
                    />
                  <div className="flex flex-col w-full md:w-3/5 p-8 bg-white text-black rounded-r-lg text-left">
                    <h2 className="font-semibold text-xl md:text-2x">{testimonial.name}</h2>
                    <h4 className="font-medium text-base md:text-lg text-black-600 mt-2">{testimonial.role}</h4>
                    <div className="mt-6 flex items-start">
                      <FaQuoteLeft size={40} className="flex-shrink-0 max-md:mx-auto" />
                      <p className="mt-4 ml-3 text-base font-normal leading-6 text-left decoration-skip-ink-none text-black-500">
                        {testimonial.testimonial}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};



// {module.id}

