import { getCookie } from "cookies-next";
import Link from "next/link";

export const Community = () => {
  const role = getCookie("role");
  return (
    <div className="z-[2] relative w-full top-10">
      <div className="absolute inset-0 w-full flex items-center justify-center">
        <div className="z-[2] w-[90%] md:w-[80%] lg:w-[88%] mx-auto py-8 md:py-12 bg-purple-500 text-center text-white rounded-3xl">
          <h3 className="text-xl md:text-2xl w-[90%] md:w-[80] mx-auto font-semibold">
            Join the Wificombat Elearn Community Today:
          </h3>
          <p className="mt-1 w-[90%] md:w-[70%] mx-auto">
            Ready to empower your students for success in the digital age? Sign
            up for a free trial of Wificombat Elearn today and unlock a world of
            opportunities for your students&apos; future careers in tech!
          </p>

          <div className="mt-8 mb-3 flex items-center justify-center">
            {!role && (
              <Link href="/registration">
                <button
                  className="rounded-lg bg-[#131314] px-16 py-5 font-medium text-white shadow-sm hover:bg-black/80 
                                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Register Now
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 w-full flex items-center justify-center">
        <div className="relative top-3 left-3 md:top-5 md:left-5 w-[90%] md:w-[80%] lg:w-[88%] mx-auto py-8 md:py-12 bg-purple-300 text-center text-purple-300 rounded-3xl">
          <h3 className="text-xl md:text-2xl w-[90%] md:w-[80] mx-auto font-semibold">
            Join the Wificombat Elearn Community Today:
          </h3>
          <p className="mt-1 w-[90%] md:w-[70%] mx-auto">
            Ready to empower your students for success in the digital age? Sign
            up for a free trial of Wificombat Elearn today and unlock a world of
            opportunities for your students&apos; future careers in tech!
          </p>

          <div className="mt-8 mb-3 flex items-center justify-center">
            {!role && (
              <Link href="/register">
                <button className="rounded-lg bg-purple-300 px-16 py-5 font-medium text-purple-300">
                  Register Now
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
