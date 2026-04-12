"use client";
import { useEffect, useState } from "react";
import { API_VERSION_ONE, CurriculumLevel } from "@/app/utils/types-and-links";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import HeadingDesign from "../../general/HeaderDesign";
import axiosInstance from "@/app/utils/auth-interceptor";
import FreeCourseCard from "./free-card";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Link from "next/link";

// Define a type for the course structure
interface FreeCourse {
  price: string;
  course_id: string;
  level: string;
  subject: string;
  note: string;
  image: string;
  
}

export const FreeCourses = () => {
//   const [activeSlide, setActiveSlide] = useState(0);
  const [courses, setCourses] = useState<FreeCourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<CurriculumLevel>("Intermediate");

  useEffect(() => {
    const fetchFreeCourses = async () => {
      setCoursesLoading(true);
      try {
        const response = await axiosInstance.get<FreeCourse[]>(`${API_VERSION_ONE}/freecourses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching free courses:", error);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchFreeCourses();
  }, []);
 
  return (
    <section className="relative mt-16">
      <HeadingDesign heading="free courses" />
      <h3 className="w-[90%] mx-auto mt-14 text-center text-2xl md:text-4xl font-semibold">Explore Our Collection of Free Courses</h3>
             <p className="mt-9 md:w-[80%] lg:w-[65%] mx-auto text-center md:text-xl">
             Access professional-grade courses that help you build essential skills at your own pace. Each course is designed to give you a solid foundation in your chosen field, completely free of charge.
             </p>          
      <div>
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
          {/* {courses.length > 0 &&
            courses
              .filter((course) => course.level === selectedLevel)
              .map((course, index) => (
                <SwiperSlide 
                  key={course.course_id} 
                  className="pt-5 md:pt-12 pb-8 flex items-center justify-center overflow-visible sm:flex-row"
                > */}
                {courses && courses.map((course) => (
                     <SwiperSlide 
                       key={course.course_id} 
                       className="pt-5 md:pt-12 pb-8 flex items-center justify-center overflow-visible sm:flex-row"
                                >
                  <FreeCourseCard
                    key={course.course_id}
                    freecourse={course.subject}
                    subject={course.subject}
                    curriculum={true}
                    image={`https://wificombatacademy.com${course.image}`}
                    level={course.level}
                    // desc={course.note.replace(/<\/?[^>]+(>|$)/g, "")} // Strip HTML tags
                    desc=""
                    linkTo={`/course/${course.course_id}`}
                    viewCourse={true}
                    price={course.price === "0.00" ? "Free" : course.price}
            
                  />
                </SwiperSlide>
              ))}
        </Swiper>
         <div className="relative w-[93%] md:w-[90%] lg:w-[88%] mx-auto mt-8 md:mt-12 flex items-center justify-between">
                    <div className="courses-swiper-button-prev bg-transparent w-9 h-9 md:w-14 md:h-14 
                    rounded flex items-center justify-center transition duration-500 ease-in-out
                     max-m cursor-pointer">
                        <GrFormPrevious size={28} />
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <div className={`modules-swiper-pagination`}></div>
                    </div>

                    <div className="courses-swiper-button-next bg-transparent w-9 h-9 md:w-14 md:h-14 
                    rounded flex items-center justify-center transition duration-500 ease-in-out
                     max-m cursor-pointer">
                        <GrFormNext size={28} />
                    </div>
                </div>


        
      </div>
    </section>
  );
};

export default FreeCourses;
