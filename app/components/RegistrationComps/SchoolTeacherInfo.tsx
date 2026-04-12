import { FormValues } from '@/app/(auth)/create-profile/page';
import React, { FormEvent } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IoIosArrowDown } from 'react-icons/io';
import { RiLoader4Fill } from 'react-icons/ri';

type Props = {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    isLoading: boolean;
    submitRegister: (e: FormEvent, paymentOption: string) => Promise<void>; 
    isFormFilled: boolean;
}

const SchoolTeacherInfo = ({
    register,
    errors,
    isLoading,
    submitRegister,
    isFormFilled,
  }: Props) => {
  return (
    <>
        <div className="w-full">
        <label
            htmlFor="schoolTeacher.fullname"
            className="block text-sm font-medium leading-6 text-gray-900"
        >
            Full Name
        </label>
        <div className="mt-2">
            <input
            id="schoolTeacher.fullname"
            type="text"
            placeholder="Grace Adeboye"
            disabled={isLoading}
            {...register("schoolTeacher.fullname", {
                required: true,
            })}
            className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.schoolTeacher?.fullname
                ? "border-[#F00101]"
                : "border-neutral-300"
            }
            ${
                errors.schoolTeacher?.fullname
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            />
            {errors.schoolTeacher?.fullname && (
            <p className="text-[#F00101]">
                {errors.schoolTeacher.fullname.message}
            </p>
            )}
        </div>
        </div>

        <div>
            <label
                htmlFor="schoolTeacher.class"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Class You Teach
            </label>
            <div className="mt-2 relative">
                <div className="absolute inset-0 flex items-start justify-end">
                <IoIosArrowDown className="text-black-500 relative top-5 right-4" />    
                </div>
                <select
                id="schoolTeacher.class"
                disabled={isLoading}
                {...register("schoolTeacher.class", { required: true })}
                className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                    errors.schoolTeacher?.class
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
                ${errors.schoolTeacher?.class ? "focus:border-red-500" : "focus:border-black"}`}
                >
                <option value="" className="text-gray-600">Select Class</option>
                <option value="JSS1" className="text-gray-600">JSS 1 / Grade 7 / Year 7</option>
                <option value="JSS2" className="text-gray-600">JSS 2 / Grade 8 / Year 8</option>
                <option value="JSS3" className="text-gray-600">JSS 3 / Grade 9 / Year 9</option>
                <option value="SSS1" className="text-gray-600">SSS 1 / Grade 10 / Year 10</option>
                <option value="SSS2" className="text-gray-600">SSS 2 / Grade 11 / Year 11</option>
                <option value="SS33" className="text-gray-600">SS3 3 / Grade 12 / Year 12</option>
                </select>
                {errors.schoolTeacher?.class && (
                <p className="text-[#F00101]">
                    {errors.schoolTeacher.class.message}
                </p>
                )}
            </div>
        </div>

        <div>
            <label
                htmlFor="schoolTeacher.students"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Number of Student
            </label>
            <div className="mt-2">
                <input
                id="schoolTeacher.students"
                type="number"
                placeholder="50"
                disabled={isLoading}
                {...register("schoolTeacher.students", { required: true })}
                className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                    focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                    errors.schoolTeacher?.students
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.schoolTeacher?.students ? "focus:border-red-500" : "focus:border-black"
            }`}
                />
                {errors.schoolTeacher?.students && (
                <p className="text-[#F00101]">
                    {errors.schoolTeacher.students.message}
                </p>
                )}
            </div>
        </div>

        <div className="mt-10 lg:mt-14 flex items-center justify-between gap-8">
        <button
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
            "Pay Later"}
        </button>

        <button
            type="submit"
            onClick={(e) => submitRegister(e, 'payNow')}
            disabled={!isFormFilled}
            className="flex w-full items-center justify-center text-center rounded-md disabled:bg-[#B1B1B4] 
            active:bg-[#131314] bg-[#131314] p-4 text-sm font-semibold leading-6 
            text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
            {isLoading? 
            <div className="flex items-center gap-1">
            Registering
            <RiLoader4Fill size={24} className="animate-spin"/>
            </div> : 
            "Register"}
        </button>
        </div>
    </>
  )
}

export default SchoolTeacherInfo