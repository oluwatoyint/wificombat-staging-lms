import { useMain } from "@/app/context/MainContext";
import { ages } from "@/app/utils/ages";
import api from "@/app/utils/auth-interceptor";
import { classArray } from "@/app/utils/class-array";
import { setCookie } from "cookies-next";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";
import { RiLoader4Fill } from "react-icons/ri";

type Props = {
  register: any;
  errors: any;
  isLoading: boolean;
  submitRegister: (e: FormEvent, paymentOption: string) => Promise<void>;
  isFormFilled: boolean;
  countries: Array<{ name: string }>;
  countryStates: Array<{ name: string; state_code: string }>;
  pathway: string[];
  stage: string[];
  setCountryCodes: Dispatch<SetStateAction<any | null>>;
};

const StudentInfo = ({
  register,
  errors,
  isLoading,
  submitRegister,
  isFormFilled,
  countries,
  countryStates,
  pathway,
  stage,
  setCountryCodes,
}: Props) => {
  const { setPaymentOption } = useMain();
  //
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [noDetail, setNoDetail] = useState(false);
  //
  const [studentInfo, setStudentInfo] = useState<any>({
    first_name: "",
    last_name: "",
    phone: "",
    bio: "",
    //   "school": "951ec22f-6221-484b-9ec4-bc1de5231b70",
    //   "profile_pic": "19641c2e-bc46-411c-8745-a1df31a61955",
    age: "",
    _class: "",
    country: "",
    no_student_you_teach: null,
    school_type: "",
  });
  //   //
  const submitOnboardingInfo = async (e: any) => {
    e.preventDefault();
    if (
      !studentInfo?.first_name ||
      !studentInfo?.last_name ||
      !studentInfo?.age ||
      !studentInfo?._class ||
      !studentInfo?.country ||
      !studentInfo?.school_type
    ) {
      setNoDetail(true);
      return toast.error("Please fill in all details");
    } else {
      setNoDetail(false);
    }
    try {
      setSubmitting(true);
      const res = await api.put("/dashboard/update-profile", studentInfo);
      if (res.data?.success) {
        setCookie("session_id", res.data?.data?.session_id, {
          // httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
        });
        setCookie("user_id", res.data?.data?.id, {
          // httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
        });
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
        toast.success("Profile updated!");
        window.location.href = "/students/curriculum";
      }
    } catch (error: any) {
      toast.error(error.response.data?.message);
    } finally {
      setSubmitting(false);
    }
  };
  //
  return (
    <>
      <div className="flex items-center flex-wrap min-[576px]:flex-nowrap gap-2">
        <div className="w-full min-[576px]:w-1/2">
          <label
            htmlFor="student.fullname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First Name
          </label>
          <div className="mt-2">
            <input
              id="student.fullname"
              type="text"
              placeholder="Grace"
              disabled={isLoading}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, first_name: e.target.value })
              }
              className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.fullname
                  ? "border-[#F00101]"
                  : "border-neutral-300"
              }
            ${
              errors.student?.fullname
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            />
            {errors.student?.fullname && (
              <p className="text-[#F00101]">
                {errors.student.fullname.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full min-[576px]:w-1/2">
          <label
            htmlFor="student.fullname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last Name
          </label>
          <div className="mt-2">
            <input
              id="student.fullname"
              type="text"
              placeholder="Adeboye"
              disabled={isLoading}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, last_name: e.target.value })
              }
              className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.fullname
                  ? "border-[#F00101]"
                  : "border-neutral-300"
              }
            ${
              errors.student?.fullname
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            />
            {errors.student?.fullname && (
              <p className="text-[#F00101]">
                {errors.student.fullname.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-1/2">
          <label
            htmlFor="student.age"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Age
          </label>
          <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-start justify-end">
              <IoIosArrowDown className="text-black-500 relative top-5 right-4" />
            </div>
            <select
              id="student.age"
              //   {...register("student.age", {
              //     required: true,
              //     valueAsNumber: true,
              //   })}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, age: e.target.value })
              }
              className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.age ? "border-[#F00101]" : "border-neutral-300"
              }
                ${
                  errors.student?.age
                    ? "focus:border-red-500"
                    : "focus:border-black"
                }`}
            >
              <option value="0" disabled>
                Select an age
              </option>
              {ages?.map((age) => (
                <option key={age} value={age} className="text-gray-700">
                  {age}
                </option>
              ))}
            </select>
            {/* {errors.student?.age && (
              <p className="h-[1rem] text-[#F00101]">
                {errors.student.age.message}
              </p>
            )} */}
          </div>
        </div>

        <div className="w-1/2">
          <label
            htmlFor="student.class"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Class
          </label>
          <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-start justify-end">
              <IoIosArrowDown className="text-black-500 relative top-5 right-4" />
            </div>
            <select
              id="student.class"
              disabled={isLoading}
              //   {...register("student.class", { required: true })}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, _class: e.target.value })
              }
              className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.class
                  ? "border-[#F00101]"
                  : "border-neutral-300"
              }
                    ${
                      errors.student?.class
                        ? "focus:border-red-500"
                        : "focus:border-black"
                    }`}
            >
              <option value="" className="text-gray-600">
                Select Class
              </option>
              {classArray?.map((option, index: number) => (
                <option
                  key={index}
                  value={option?.value}
                  className="text-gray-600"
                >
                  {option?.name}
                </option>
              ))}
            </select>
            {errors.student?.class && (
              <p className="text-[#F00101]">{errors.student.class.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-1/2">
          <label
            htmlFor="student.country"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Country
          </label>
          <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-center justify-end">
              <IoIosArrowDown className="text-black-500 relative right-4" />
            </div>
            <select
              id="student.country"
              disabled={isLoading}
              //   {...register("student.country", {
              //     required: true,
              //   })}
              onChange={(e) => {
                const selectedCountryName = e.target.value;
                const selectedCountry: any = countries.find(
                  (country: any) => country.name === selectedCountryName
                );
                if (selectedCountry) {
                  setCountryCodes({
                    countryIso: selectedCountry.iso2,
                    iso: selectedCountry.iso3,
                  });
                }
                setStudentInfo({ ...studentInfo, country: e.target.value });
              }}
              className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border 
                border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 
                focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                  errors.student?.country
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
              errors.student?.country
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
              <option value="">Select Country</option>
              {countries.length > 0 &&
                countries.map((country: any) => (
                  <option
                    key={country.name}
                    onClick={() => {
                      setCountryCodes({
                        countryIso: country?.countryIso,
                        iso: country?.iso,
                      });
                    }}
                    value={country.name}
                  >
                    {country.name}
                  </option>
                ))}
            </select>
            {errors.student?.country && (
              <p className="text-[#F00101]">{errors.student.country.message}</p>
            )}
          </div>
        </div>

        <div className="w-1/2">
          <label
            htmlFor="student.state"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            State
          </label>
          <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-center justify-end">
              <IoIosArrowDown className="text-black-500 relative right-4" />
            </div>
            <select
              id="student.state"
              disabled={isLoading}
              //   {...register("student.state", { required: true })}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, state: e.target.value })
              }
              className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.state
                  ? "border-[#F00101]"
                  : "border-neutral-300"
              }
            ${
              errors.student?.state
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
              <option value="" className="text-gray-600">
                Select State
              </option>
              {countryStates.length > 0 &&
                countryStates.map((state: any) => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
            </select>
            {/* {errors.student?.state && (
              <p className="text-[#F00101]">{errors.student.state.message}</p>
            )} */}
          </div>
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
            //   {...register("student.state", { required: true })}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, school_type: e.target.value })
            }
            className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6`}
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
          {/* {errors.student?.state && (
              <p className="text-[#F00101]">{errors.student.state.message}</p>
            )} */}
        </div>
      </div>

      {/* <div className="flex gap-6">
        <div className="w-1/2">
            <label
            htmlFor="student.pathway"
            className="block text-sm font-medium leading-6 text-gray-900"
            >
            Career Pathway
            </label>
            <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-center justify-end">
                <IoIosArrowDown className="text-black-500 relative right-4" />
            </div>
            <select
                id="student.pathway"
                disabled={isLoading}
                {...register("student.pathway", {
                required: true,
                })}
                className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.pathway
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.student?.pathway
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
                <option value="">Select Pathway</option>
                {pathway.map((pathway, index) => (
                <option key={index} value={pathway}>
                    {pathway}
                </option>
                ))}
            </select>
            {errors.student?.pathway && (
                <p className="text-[#F00101]">
                {errors.student.pathway.message}
                </p>
            )}
            </div>
        </div>

        <div className="w-1/2">
            <label
            htmlFor="student.state"
            className="block text-sm font-medium leading-6 text-gray-900"
            >
            Stages
            </label>
            <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-center justify-end">
                <IoIosArrowDown className="text-black-500 relative right-4" />
            </div>
            <select
                id="student.stage"
                disabled={isLoading}
                {...register("student.stage", { required: true })}
                className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.stage
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.student?.stage
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
                <option value="" className="text-gray-600">
                Select Stage
                </option>
                {stage.map((stage, index) => (
                <option key={index} value={stage}>
                    {stage}
                </option>
                ))}
            </select>
            {errors.student?.stage && (
                <p className="text-[#F00101]">
                {errors.student.stage.message}
                </p>
            )}
            </div>
        </div>
        </div> */}

      {/* <div className="w-full">
        <label
            htmlFor="student.course"
            className="block text-sm font-medium leading-6 text-gray-900"
        >
            Course
        </label>
        <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-start justify-end">
            <IoIosArrowDown className="text-black-500 relative top-5 right-4" />
            </div>
            <select
            id="student.course"
            disabled
            value={"coding"}
            {...register("student.course")}
            className={`relative appearance-none bg-stone-200 block outline-none w-full bg-transparent rounded-md border 
                border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 
                focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                    errors.student?.course
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.student?.course
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
            <option value="Coding">Nil</option>
            <option value="TeenTechpreneurship">TeenTechpreneurship</option> 
            </select>
            {errors.student?.course && (
            <p className="text-[#F00101]">
                {errors.student.course.message}
            </p>
            )}
        </div>
        </div> */}

      <div className="mt-10 lg:mt-14 flex items-center justify-between gap-8">
        {/* <button
            type="submit"
            onClick={(e) => submitRegister(e, 'payLater')}
            disabled={!isFormFilled}
            className="flex w-full items-center justify-center text-center rounded-md disabled:border-[#B1B1B4]
            disabled:bg-[#fff] text-[#131314] border border-[#131314] p-4 text-sm font-semibold leading-6 
            shadow-sm hover:bg-purple-50 focus-visible:outline disabled:text-[#B1B1B4]
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
            {isLoading? 
            <div className="flex items-center gap-1">
            Registering
            <RiLoader4Fill size={24} className="animate-spin"/>
            </div> : 
            "Register"}
        </button> */}

        <button
          type="submit"
          //   onClick={(e) => submitRegister(e, "payNow")}
          onClick={submitOnboardingInfo}
          //   disabled={!isFormFilled}
          disabled={submitting}
          className="flex w-full items-center justify-center text-center rounded-md disabled:bg-[#B1B1B4] 
            active:bg-[#131314] bg-[#131314] p-4 text-sm font-semibold leading-6 
            text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
          {submitting ? (
            <div className="flex items-center gap-1">
              Registering
              <RiLoader4Fill size={24} className="animate-spin" />
            </div>
          ) : (
            "Register"
          )}
        </button>
      </div>
    </>
  );
};

export default StudentInfo;
