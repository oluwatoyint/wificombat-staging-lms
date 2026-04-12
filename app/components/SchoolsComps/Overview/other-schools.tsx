import Link from "next/link"

export const JoinOtherSchools = () => {
    return (
        <section className="py-10 md:py-14 lg:py-20 bg-blue-50">
             <h3 className="w-[90%] mx-auto text-center text-2xl md:text-4xl font-semibold">Be Part Of the Wificombat Community</h3>
            <p className="mt-9 md:w-[80%] lg:w-[65%] mx-auto text-center md:text-xl">Join our community at WiFiCombat eLearn to connect, collaborate, and grow with fellow learners and tech enthusiasts!
            </p>

            <div className="mt-10 w-full flex items-center justify-center">
                <Link
                  href={`/registration`}
                  className="px-16 md:px-24 py-5 font-medium text-white shadow-sm bg-black-500 rounded-lg transition duration-300 hover:bg-opacity-90">
                    Join Now
                </Link>
             </div>
        </section>
    )
}