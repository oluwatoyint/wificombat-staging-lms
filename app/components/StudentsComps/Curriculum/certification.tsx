"use client";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Image from "next/image";
import Certificate from "../../base-components/Certificate";

const certificates = [
  {
    name: "Uchenna Mbah",
    course: "Web Development Foundation 1",
  },
  {
    name: "Tobiloba Macauly",
    course: "Foundation of Product Design UI UX",
  },
  {
    name: "Eniola Jacobs",
    course: "App Inventor Foundation",
  },
  {
    name: "Amarachi Okeke",
    course: "Mobile App Development Basics",
  },
];

export const CurriculumCertification = () => {
  return (
    <section>
      <div className="relative mt-12 md:mt-16 lg:mt-20">
        <div className="absolute inset-0">
          <div className="cert-swiper-button-prev absolute bottom-[30%] left-[0.2rem] lg:left-[0.7rem] xl:left-[1.5rem] cursor-pointer">
            <GrFormPrevious size={32} />
          </div>

          <div className="cert-swiper-button-next absolute bottom-[30%] right-[0.2rem] lg:right-[0.7rem] xl:right-[1.5rem] cursor-pointer">
            <GrFormNext size={32} />
          </div>
        </div>

        <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
          <h3 className="w-[90%] mx-auto text-center text-2xl md:text-4xl font-semibold">
            Certification
          </h3>
          <p className="mt-9 md:w-[80%] lg:w-[65%] mx-auto text-center">
            The WiFiCombat eLearn platform offers certificates upon course
            completion, providing students with official recognition of their
            newly acquired tech skills and achievements.
          </p>
        </div>

        <Swiper
          className="mt-16 md:mt-24 mb-20 w-[80%] md:w-[90%] lg:w-[88%] mx-auto"
          slidesPerGroup={1}
          slidesPerView={"auto"}
          centeredSlides={true}
          loop={true}
          modules={[Navigation]}
          navigation={{
            nextEl: ".cert-swiper-button-next",
            prevEl: ".cert-swiper-button-prev",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {certificates.map((certificate, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center gap-3">
                {/* <div className="w-full h-[230px] bg-primary-gray rounded-2xl"></div> */}
                {/* <Image 
                                src={`/certificate.png`}
                                alt="certification"
                                width={350}
                                height={247}
                                className={`w-full h-[230px] rounded-2xl`}
                                /> */}
                <Certificate
                  course_name={certificate?.course}
                  name={certificate?.name}
                />
                <p className="text-black-500 font-semibold text-lg md:text-xl">
                  {certificate?.course}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
