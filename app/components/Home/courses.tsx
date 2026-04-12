"use client";
import { Key, useEffect } from "react";
import {
  API_VERSION_ONE,
  CurriculumLevel,
  formatPrice,
} from "@/app/utils/types-and-links";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import Link from "next/link";
import HeadingDesign from "../general/HeaderDesign";
import Image from "next/image";
import { RiH3 } from "react-icons/ri";
import FreeCourseCard from "../StudentsComps/free-courses/free-card";
import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

interface FreeCourse {
  price: string;
  course_id: string;
  level: string;
  subject: string;
  note: string;
  image: string;
}

export const HomeCourses = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["get-all-courses"],
    queryFn: async () => {
      const res = await api.get("/courses/get_all/");
      return res.data;
    },
  });

  // Ensure the courses are rendered correctly within SwiperSlide without extra { }

  return (
    <section className="relative mt-16">
      <HeadingDesign heading="courses" />

      <div className="mt-9 md:mt-14 w-full bg-blue-200 py-14">
        <h3 className="w-[95%] md:w-[85%] lg:w-[75%] mx-auto text-center text-2xl md:text-3xl font-semibold">
          Explore Courses Enhance Your Skills: Explore Our Diverse Courses
        </h3>
        <p className="mt-5 w-[95%] md:w-[75%] lg:w-[65%] mx-auto text-center text-lg md:text-xl">
          From beginners to advanced learners, our courses cater to all levels.
          Explore our curriculum and take the next step in your tech career
          journey.
        </p>
        <Swiper
          navigation={{
            nextEl: ".courses-swiper-button-next",
            prevEl: ".courses-swiper-button-prev",
          }}
          pagination={{ clickable: true, el: ".modules-swiper-pagination" }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          loop={true}
          modules={[Navigation, Pagination]}
          className="mt-16 w-[93%] md:w-[90%] lg:w-[88%] 
          mx-auto flex items-center justify-center overflow-visible"
        >
          {courses &&
            courses?.data?.map((course: any) => (
              <SwiperSlide
                key={course?.id}
                className="pt-5 md:pt-12 pb-8 flex justify-center overflow-visible sm:flex-row"
              >
                <FreeCourseCard
                  key={course?.id}
                  freecourse={course?.title}
                  subject={course?.title}
                  curriculum={true}
                  image={course?.cover_image?.media}
                  level={course?.stage}
                  desc={course?.description} // Strip HTML tags
                  linkTo={`/course/${course?.id}`}
                  viewCourse={true}
                  price={course?.amount === "0.00" ? "Free" : course?.amount}
                />
              </SwiperSlide>
            ))}
        </Swiper>

        <div className="relative w-[93%] md:w-[90%] lg:w-[88%] mx-auto mt-5 md:mt-8 flex items-center justify-between">
          <div
            className="courses-swiper-button-prev bg-transparent w-9 h-9 md:w-14 md:h-14 
          rounded flex items-center  bg-blue-200 justify-center transition duration-500 ease-in-out
           max-m cursor-pointer"
          >
            <GrFormPrevious size={28} />
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className={`modules-swiper-pagination`}></div>
          </div>

          <div
            className="courses-swiper-button-next bg-blue-200 bg-transparent w-9 h-9 md:w-14 md:h-14 
          rounded flex items-center justify-center transition duration-500 ease-in-out
           max-m cursor-pointer"
          >
            <GrFormNext size={28} />
          </div>
        </div>
      </div>
    </section>
  );
};

{
  /* <Swiper
      // freeMode={true}
      // slidesPerGroup={1}
      // slidesPerView={"auto"}
      // centeredSlides={true}
      navigation={{
        nextEl: ".courses-swiper-button-next",
        prevEl: ".courses-swiper-button-prev",
      }}
      pagination={{ clickable: true, el: ".courses-swiper-pagination" }}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 20 },
        640: { slidesPerView: 2, spaceBetween: 10 },
        1000: { slidesPerView: 3, spaceBetween: 30 },
        1300: { slidesPerView:4, spaceBetween: 30,
          },
      }}
      loop={true}
      modules={[FreeMode, Navigation, Pagination]}
      onActiveIndexChange={(swiper) => setActiveSlide(swiper.realIndex)}
      className="mt-16 w-[93%] md:w-[90%] lg:w-[88%] mx-auto flex items-center justify-center overflow-visible"
    >
      {courses.length > 0 &&
        courses
          .filter((course) => course.level === selectedLevel)
          .map((course, index) => (
            <SwiperSlide key={course.id} className="pt-5 md:pt-12 pb-8 flex items-center justify-center overflow-visible sm:flex-row">
            
              <CareerCard
                key={index}
                curriculum={true}
                pathway={course.subject}
                subject={course.subject}
                image={`https://wificombatacademy.com/${course.image}`}
                level={course.level}
                desc="Our courses provide interactive lessons, expert guidance, and flexible learning options"
                linkTo={`/course/${course.course_id}`}
                item={{ ...course, id: course.course_id }}
                viewCourse={true}
              />
             
            </SwiperSlide>
          ))}
    </Swiper>

    <div className="relative w-[93%] md:w-[90%] lg:w-[88%] mx-auto mt-8 md:mt-12 flex items-center justify-between">
      <div className="courses-swiper-button-prev bg-blue-50 w-9 h-9 md:w-14 md:h-14 rounded flex items-center justify-center transition duration-500 ease-in-out hover:bg-blue-100 cursor-pointer">
        <GrFormPrevious size={28} />
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="courses-swiper-pagination"></div>
      </div>

      <div className="courses-swiper-button-next bg-blue-50 w-9 h-9 md:w-14 md:h-14 rounded flex items-center justify-center transition duration-500 ease-in-out hover:bg-blue-100 cursor-pointer">
        <GrFormNext size={28} />
      </div>
    </div> */
}
