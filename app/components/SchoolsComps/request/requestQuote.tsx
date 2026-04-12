"use client"
// import { Toaster } from "react-hot-toast";
// import { getCountries, getStates } from "@/app/utils/countriesApi";
import Image from "next/image";
import { IoChevronBackOutline } from "react-icons/io5";
import React, {useState} from 'react';




export const RequestQuote = () => {

    const [step, setStep] = useState(1);
    
    const handleNextStep = () => {
        setStep(2);
    }; 

    const handleNextStepThree = () => {
      setStep(3)
    }
    const preStep = () => {
      setStep(1)
    }

    const previousStep = () => {
         setStep(2)
    }


    return (
        <>
        <div className="flex min-h-full w-full h-screen bg-white">
       {/* <Toaster /> */}
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
             width={100}
             height={100}
             alt=""
           />
         </div>
       </div>
            { step === 1 && (
         <div className="relative w-full flex flex-col lg:flex-none overflow-y-auto lg:basis-[50%] mx-auto py-10 px-4 md:px-10 lg:pl-20">
         <IoChevronBackOutline className="relative lg:absolute left-0 lg:top-7 max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm" />
            <div className="flex items-center gap-14 ">
             <div className="">
               <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Request For Quote
               </h2>
               <p>Step 1 of  2</p>
             </div>
           </div>
         <div className="mx-auto w-full">
           <div className="mt-16">
             <div>
               <form className="space-y-6">
                 <>
                 <div className="flex flex-col gap-3 lg:flex-row lg:gap-x-9">
                 <div className="w-full">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       First Name
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         placeholder="John"
                         className="block outline-none w-full lg:w-56 rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                       />
                 
                         <p className="text-[#F00101]">
                         </p>
         
                     </div>
                   </div>
                   <div className="w-full">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Last Name
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         placeholder="Jesse"
                         className="block outline-none w-full lg:w-56 rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                       />
                 
                         <p className="text-[#F00101]">
                         </p>
         
                     </div>
                   </div>
                   </div>
                   <div className="w-full">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       School Name
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         placeholder="chrisland"
                         className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                       />
                 
                         <p className="text-[#F00101]">
                         </p>
         
                     </div>
                   </div>
 
                   <div>
                     <label
                       htmlFor="password"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       School Email Address
                     </label>
                     <div className="mt-2 relative">
                       <div
                         className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"                    >
                        
                       </div>
 
                       <input
                         type="email"
                         placeholder="chrisland@gmail.com"
                         className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                         
                       />
                         <p className="text-[#F00101]">
                     
                         </p>
                     </div>
                   </div>
                   <div>
                     <label
                       htmlFor="password"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Your Role
                     </label>
                     <div className="mt-2 relative">
                       <div
                         className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"                    >
                        
                       </div>
 
                       <input
                         type="text"
                         placeholder="Admin"
                         className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                         
                       />
                         <p className="text-[#F00101]">
                     
                         </p>
                     </div>
                   </div>
                   <div className="mt-14">
                     <button
                       type="submit"
                       onClick={handleNextStep}
                       className="flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
                       p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#B1B1B4] focus-visible:outline 
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B1B1B4]"
                     >
                    Continue
                     </button>
                   </div>
 
                   
                 </>
               </form>
             </div>
           </div>
         </div>
         </div>
  )}

{ step === 2 && (
   <div className="relative w-full flex flex-col lg:flex-none overflow-y-auto lg:basis-[50%] mx-auto py-10 px-4 md:px-10 lg:pl-20">
   <IoChevronBackOutline
   onClick={preStep}
    className="relative lg:absolute left-0 lg:top-7 max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm" />
      <div className="flex items-center gap-14 ">
       <div className="">
         <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Request For Quote
         </h2>
         <p>Step 2 of  2</p>
       </div>
     </div>
         <div className="mx-auto w-full">
           <div className="mt-16">
             <div>
               <form className="space-y-6">
                 <>
                 
                   <div className="w-full">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Career Pathway
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         placeholder="Coding Pathway"
                         className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                       />
                 
                         <p className="text-[#F00101]">
                         </p>
         
                     </div>
                   </div>
 
                   <div>
                     <label
                       htmlFor="password"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Key Stage
                     </label>
                     <div className="mt-2 relative">
                       <div
                         className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"                    >
                        
                       </div>
 
                       <input
                         type="email"
                         placeholder="Key Stage 1"
                         className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                         
                       />
                         <p className="text-[#F00101]">
                     
                         </p>
                     </div>
                   </div>
                   <div>
                     <label
                       htmlFor="password"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Number Of Student
                     </label>
                     <div className="mt-2 relative">
                       <div
                         className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"                    >
                        
                       </div>
 
                       <input
                         type="text"
                         placeholder="150"
                         className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                         
                       />
                         <p className="text-[#F00101]">
                     
                         </p>
                         <div className="flex flex-col  gap-3 lg:flex-row lg:gap-x-4 lg:mt-4">
                     <div className="w-full">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Country
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         placeholder="Nigeria"
                         className="block outline-none  w-full lg:w-60 rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                       />
                 
                         <p className="text-[#F00101]">
                         </p>
         
                     </div>
                   </div>
                   <div className="w-full">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       State
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         placeholder="Lagos"
                         className="block outline-none w-full lg:w-60 rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                       />
                 
                         <p className="text-[#F00101]">
                         </p>
         
                     </div>
                   </div>
                   </div>
                   <div className="flex flex-col lg:flex-row lg:gap-x-4 mt-4">
                     <div className="w-full">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Street address
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         placeholder="gateway"
                         className="block outline-none w-full lg:w-72 rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                       />
                 
                         <p className="text-[#F00101]">
                         </p>
         
                     </div>
                   </div>
                   <div className="w-full">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       zip
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         placeholder="012345"
                         className="block outline-none w-full lg:w-48 rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                       />
                 
                         <p className="text-[#F00101]">
                         </p>
         
                     </div>
                   </div>
                   </div>
                     </div>
                   </div>
                   <div className="flex flex-col gap-4 lg:flex-row lg:mt-14 lg:gap-x-8">
                     <button
                       type="submit"
                       onClick={handleNextStepThree}
                       className="flex  w-full lg:w-72 justify-center rounded-md text-black  disabled:bg-[#B1B1B4] active:bg-[#131314] border-2 border-black  bg-white 
                       p-4 text-sm font-semibold leading-6  shadow-sm hover:text-[#B1B1B4] hover:border-[#B1B1B4]  focus-visible:outline 
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B1B1B4]"
                     >
                    Add More Pathway
                     </button>

                     <button
                       type="submit"
                       className="flex w-full lg:w-72 justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
                       p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#B1B1B4] focus-visible:outline 
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B1B1B4]"
                     >
                    Request Quote
                     </button>
                   </div>
 
                   
                 </>
               </form>
             </div>
           </div>
         </div>
         </div>
  )}
{  step === 3 && (
   <div className="relative w-full  flex flex-col lg:flex-none overflow-y-auto lg:basis-[50%] mx-auto py-10 px-4 md:px-10 lg:pl-20">
   <IoChevronBackOutline 
   onClick={previousStep}
   className="relative lg:absolute left-0 lg:top-7 max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm" />
      <div className="flex items-center gap-14 ">
       <div className="">
         <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Request For Quote
         </h2>
       </div>
     </div>
   <div className="mx-auto w-full">
   <div className="mt-12">
     <div>
       <form className="space-y-6">
         <>
         
           <div className="w-full">
             <label
               htmlFor="email"
               className="block text-sm font-medium leading-6 text-gray-900"
             >
               Career Pathway
             </label>
             <div className="mt-2">
               <input
                 type="text"
                 placeholder="Coding Pathway"
                 className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                   ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                   focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
               />
         
                 <p className="text-[#F00101]">
                 </p>
 
             </div>
           </div>

           <div>
             <label
               htmlFor="password"
               className="block text-sm font-medium leading-6 text-gray-900"
             >
               Key Stage
             </label>
             <div className="mt-2 relative">
               <div
                 className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"                    >
                
               </div>

               <input
                 type="email"
                 placeholder="Key Stage 1"
                 className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                   ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                   focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                 
               />
                 <p className="text-[#F00101]">
             
                 </p>
             </div>
           </div>
           <div>
             <label
               htmlFor="password"
               className="block text-sm font-medium leading-6 text-gray-900"
             >
               Number Of Student
             </label>
             <div className="mt-2 relative">
               <div
                 className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"                    >
                
               </div>

               <input
                 type="text"
                 placeholder="150"
                 className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                   ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                   focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                 
               />
                 <p className="text-[#F00101]">
             
                 </p>
             </div>
           </div>
           <div className="flex flex-col gap-4 lg:flex-row lg:mt-14 lg:gap-x-8">
             <button
               type="submit"
               className="flex w-full lg:w-72 justify-center rounded-md text-black  disabled:bg-[#B1B1B4] active:bg-[#131314] border-2 border-black  bg-white 
               p-4 text-sm font-semibold leading-6  shadow-sm hover:text-[#B1B1B4] focus-visible:outline  hover:border-[#B1B1B4]
               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B1B1B4]"
             >
            Add More Pathway
             </button>

             <button
               type="submit"
               className="flex w-full lg:w-72 justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
               p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#B1B1B4] focus-visible:outline 
               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B1B1B4]"
             >
            Request Quote
             </button>
           </div>

           
         </>
       </form>
     </div>
   </div>
   </div>
 </div>
)

}
       </div>
     </>
    )
}

