"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { merriweather } from "@/app/fonts";
import Image from "next/image";
import Cart from "@/app/utils/cart";
import { WalletIcon } from "@/app/icons";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { HeroBtns } from "./_hero-hydrated-compoonents/HeroBtns";

const slides = [
  {
    heading1: "Discover Your Coding Career Pathway",
    heading2: `Turn your passion for technology into a thriving career in software engineering or DevOps. Begin your path with us`,
    bgColor: "bg-blue-500",
    buttonBlack: true,
    img: "/hero-1.png",
    width: "w-full",
  },

  {
    heading1: "Shape Your Gaming Career Pathway",
    heading2: `Ready to turn your passion for gaming into a career? Dive into the world of game development and start your game career pathway`,
    bgColor: "bg-blue-300",
    buttonBlack: true,
    img: "/hero-2.png",
    width: "w-full",
  },

  {
    heading1: "Explore the Multimedia Pathway",
    heading2: `Your Journey in Multimedia Starts Here! Join our program to become a skilled Animator, Illustrator, and 2D & 3D Designer. Shape your creative future with us.`,
    bgColor: "bg-purple-500",
    buttonBlack: true,
    img: "/hero-3.png",
    width: "w-[85%] min-[785px]:w-[70%]",
  },

  {
    heading1: "Navigate the AI Career Pathway",
    heading2: `Dive into the exciting world of artificial intelligence. Gain expertise, innovate, and lead the way in AI technology with our specialized career pathway.`,
    bgColor: "bg-black-500",
    buttonBlack: false,
    img: "/hero-4.png",
    width: "w-[80%]",
  },

  {
    heading1: "Dive into the Robotics and IoT Career Pathway",
    heading2: `Step into the world of Robotics and IoT with our exclusive career pathway program. Design and implement groundbreaking technologies`,
    bgColor: "bg-blue-500",
    buttonBlack: true,
    img: "/hero-5.png",
    width: "w-[90%]",
  },

  {
    heading1: "Navigate the  Techprenuership Career Pathway",
    heading2: `Our Techpreneurship Pathway provides a comprehensive curriculum designed to equip you with the essential skills and knowledge needed to thrive in the dynamic world of technology. From identifying market trends to building sustainable business models,`,
    bgColor: "bg-yellow-500",
    buttonBlack: true,
    img: "/hero-6.png",
    width: "w-[90%]",
  },
];

export const Hero = () => {
  //
  return (
    <section id="home" className="text-white">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        className="relative text-white w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div
              className={`relative isolate overflow-x-hidden pb-[2rem] md:pb-[7rem] 
                        md:py-[7rem] lg:py-[10rem] 
                             max-md:min-h-[830px] ${slide.bgColor}`}
            >
              <div className="flex items-center gap-3 z-[15] absolute top-4 lg:top-7 right-5 lg:right-20">
                <Cart />
                <Link href="/wallet">
                  <WalletIcon />
                </Link>
              </div>

              <div
                className="relative max-md:mt-[2rem] w-[93%] md:w-[90%] lg:w-[80%] mx-auto h-auto md:h-[16rem] 
                                xl:h-[20rem] 2xl:h-[24rem] flex flex-col md:flex-row md:items-center gap-10"
              >
                <div className="w-full md:basis-[50%]">
                  <h1
                    className={`${merriweather.className} 
                                    max-sm:text-3xl text-4xl lg:text-5xl 2xl:text-6xl 
                                    max-md:leading-[45px] lg:leading-[67.2px] 2xl:leading-[78px] font-bold max-lg:mt-8`}
                  >
                    {slide.heading1}
                  </h1>

                  <p className="mt-5 font-semibold text-lg md:text-xl lg:w-[85%]">
                    {slide.heading2}
                  </p>

                  <HeroBtns slide={slide} />
                </div>

                <div
                  className="w-full md:basis-[50%] max-md:h-[350px]
                                 max-md:flex max-md:items-center max-md:justify-center
                                 min-[585px]:mt-8 min-[585px]:mb-5 lg:mt-0 lg:mb-0 "
                >
                  {slide.img !== "" && (
                    <Image
                      src={slide.img ?? ""}
                      alt={slide.img ?? ""}
                      width={500}
                      height={500}
                      className={`${slide.width} 
                                    min-[585px]:w-[80%] min-[785px]:w-[70%]
                                    lg:w-full lg:h-[570px] object-contain border-none`}
                    />
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
