"use client";
import HeadingDesign from "../../general/HeaderDesign";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";


export const CoursePage = () => {
   

    return (
        <>
         <HeadingDesign heading="FREE COURSES"/>
         <div>
            <div className="mt-10">
                <p className="w-[90%] mx-auto text-center text-2xl md:text-4xl font-medium">Explore Our Collection of Free Courses</p>
                <p className="mt-9 md:w-[80%] lg:w-[65%] mx-auto text-center md:text-xl">Access professional-grade courses that help you build essential skills at your own pace. Each course is designed to give you a solid foundation in your chosen field, completely free of charge.</p>
            </div>
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
               className="mt-16  w-[93%] md:w-[90%] lg:w-[88%] 
               mx-auto flex items-center justify-center overflow-visible"
            >
               <SwiperSlide

                className="pt-5 md:pt-12 pb-8 relative flex 
                items-center justify-center overflow-visible">


                
                </SwiperSlide>

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
         </div>
        </>
    )
}