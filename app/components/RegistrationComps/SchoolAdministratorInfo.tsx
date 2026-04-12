import React, { FormEvent } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { RiLoader4Fill } from 'react-icons/ri';

type Props = {
    register:any;
    errors: any;
    isLoading:boolean;
    submitRegister: (e: FormEvent, paymentOption: string) => Promise<void>; 
    isFormFilled: boolean;
    countries: Array<{ name: string }>;
    countryStates: Array<{ name: string; state_code: string }>;
    pathway: string[];
    stage: string[];

}

const StudentAdministratorInfo = ({
    register,
    errors,
    isLoading,
    submitRegister,
    isFormFilled,
    countries,
    countryStates,
    pathway,
    stage
  }: Props) => {
  return (
    <>
        <div className="w-full">
            <label
            htmlFor="schoolAdministrator.pathway"
            className="block text-sm font-medium leading-6 text-gray-900"
            >
            Career Pathway
            </label>
            <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-center justify-end">
                <IoIosArrowDown className="text-black-500 relative right-4" />
            </div>
            <select
                id="schoolAdministrator.pathway"
                disabled={isLoading}
                {...register("schoolAdministrator.pathway", {
                required: true,
                })}
                className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.schoolAdministrator?.pathway
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.schoolAdministrator?.pathway
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
            {errors.schoolAdministrator?.pathway && (
                <p className="text-[#F00101]">
                {errors.schoolAdministrator.pathway.message}
                </p>
            )}
            </div>
        </div>

        <div>
            <label
                htmlFor="schoolschoolAdministrator.class"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Class
            </label>
            <div className="mt-2 relative">
                <div className="absolute inset-0 flex items-start justify-end">
                <IoIosArrowDown className="text-black-500 relative top-5 right-4" />    
                </div>
                <select
                id="schoolschoolAdministrator.class"
                disabled={isLoading}
                {...register("schoolschoolAdministrator.class", { required: true })}
                className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                    errors.schoolschoolAdministrator?.class
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
                ${errors.schoolschoolAdministrator?.class ? "focus:border-red-500" : "focus:border-black"}`}
                >
                <option value="" className="text-gray-600">Select Class</option>
                <option value="JSS1" className="text-gray-600">JSS 1 / Grade 7 / Year 7</option>
                <option value="JSS2" className="text-gray-600">JSS 2 / Grade 8 / Year 8</option>
                <option value="JSS3" className="text-gray-600">JSS 3 / Grade 9 / Year 9</option>
                <option value="SSS1" className="text-gray-600">SSS 1 / Grade 10 / Year 10</option>
                <option value="SSS2" className="text-gray-600">SSS 2 / Grade 11 / Year 11</option>
                <option value="SS33" className="text-gray-600">SS3 3 / Grade 12 / Year 12</option>
                </select>
                {errors.schoolschoolAdministrator?.class && (
                <p className="text-[#F00101]">
                    {errors.schoolschoolAdministrator.class.message}
                </p>
                )}
            </div>
        </div>

        <div>
            <label
                htmlFor="schoolAdministrator.students"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Number of Student
            </label>
            <div className="mt-2">
                <input
                id="schoolAdministrator.students"
                type="number"
                placeholder="50"
                disabled={isLoading}
                {...register("schoolAdministrator.students", { required: true })}
                className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                    focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                    errors.schoolAdministrator?.students
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.schoolAdministrator?.students ? "focus:border-red-500" : "focus:border-black"
            }`}
                />
                {errors.schoolAdministrator?.students && (
                <p className="text-[#F00101]">
                    {errors.schoolAdministrator.students.message}
                </p>
                )}
            </div>
        </div>

        <div>
            <label
                htmlFor="schoolAdministrator.teachers"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Number of Teacher
            </label>
            <div className="mt-2">
                <input
                id="schoolAdministrator.teachers"
                type="number"
                placeholder="50"
                disabled={isLoading}
                {...register("schoolAdministrator.teachers", { required: true })}
                className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                    focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                    errors.schoolAdministrator?.teachers
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.schoolAdministrator?.teachers ? "focus:border-red-500" : "focus:border-black"
            }`}
                />
                {errors.schoolAdministrator?.teachers && (
                <p className="text-[#F00101]">
                    {errors.schoolAdministrator.teachers.message}
                </p>
                )}
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
            <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-center justify-end">
                <IoIosArrowDown className="text-black-500 relative right-4" />
            </div>
            <select
                id="schoolAdministrator.country"
                disabled={isLoading}
                {...register("schoolAdministrator.country", {
                required: true,
                })}
                className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border 
                border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 
                focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.schoolAdministrator?.country
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.schoolAdministrator?.country
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
                <option value="">Select Country</option>
                {countries.length > 0 &&
                countries.map((country: any) => (
                    <option
                    key={country.name}
                    value={country.name}
                    >
                    {country.name}
                    </option>
                ))}
            </select>
            {errors.schoolAdministrator?.country && (
                <p className="text-[#F00101]">
                {errors.schoolAdministrator.country.message}
                </p>
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
            <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-center justify-end">
                <IoIosArrowDown className="text-black-500 relative right-4" />
            </div>
            <select
                id="schoolAdministrator.state"
                disabled={isLoading}
                {...register("schoolAdministrator.state", { required: true })}
                className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.schoolAdministrator?.state
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.schoolAdministrator?.state
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
                <option value="" className="text-gray-600">
                Select State
                </option>
                {countryStates.length > 0 &&
                countryStates.map((state: any) => (
                    <option
                    key={state.state_code}
                    value={state.name}
                    >
                    {state.name}
                    </option>
                ))}
            </select>
            {errors.schoolAdministrator?.state && (
                <p className="text-[#F00101]">
                {errors.schoolAdministrator.state.message}
                </p>
            )}
            </div>
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

export default StudentAdministratorInfo