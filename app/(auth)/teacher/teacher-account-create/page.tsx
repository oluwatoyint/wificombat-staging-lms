"use client";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { IoChevronBackOutline } from "react-icons/io5";
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
import OtpModal from "@/app/utils/otp-modal";
import SuccessModal from "@/app/utils/success-modal";

let selectedRole = null;

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirm_password: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long",
    }),
    schoolName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })
  .refine(
    (data) => {
      if (selectedRole === "Administrator") {
        return data.schoolName && data.schoolName.length > 0;
      }
      if (selectedRole === "Student" || selectedRole === "Teacher") {
        return data.schoolName && data.schoolName !== "";
      }
      return true;
    },
    {
      message: "School name is required",
      path: ["schoolName"],
    }
  );

type SignupValues = {
  email: string;
  password: string;
  confirm_password: string;
  schoolName?: string;
};

export default function Page() {
  const router = useRouter();
  const { selectedRole } = useMain();
  const { setMail, setPass } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dropDown, setDropDown] = useState<String>();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const schools = ["School 1", "School 2", "School 3"];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupValues>({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      schoolName: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  let fieldsToWatch: readonly any[] = [
    "email",
    "password",
    "confirm_password",
    "schoolName",
  ];

  const watchedFields = watch(fieldsToWatch);

  const isFormFilled = Object.values(watchedFields).every(
    (field) => field !== ""
  );

  const email = watch("email");
  const password = watch("password");

  const [teacherDetails, setTeacherDetails] = useState<any>({
    role: "teacher",
    email: "",
    password: "",
    school: "",
    teacherId: "",
  });
  const [allSchools, setAllSchools] = useState<any[]>([]);
  const [selectedSchool, setSelectedSchool] = useState("");

  const requestOtp = async () => {
    setIsLoading(true);
    try {
      const response = await api.post(`/register`, {
        email,
        password,
        role: "teacher",
      });
      if (response.data?.success) {
        toast.success(response.data?.message);
        setModalOpen(true);
      }
    } catch (error: any) {
      toast.error(error.response.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<SignupValues> = async (data) => {
    setIsLoading(true);
    try {
      setMail(email);
      setPass(password);
      requestOtp();
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

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

  // this function sends the teacher details to the db for otp request
  const submitTeacherDetails = async (e: any) => {
    e.preventDefault();
    if (!teacherDetails?.email || !teacherDetails?.password) {
      return toast.error("Please fill in all details");
    }
    try {
      setIsLoading(true);
      const res = await api.post("/register", teacherDetails);
      if (!res.data?.success) {
        return toast.error(res.data?.message);
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
                <form
                  // onSubmit={handleSubmit(onSubmit)}
                  onSubmit={submitTeacherDetails}
                  className="space-y-2"
                >
                  <>
                    <div>
                      <div className="relative w-full mt-[4rem] mb-[1.5rem]">
                        <label
                          htmlFor="administrator"
                          className="block text-sm mb-2 font-medium leading-6 text-gray-900"
                        >
                          Teacher Id
                        </label>
                        <input
                          type="text"
                          id="schoolName"
                          placeholder="tecid823673"
                          required
                          className="block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                                    placeholder:text-gray-700 sm:text-sm sm:leading-6"
                          onChange={(e) =>
                            setTeacherDetails({
                              ...teacherDetails,
                              teacherId: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="w-full mb-[1.5rem] relative">
                        <label className="block text-sm mb-2 font-medium leading-6 text-gray-900">
                          School Name
                        </label>
                        <div className="border flex items-center justify-between rounded-md focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                          <input
                            type="text"
                            id="schoolName"
                            placeholder="Christland"
                            value={selectedSchool}
                            required
                            className="block outline-none w-full border-neutral-300 placeholder:text-gray-700"
                          />
                          <BiChevronDown
                            onClick={() =>
                              setDropDown(dropDown === "school" ? "" : "school")
                            }
                            className="cursor-pointer text-gray-500 text-[24px]"
                          />
                        </div>
                        {dropDown === "school" && (
                          <div className="absolute z-[899] h-[200px] overflow-auto bg-white w-full mt-1 p-2 rounded-md shadow-md border">
                            {allSchools &&
                              allSchools?.map((school, index) => (
                                <div
                                  key={index}
                                  className="cursor-pointer hover:bg-gray-100 p-2"
                                  onClick={() => {
                                    setTeacherDetails({
                                      ...teacherDetails,
                                      school: school?.id,
                                    });
                                    setSelectedSchool(school?.name);
                                    setDropDown("");
                                  }}
                                >
                                  {school?.name}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full pb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email Address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          type="email"
                          placeholder="grace@gmail.com"
                          className={`block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                                        placeholder:text-gray-700 sm:text-sm sm:leading-6`}
                          onChange={(e: any) =>
                            setTeacherDetails({
                              ...teacherDetails,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="mt-2 relative pb-4">
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
                          className={`block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 
                                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 
                                            sm:text-sm sm:leading-6 `}
                          onChange={(e) =>
                            setTeacherDetails({
                              ...teacherDetails,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-2 relative">
                        <div
                          className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"
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
                          className={`block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 
                                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-700
                                            sm:text-sm sm:leading-6`}
                        />
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
                        disabled={isLoading}
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
          mail={teacherDetails?.email}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
        {/* <SuccessModal /> */}
        {/* } */}
      </div>
    </div>
  );
}
