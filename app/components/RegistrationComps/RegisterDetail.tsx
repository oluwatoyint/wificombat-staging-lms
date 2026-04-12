"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import RegisterDesign from "./RegisterDesign";
import { useMain } from "@/app/context/MainContext";

const images = [
  {
    image: "/student-reg.png",
    hoverColor: "hover:shadow-green-600",
    role: "user",
    link: "/signup",
  },
  // {image:"/parent-reg.png", hoverColor: "hover:shadow-purple-300", role:"Parent"},
  {
    image: "/school-reg.png",
    hoverColor: "hover:shadow-blue-500",
    role: "school",
    link: "/school-registration",
  },
];

const RegisterDetails = () => {
  const router = useRouter();

  return (
    <section className="relative w-full h-screen bg-white flex items-center justify-center overflow-y-visible">
      <RegisterDesign />

      <div className="w-[90%] md:w-[85%] mx-auto">
        <div className="lg:relative">
          <IoChevronBackOutline
            size={24}
            onClick={() => router.back()}
            className="absolute left-3 lg:left-[-2rem] top-3 lg:top-[-0.5rem] max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-lg"
          />
          <h1 className="relative w-[90%] mx-auto font-semibold text-2xl md:text-3xl lg:text-4xl text-center">
            Choose an account type you want to register with
          </h1>
        </div>

        <div
          className="z-[2] relative md:w-[90%] lg:w-[80%] mx-auto mt-[4rem] md:mt-[7rem] flex max-lg:flex-wrap 
                items-center justify-center lg:justify-center gap-6 lg:gap-9"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-[40%] lg:w-[33%]"
              onClick={() => {
                localStorage.setItem("selectedRole", image?.role);
              }}
            >
              <Link href={image.link}>
                <Image
                  width={250}
                  height={250}
                  src={image.image}
                  alt="student"
                  className={`w-full object-contain rounded-xl cursor-pointer transition ease-in-out duration-300 
                                hover:scale-105 hover:shadow-lg ${image.hoverColor}`}
                />
                <div className="mt-4 text-center capitalize font-semibold text-lg md:text-xl">
                  {image.role}
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div
          className="relative inset-0 mt-[4rem] w-[90%] md:w-[70%] mx-auto flex items-center justify-center 
                    gap-2 font-semibold text-black-500 md:text-xl"
        >
          Already have an account?{" "}
          <Link href={`/login`} className="text-blue-500">
            Login..
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegisterDetails;
