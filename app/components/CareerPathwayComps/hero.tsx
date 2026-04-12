import { getCookie } from "cookies-next";
import Link from "next/link";

export const CareerPathwayHero = () => {
  const role = getCookie("role");
  return (
    <section id="home" className="text-white">
      <div
        className={`relative isolate overflow-hidden pb-[7rem] md:py-[7rem] lg:py-[10rem] bg-black-500`}
      >
        <div className="relative max-md:mt-[4rem] w-[93%] md:w-[80%] lg:w-[85%] mx-auto h-[16rem] xl:h-[20rem] 2xl:h-[24rem] flex flex-col md:flex-row md:items-center gap-10">
          <div className="w-full md:basis-[50%]">
            <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl lg:w-[85%]">
              Lorem ipsum dolor sit amet consectetur.
            </h1>

            <p className="mt-5 font-semibold text-lg md:text-xl lg:w-[85%]">
              Lorem ipsum dolor sit amet consectetur. A integer viverra libero
              sit. Adipiscing vel at non platea posuere massa porttitor. Viverra
              purus luctus posuere massa neque laoreet sed viverra.
            </p>

            <div className="mt-10 lg:mt-16">
              <>
                {!role && (
                  <Link
                    href={`/registration`}
                    style={{
                      background: `conic-gradient(from 173.86deg at 50% 50%, #FFB600 -13.12deg, #BC00DD 120deg, #0784C3 181.87deg, #FFB600 346.88deg, #BC00DD 480deg)`,
                    }}
                    className="px-16 py-5 font-medium text-white shadow-sm rounded-lg transition duration-300 hover:bg-opacity-90"
                  >
                    Register
                  </Link>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
