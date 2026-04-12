"use client"
import Image from "next/image"
import Link from "next/link"
import RegisterDesign from "@/app/components/RegistrationComps/RegisterDesign";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import { useMain } from "@/app/context/MainContext";
import { toast, Toaster } from "react-hot-toast";

const images = [
    { image: "/student-reg.png", hoverColor: "hover:shadow-green-600", role: "student", title: "Student" },
    { image: "/teacher-reg.png", hoverColor: "hover:shadow-red-500", role: "teacher", title: "Teacher" },
    { image: "/admin-reg.png", hoverColor: "hover:shadow-green-500", role: "school_admin", title: "School Administrator" }
]

export default function Page() {
    const router = useRouter();

    const handleRoleSelection = (role: string) => {
      if (role  === "school_admin"){
            localStorage.setItem("selectedRole", role)
            router.push('/school-admin/school-admin-account-create')
        }
        if (role === "teacher"){
            localStorage.setItem("selectedRole", role)
            router.push('/teacher/teacher-account-create')
        }
        if (role === "student"){
            localStorage.setItem("selectedRole", role)
            router.push('/student/student-account-create')
        }
}


    return (
        <div className="mx-auto relative container w-full max-w-[2000px]">
            <Toaster/>
            <section className="relative w-full h-screen bg-white flex items-center justify-center overflow-y-visible">
                <RegisterDesign />

                <div className="w-[90%] md:w-[85%] mx-auto">
                    <div className="lg:relative">
                        <IoChevronBackOutline
                            size={24}
                            onClick={() => router.back()}
                            className="md:absolute left-3 lg:left-[-2rem] top-3 lg:top-[-0.5rem] max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-lg"
                        />
                        <h1 className="relative w-[90%] mx-auto font-semibold text-2xl md:text-3xl lg:text-4xl text-center">
                            Create Account as a/an
                        </h1>
                    </div>

                    <div className="z-[2] relative md:w-[90%] lg:w-[80%] mx-auto mt-[4rem] md:mt-[7rem] flex max-lg:flex-wrap 
                items-center justify-center lg:justify-center gap-6 lg:gap-9">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="w-[40%] lg:w-[33%]"
                                onClick={() => handleRoleSelection(image.role)}>
                                <Image
                                    width={250}
                                    height={250}
                                    src={image.image}
                                    alt={image.role}
                                    className={`w-full object-contain rounded-xl cursor-pointer transition ease-in-out duration-300 
                                hover:scale-105 hover:shadow-lg ${image.hoverColor}`}
                                />
                                <div className="mt-4 text-center font-semibold text-lg md:text-xl">{image.title}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-[4rem] w-[90%] md:w-[70%] mx-auto flex items-center justify-center 
                    gap-2 font-semibold text-black-500 md:text-xl">
                        Already have an account? <Link href={`/login`} className="text-blue-500">Login</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}