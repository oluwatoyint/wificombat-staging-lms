"use client";

import api from "@/app/utils/auth-interceptor";
import axios from "axios";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { RiLoader4Fill } from "react-icons/ri";

interface schoolAdminProfilePayloadProp {
  first_name: string;
  last_name: string;
  country: string;
  state: string;
  zip_code: string;
  no_student_you_teach: string;
  street: string;
}

export default function Page() {
  const pathway = ["Coding", "Robotics", "Hard-ware Programming"];
  const [countries, setCountries] = useState<any>([]);
  const [states, setStates] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dropDown, setDropDown] = useState<String>("");
  const [country, setCountry] = useState<any>({});
  const [state, setState] = useState<String>("");
  const router = useRouter();
  //
  const [schoolAdminProfilePayload, setSchoolAdminPRofilePayload] =
    useState<schoolAdminProfilePayloadProp>({
      first_name: "",
      last_name: "",
      country: "",
      no_student_you_teach: "",
      state: "",
      zip_code: "",
      street: "",
    });

  const getCountries = async () => {
    const url = "https://api.countrystatecity.in/v1/countries";
    const res = await axios.get(url, {
      headers: {
        "X-CSCAPI-KEY":
          "VUJ1UU5aSmlLU2xiNEJxdUg0RnQ0akNZbXAyV2ZiVHlnN1F6dHA1dg==",
      },
    });
    setCountries(res.data);
    console.log(res.data);
  };

  const getStates = async (iso2: any) => {
    const url = `https://api.countrystatecity.in/v1/countries/${iso2}/states`;
    const res = await axios.get(url, {
      headers: {
        "X-CSCAPI-KEY":
          "VUJ1UU5aSmlLU2xiNEJxdUg0RnQ0akNZbXAyV2ZiVHlnN1F6dHA1dg==",
      },
    });
    setStates(res.data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  async function handleProfileCreate(e: any) {
    e.preventDefault();
    const {
      country,
      state,
      zip_code,
      first_name,
      last_name,
      no_student_you_teach,
    } = schoolAdminProfilePayload;
    if (
      !no_student_you_teach ||
      !first_name ||
      !last_name ||
      !country ||
      !state ||
      !zip_code
    )
      return toast.error("All fields are required");
    try {
      setIsLoading(true);
      const res = await api.put(
        `/dashboard/update-profile`,
        schoolAdminProfilePayload
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
        window.location.href = "/dashboard/admin";
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

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
                Create Profile
              </h2>
            </div>
          </div>

          <div className="mx-auto w-full">
            <div className="mt-16">
              <div>
                <form onSubmit={handleProfileCreate} className="space-y-2">
                  <div className="flex flex-wrap min-[576px]:flex-nowrap items-center gap-4">
                    <div className="w-full min-[576px]:w-1/2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        First Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="John"
                          className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-purple-600 sm:text-sm sm:leading-6`}
                          onChange={(e) =>
                            setSchoolAdminPRofilePayload({
                              ...schoolAdminProfilePayload,
                              first_name: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full min-[576px]:w-1/2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Last Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Smith"
                          className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-purple-600 sm:text-sm sm:leading-6`}
                          onChange={(e) =>
                            setSchoolAdminPRofilePayload({
                              ...schoolAdminProfilePayload,
                              last_name: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="schoolAdministrator.students"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Total Number of Student
                    </label>
                    <div className="mt-2">
                      <input
                        id="schoolAdministrator.students"
                        type="number"
                        placeholder="50"
                        className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-purple-600 sm:text-sm sm:leading-6`}
                        onChange={(e) =>
                          setSchoolAdminPRofilePayload({
                            ...schoolAdminProfilePayload,
                            no_student_you_teach: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-1/2">
                      <label
                        htmlFor="schoolAdministrator.country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="my-2 relative border border-gray-600 py-2 rounded-md flex items-center justify-between">
                        <input
                          value={country?.name as any}
                          type="text"
                          className="py-2 w-full pl-3"
                          placeholder="Select Country"
                        />
                        <IoIosArrowDown
                          className="text-black-500 relative right-4 cursor-pointer"
                          onClick={() => setDropDown("country")}
                        />

                        {dropDown === "country" && (
                          <div className="absolute top-[60px] w-full h-[250px] border z-10 bg-white rounded-md overflow-auto">
                            <ul className="list-none pl-0 h-[250px] overflow-auto">
                              {countries.length > 0 &&
                                countries.map((country: any) => (
                                  <li
                                    key={country.name}
                                    onClick={() => {
                                      setCountry(country);
                                      getStates(country.iso2);
                                      // setCountryStates(country.states);
                                      setSchoolAdminPRofilePayload({
                                        ...schoolAdminProfilePayload,
                                        country: country?.name,
                                      });
                                      setDropDown("");
                                    }}
                                    className="cursor-pointer hover:bg-gray-100 py-2 px-4 text-gray-700"
                                  >
                                    {country.name}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="w-1/2">
                      <label
                        htmlFor="schoolAdministrator.state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2 relative border border-gray-600 py-2 rounded-md flex items-center justify-between">
                        <input
                          value={state as any}
                          type="text"
                          className="py-2 w-full pl-3"
                          placeholder="Select State"
                        />
                        <IoIosArrowDown
                          className="text-black-500 relative right-4 cursor-pointer"
                          onClick={() => setDropDown("state")}
                        />
                        {dropDown === "state" && (
                          <div className="absolute top-[60px] h-[350px] w-full border z-10 bg-white rounded-md overflow-auto">
                            <ul className="list-none pl-0">
                              {states.length > 0 &&
                                states?.map((state: any) => (
                                  <li
                                    key={state.name}
                                    onClick={() => {
                                      setState(state.name);
                                      // setCountryStates(country.states);
                                      setSchoolAdminPRofilePayload({
                                        ...schoolAdminProfilePayload,
                                        state: state?.name,
                                      });
                                      setDropDown("");
                                    }}
                                    className="cursor-pointer hover:bg-gray-100 py-2 px-4 text-gray-700"
                                  >
                                    {state.name}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-1/2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Street
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Gateway Street"
                          className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-purple-600 sm:text-sm sm:leading-6`}
                          onChange={(e) =>
                            setSchoolAdminPRofilePayload({
                              ...schoolAdminProfilePayload,
                              street: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="w-1/2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Zip Code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="123456"
                          className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-purple-600 sm:text-sm sm:leading-6`}
                          onChange={(e) =>
                            setSchoolAdminPRofilePayload({
                              ...schoolAdminProfilePayload,
                              zip_code: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-10 lg:mt-14 flex items-center justify-between gap-8"
                    style={{ marginTop: "40px !important" }}
                  >
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center text-center rounded-md disabled:border-[#B1B1B4] bg-[#B1B1B4]
                            disabled:bg-[#B1B1B4] text-[#FFFFFF] border p-4 text-sm font-semibold leading-6 
                            shadow-sm hover:bg-[#000] focus-visible:outline disabled:text-[#B1B1B4]
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-1">
                          Registering
                          <RiLoader4Fill size={24} className="animate-spin" />
                        </div>
                      ) : (
                        "Create Profile"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
