"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
  IoArrowDownCircleOutline,
  IoChevronBackOutline,
} from "react-icons/io5";
import Link from "next/link";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// import OtpModal from "../../utils/otp-modal";
import { useMain } from "@/app/context/MainContext";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "@/app/context/AuthContext";
import { API } from "@/app/utils/types-and-links";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "@/app/utils/auth-interceptor";
import api from "@/app/utils/auth-interceptor";
import { BiChevronDown } from "react-icons/bi";
import { setCookie } from "cookies-next";
import { classArray } from "@/app/utils/class-array";
import { ages } from "@/app/utils/ages";

interface studentProfilePayloadProp {
  first_name: string;
  last_name: string;
  age: number | null;
  _class: string;
}

export default function Page() {
  const router = useRouter();
  const { selectedRole } = useMain();
  const { setMail, setPass } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dropDown, setDropDown] = useState<String>();

  //
  const [studentProfileDetails, setStudentProfileDetails] =
    useState<studentProfilePayloadProp>({
      first_name: "",
      last_name: "",
      age: null,
      _class: "",
    });
  //
  async function handleProfileCreate(e: any) {
    e.preventDefault();
    const { age, first_name, last_name, _class } = studentProfileDetails;
    if (!age || !first_name || !last_name || !_class)
      return toast.error("All fields are required");
    try {
      setIsLoading(true);
      const res = await api.put(
        `/dashboard/update-profile`,
        studentProfileDetails
      );

      const data = res.data;
      if (data.success === true) {
        setCookie("email", res.data?.data?.email, {
          // httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
        });
        setCookie("first_name", res.data?.data?.first_name, {
          // httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
        });
        setCookie("last_name", res.data?.data?.last_name, {
          // httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
        });
        setCookie("_class", res.data?.data?._class, {
          // httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
        });
        setCookie("age", res.data?.data?.age, {
          // httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
        });
        toast.success(res.data?.message);
        window.location.href = "/dashboard/student";
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }
  //

  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <Toaster />
      <div className="flex min-h-full w-full h-screen bg-white">
        <div className="relative hidden w-0 flex-1 lg:max-w-[655px] lg:block rounded-tr-[100px]">
          <Image
            fill
            className="absolute inset-0 h-screen w-full object-cover rounded-tr-[100px]"
            src="/assets/auth/register.jpg"
            alt=""
          />

          <div className="absolute inset-0 bg-[#26002C80] opacity-90 rounded-tr-[100px]">
            <Image
              className="absolute top-10 left-10"
              src="/assets/auth/E-learn_logo_sidebar.png"
              width={54}
              height={54}
              alt=""
            />
          </div>
        </div>

        <div
          className="relative w-full flex flex-col lg:flex-none overflow-y-auto lg:basis-[50%] mx-auto 
                py-10 px-4 md:px-10 lg:pl-20"
        >
          <div
            onClick={() => router.back()}
            className="relative w-fit lg:absolute left-0 lg:top-7 max-lg:mb-3 py-4 px-5
                   border border-[#5F5F5F1A] cursor-pointer rounded-lg shadow-sm"
          >
            <IoChevronBackOutline className="font-bold" />
          </div>

          <div className="flex items-center gap-14 ">
            <div className="">
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create Student Profile
              </h2>
            </div>
          </div>

          <div className="mx-auto w-full">
            <div className="mt-16">
              <div>
                <form className="space-y-2" onSubmit={handleProfileCreate}>
                  <>
                    <div>
                      {/*  */}
                      <div className="flex items-center gap-4 flex-wrap min-[576px]:flex-nowrap">
                        <div className="relative w-full min-[576px]:w-1/2">
                          <label
                            htmlFor="administrator"
                            className="block text-sm mb-2 font-medium leading-6 text-gray-900"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            placeholder="Grace"
                            required
                            className="block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                                    placeholder:text-gray-700 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setStudentProfileDetails({
                                ...studentProfileDetails,
                                first_name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="relative w-full min-[576px]:w-1/2">
                          <label
                            htmlFor="administrator"
                            className="block text-sm mb-2 font-medium leading-6 text-gray-900"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            placeholder="Adeboye"
                            required
                            className="block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                                    placeholder:text-gray-700 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setStudentProfileDetails({
                                ...studentProfileDetails,
                                last_name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="w-full mb-[1.5rem] relative">
                        <label className="block text-sm mb-2 font-medium leading-6 text-gray-900">
                          Age
                        </label>
                        <div className="border flex items-center justify-between rounded-md focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                          <input
                            type="text"
                            id="schoolName"
                            placeholder="12"
                            required
                            className="outline-none w-full"
                            value={
                              (studentProfileDetails?.age !== null &&
                                studentProfileDetails?.age) ||
                              ""
                            }
                          />
                          <BiChevronDown
                            onClick={() =>
                              setDropDown(dropDown === "age" ? "" : "age")
                            }
                            className="cursor-pointer text-gray-500 text-[24px]"
                          />
                        </div>
                        {dropDown === "age" && (
                          <div className="absolute bg-white w-full mt-1 p-2 rounded-md shadow-md border z-[100]">
                            {ages?.map((age, index) => (
                              <div
                                key={index}
                                className="cursor-pointer hover:bg-gray-100 p-2"
                                onClick={() => {
                                  setStudentProfileDetails({
                                    ...studentProfileDetails,
                                    age: age,
                                  });
                                  setDropDown("");
                                }}
                              >
                                {age}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="w-full mb-[1.5rem] relative">
                        <label className="block text-sm mb-2 font-medium leading-6 text-gray-900">
                          Class
                        </label>
                        <div className="border flex items-center justify-between rounded-md focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                          <input
                            type="text"
                            id="schoolName"
                            placeholder="Year 2"
                            required
                            className="block outline-none w-full border-neutral-300 placeholder:text-gray-700"
                            value={studentProfileDetails?._class}
                          />
                          <BiChevronDown
                            onClick={() =>
                              setDropDown(dropDown === "class" ? "" : "class")
                            }
                            className="cursor-pointer text-gray-500 text-[24px]"
                          />
                        </div>
                        {dropDown === "class" && (
                          <div className="absolute bg-white w-full mt-1 p-2 rounded-md shadow-md border">
                            {classArray.map((clas, index) => (
                              <div
                                key={index}
                                className="cursor-pointer hover:bg-gray-100 p-2"
                                onClick={() => {
                                  setStudentProfileDetails({
                                    ...studentProfileDetails,
                                    _class: clas?.value,
                                  });
                                  setDropDown("");
                                }}
                              >
                                {clas?.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="py-3"></div>

                    <div className="mt-14">
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] 
                                    bg-[#131314] p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 
                                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                                    focus-visible:outline-purple-600"
                      >
                        {isLoading ? "Please wait..." : "Start Learning"}
                      </button>
                    </div>
                  </>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* {isModalOpen && */}
        {/* <OtpModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} /> */}
        {/* } */}
      </div>
    </div>
  );
}
