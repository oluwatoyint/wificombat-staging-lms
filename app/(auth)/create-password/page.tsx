"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoChevronBackOutline } from "react-icons/io5";
import { z } from "zod";
import SuccessModal from "../../utils/success-modal";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BASE_URL } from "@/app/utils/vars";

type ForgotPasswordValues = {
  password: string;
  confirm_password: string;
};

type FormFields = "password" | "confirm_password";
let fieldsToValidate: FormFields[] = [];

const schema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirm_password: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    trigger,
    setValue,
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  let fieldsToWatch: readonly any[] = [];
  fieldsToWatch = ["password", "confirm_password"];

  const isFormFilled =
    Object.keys(errors).length === 0 &&
    Object.values(watch(fieldsToWatch)).every(
      (field) => field !== undefined && field !== ""
    );

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    setIsLoading(true);
    try {
      const response: Response = await fetch(
        `${BASE_URL}/api/v1/students/reset-password`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // otp: otpValue,
            password: data.password,
            confirm_password: data.confirm_password,
            // email: emailValue
          }),
        }
      );

      const responseData = await response.json();
      const { success, message, data: loginData } = responseData;
      console.log(responseData, "responseData");

      if (!response.ok || !success) {
        throw new Error(message);
      }
      if (success) {
        setIsSuccessModalOpen(true);
        toast.success("Password reset successfully");
      }

      return responseData;
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-white flex">
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

      <div className="relative w-full flex flex-col lg:flex-none overflow-y-auto lg:basis-[50%] mx-auto py-10 px-4 md:px-10 lg:pl-20">
        <IoChevronBackOutline
          onClick={() => router.back()}
          className="relative lg:absolute left-0 lg:top-7 max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm"
        />

        <div className="flex items-center gap-14 ">
          <div className="">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create New Password
            </h2>
          </div>
        </div>

        <div className="mx-auto w-full">
          <div className="mt-16">
            <div>
              <form className="">
                <>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2 relative">
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
                        {...register("password", {
                          required: true,
                        })}
                        className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                          errors.password
                            ? "border-[#F00101]"
                            : "border-neutral-300"
                        }
                                ${
                                  errors.password
                                    ? "focus:border-red-500"
                                    : "focus:border-black"
                                }`}
                      />
                      {errors.password && (
                        <p className="text-[#F00101]">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="confirm_password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2 relative">
                      <div
                        className="absolute top-[25%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"
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
                        {...register("confirm_password", {
                          required: true,
                        })}
                        className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                          errors.confirm_password
                            ? "border-[#F00101]"
                            : "border-neutral-300"
                        }
                                ${
                                  errors.confirm_password
                                    ? "focus:border-red-500"
                                    : "focus:border-black"
                                }`}
                      />
                      {errors.confirm_password && (
                        <p className="text-[#F00101]">
                          {errors.confirm_password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-14">
                    <button
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                      disabled={!isFormFilled}
                      className="flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    >
                      {isLoading ? "Please wait..." : "Submit"}
                    </button>
                  </div>
                </>
              </form>

              {isSuccessModalOpen && <SuccessModal />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
