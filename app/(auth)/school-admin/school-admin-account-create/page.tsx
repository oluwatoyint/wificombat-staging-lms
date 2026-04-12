"use client";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { API } from "@/app/utils/types-and-links";
import toast, { Toaster } from "react-hot-toast";
import api from "@/app/utils/auth-interceptor";
import Image from "next/image";
import { IoChevronBackOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import OtpModal from "@/app/utils/otp-modal";
import { IoIosArrowDown } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface adminPayloadProp {
  name: string;
  email: string;
  password: string;
  role: string;
  school_type: string;
  school_phone: string;
  school_website: string;
}

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  //
  const [dropDown, setDropDown] = useState<string>();
  //
  const [adminDetails, setAdminDetails] = useState<adminPayloadProp>({
    role: "school_admin",
    email: "",
    password: "",
    name: "",
    school_type: "",
    school_phone: "",
    school_website: "",
  });
  const [allSchools, setAllSchools] = useState<any[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<any>();
  //
  const getAllSchools = async () => {
    try {
      const res = await api.get("/retrieve-schools");
      const data = res?.data?.data;
      setAllSchools(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  useLayoutEffect(() => {
    getAllSchools();
  }, []);
  //
  // this function sends the teacher details to the db for otp request
  const submitAdminDetails = async (e: any) => {
    e.preventDefault();
    if (
      !adminDetails?.email ||
      !adminDetails?.password ||
      !adminDetails?.school_type ||
      !adminDetails?.name
    ) {
      toast.error("Please fill in all details");
      return;
    }
    try {
      setIsLoading(true);
      const res = await api.post("/register", adminDetails);
      if (!res.data?.success) {
        toast.error(res.data?.message);
        return;
      }
      if (res.data?.success) {
        toast.success(res.data?.message);
        setModalOpen(true);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
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
                Create Account
              </h2>
            </div>
          </div>

          <div className="mx-auto w-full">
            <div className="mt-16">
              <div>
                <form className="space-y-2" onSubmit={submitAdminDetails}>
                  <>
                    <div className="w-full mb-[1.5rem] relative">
                      <label
                        htmlFor="schoolName"
                        className="block text-sm mb-2 font-medium leading-6 text-gray-900"
                      >
                        School Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="schoolName"
                          placeholder="Christland"
                          value={selectedSchool}
                          required
                          className={`block outline-none w-full rounded-md border 
                                        border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                                        placeholder:text-gray-700 sm:text-sm sm:leading-6`}
                          onChange={(e) =>
                            setAdminDetails({
                              ...adminDetails,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="w-full mb-[1.5rem]">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        School Official Email Address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          type="email"
                          placeholder="grace@gmail.com"
                          disabled={isLoading}
                          className={`block outline-none w-full rounded-md border 
                                        border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                                        placeholder:text-gray-700 sm:text-sm sm:leading-6`}
                          onChange={(e) =>
                            setAdminDetails({
                              ...adminDetails,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="student.state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        School Type
                      </label>
                      <div className="mt-2 relative">
                        <div className="absolute inset-0 flex items-center justify-end">
                          <IoIosArrowDown className="text-black-500 relative right-4" />
                        </div>
                        <select
                          id="student.state"
                          disabled={isLoading}
                          onChange={(e) =>
                            setAdminDetails({
                              ...adminDetails,
                              school_type: e.target.value,
                            })
                          }
                          className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 sm:text-sm sm:leading-6`}
                        >
                          <option value="" className="text-gray-600">
                            Select School Type
                          </option>
                          <option value="government" className="text-gray-600">
                            Government School
                          </option>
                          <option value="private" className="text-gray-600">
                            Private School
                          </option>
                        </select>
                      </div>
                    </div>

                    {/*  */}
                    <div className="flex items-center gap-3 flex-wrap min-[576px]:flex-nowrap">
                      <div className="w-full min-[576px]:w-1/2">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Official Number
                        </label>
                        <PhoneInput
                          country={"us"}
                          placeholder="123 456 7890"
                          inputClass="!py-7"
                          dropdownStyle={{
                            border: "0px",
                            backgroundColor: "white",
                          }}
                          containerStyle={{
                            width: "100%", // Parent div width
                          }}
                          inputStyle={{
                            width: "100%", // Match input width to container
                          }}
                          containerClass="profile-create-tel-input"
                          value={adminDetails?.school_phone}
                          onChange={(value) => {
                            setAdminDetails({
                              ...adminDetails,
                              school_phone: value,
                            });
                          }}
                        />
                      </div>
                      <div className="w-full min-[576px]:w-1/2">
                        <label
                          htmlFor="school_website"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Website Link
                        </label>
                        <div>
                          <input
                            id="school_website"
                            type="school_website"
                            placeholder="https://"
                            disabled={isLoading}
                            className={`block outline-none w-full rounded-md border 
                                        border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                                        placeholder:text-gray-700 sm:text-sm sm:leading-6`}
                            onChange={(e) =>
                              setAdminDetails({
                                ...adminDetails,
                                school_website: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center gap-3 flex-wrap min-[576px]:flex-nowrap">
                      <div className="w-full min-[576px]:w-1/2">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <div
                            className="absolute top-[25%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"
                            onClick={togglePasswordVisibility}
                          >
                            {passwordVisible ? (
                              <AiOutlineEye size={20} />
                            ) : (
                              <AiOutlineEyeInvisible size={20} />
                            )}
                          </div>

                          <input
                            id="password"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="********"
                            disabled={isLoading}
                            className={`block outline-none w-full rounded-md border 
                                        border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                                        placeholder:text-gray-700 sm:text-sm sm:leading-6`}
                            onChange={(e) =>
                              setAdminDetails({
                                ...adminDetails,
                                password: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="w-full min-[576px]:w-1/2">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div
                            className="absolute top-[15%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {confirmPasswordVisible ? (
                              <AiOutlineEye size={20} />
                            ) : (
                              <AiOutlineEyeInvisible size={20} />
                            )}
                          </div>

                          <input
                            id="confirm_password"
                            type={confirmPasswordVisible ? "text" : "password"}
                            placeholder="********"
                            disabled={isLoading}
                            className={`block outline-none w-full rounded-md border 
                                        border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                                        placeholder:text-gray-700 sm:text-sm sm:leading-6`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-7 mb-10 lg:mb-16 text-sm flex items-start gap-3 font-medium">
                      <input
                        type="checkbox"
                        required
                        className="relative top-1 accent-blue-500"
                      />

                      <div className="md:w-[80%] lg:w-[60%]">
                        <Link href={``} target="_blank">
                          I agree to Wificombat E-learn
                          <span className="text-blue-500">
                            {""} Term and Condition and Privacy Policy
                          </span>
                        </Link>
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
                        {isLoading ? "Please wait..." : "Verify Email"}
                      </button>
                    </div>

                    <div className="mt-4 flex justify-center items-center gap-2 font-medium">
                      <span className="text-sm font-semibold text-[#131314]">
                        Already have an account?
                      </span>
                      <Link
                        href="/login"
                        className="text-blue-600 hover:underline"
                      >
                        login
                      </Link>
                    </div>
                  </>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* {isModalOpen && */}
        <OtpModal
          mail={adminDetails?.email}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
        {/* } */}
      </div>
    </div>
  );
}
