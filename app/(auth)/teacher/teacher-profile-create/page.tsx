"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { IoChevronBackOutline } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";
import { Toaster, toast } from "react-hot-toast";
import { useForm, useFieldArray } from "react-hook-form";
import { classArray } from "@/app/utils/class-array";
import { setCookie } from "cookies-next";
import api from "@/app/utils/auth-interceptor";

type TeacherProfileForm = {
  classes: {
    _class: string;
    no_student_you_teach: number;
    course: string;
  }[];
  first_name: string;
  last_name: string;
  interests: string[];
};

export default function Page() {
  const router = useRouter();
  const [dropDown, setDropDown] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TeacherProfileForm>({
    defaultValues: {
      classes: [{ _class: "", no_student_you_teach: 0, course: "" }],
      first_name: "",
      last_name: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "classes", // Tells useFieldArray which part of the form state to manage
  });

  async function onSubmit(data: TeacherProfileForm) {
    const teacherProfilePayload = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      _class: data?.classes[0]?._class,
      no_student_you_teach: data?.classes[0]?.no_student_you_teach,
    };
    try {
      setIsLoading(true);
      const res = await api.put(
        `/dashboard/update-profile`,
        teacherProfilePayload
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
        window.location.href = "/dashboard/teacher";
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleProfileCreate(e: any) {}

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

          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Teacher Profile
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="first_name"
                  className="block text-sm mb-2 font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <input
                  {...register("first_name", {
                    required: "First name is required",
                  })}
                  type="text"
                  placeholder="Grace"
                  className="block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                    placeholder:text-gray-700 sm:text-sm sm:leading-6"
                />
                {errors.first_name && (
                  <p className="text-sm text-red-500">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="last_name"
                  className="block text-sm mb-2 font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <input
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                  type="text"
                  placeholder="Adeboye"
                  className="block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                    placeholder:text-gray-700 sm:text-sm sm:leading-6"
                />
                {errors.last_name && (
                  <p className="text-sm text-red-500">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 border-b pb-4">
                <div className="relative w-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Class You Teach
                  </label>
                  <div className="flex items-center justify-between rounded-md border py-3 px-4 shadow-sm ring-1 ring-inset ring-gray-300">
                    <input
                      type="text"
                      {...register(`classes.${index}._class` as const, {
                        required: true,
                      })}
                      value={getValues(`classes.${index}._class`)}
                      readOnly
                      placeholder="Select class"
                      className="outline-none w-full placeholder:text-gray-500"
                    />
                    <BiChevronDown
                      onClick={() =>
                        setDropDown(
                          dropDown === `class${index}` ? "" : `class${index}`
                        )
                      }
                      className="cursor-pointer text-gray-500 text-[24px]"
                    />
                  </div>
                  {dropDown === `class${index}` && (
                    <div className="absolute z-10 bg-white w-full mt-1 p-2 rounded-md shadow-md border h-[200px] overflow-auto">
                      {classArray.map((clas, idx) => (
                        <div
                          key={idx}
                          className="cursor-pointer hover:bg-gray-100 p-2"
                          onClick={() => {
                            setValue(`classes.${index}._class`, clas?.value);
                            setDropDown("");
                          }}
                        >
                          {clas?.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`classes.${index}.no_student_you_teach`}
                    className="block text-sm mb-2 font-medium leading-6 text-gray-900"
                  >
                    Number of Students
                  </label>
                  <input
                    {...register(`classes.${index}.no_student_you_teach`, {
                      required: "Number of students is required",
                    })}
                    placeholder="e.g. 50"
                    className="block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-700 sm:text-sm sm:leading-6"
                  />
                  {errors.classes?.[index]?.no_student_you_teach && (
                    <p className="text-sm text-red-500">
                      {errors.classes[index].no_student_you_teach?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`classes.${index}.course`}
                    className="block text-sm mb-2 font-medium leading-6 text-gray-900"
                  >
                    Course
                  </label>
                  <input
                    {...register(`classes.${index}.course`, {
                      required: "Course is required",
                    })}
                    placeholder="e.g. Mathematics"
                    className="block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-700 sm:text-sm sm:leading-6"
                  />
                  {errors.classes?.[index]?.course && (
                    <p className="text-sm text-red-500">
                      {errors.classes[index].course?.message}
                    </p>
                  )}
                </div>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4 flex-wrap min-[576px]:flex-nowrap">
              <button
                type="button"
                onClick={() =>
                  append({
                    _class: "",
                    no_student_you_teach: 0,
                    course: "",
                  })
                }
                disabled={isLoading}
                className="flex w-full justify-center border-gray-600 border-[1.4px] rounded-md disabled:bg-[#B1B1B4] p-4"
              >
                Add another class
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] 
                                    bg-[#131314] p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 
                                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                                    focus-visible:outline-purple-600"
              >
                {isLoading ? "Please wait..." : "Get Started"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
