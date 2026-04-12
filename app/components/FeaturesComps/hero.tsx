import { merriweather } from "@/app/fonts";
import { WalletIcon } from "@/app/icons";
import { Breadcrumbs } from "@/app/utils/breadcrumb";
import BreadcrumbsWrapper from "@/app/utils/breadcrumbsWrapper";
import Cart from "@/app/utils/cart";
import Image from "next/image";
import Link from "next/link";

export const FeaturesHero = () => {
  return (
    <BreadcrumbsWrapper>
      <section id="home" className="text-white">
        <div
          className={`relative isolate overflow-hidden pb-[7rem] md:py-[7rem] lg:py-[10rem] bg-blue-500`}
        >
          <div className="flex items-center gap-3 z-[15] absolute top-4 lg:top-7 right-5 lg:right-20">
            <Cart />
            <Link href="/wallet">
              <WalletIcon />
            </Link>
          </div>
          <div
            className={`relative max-lg:mt-[5rem] w-[93%] md:w-[80%] lg:w-[85%] mx-auto max-md:h-full h-[16rem] xl:h-[20rem] 2xl:h-[24rem] 
                    flex flex-col md:flex-row md:items-center md:justify-between gap-10`}
          >
            <div className="w-full md:basis-[50%] relative">
              <Breadcrumbs homeLabel="Home" />
              <h1
                className={`${merriweather.className} 
                            text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 
                            max-md:leading-[45px] lg:leading-[67.2px] 2xl:leading-[78px] font-bold max-lg:pt-3`}
              >
                Take Our Assessment and Discover Your Path To Success
              </h1>

              <p className="mt-5 font-semibold text-lg md:text-xl lg:w-[85%]">
                Ready to unlock your potential? Take our assessment today and
                uncover the perfect career pathway tailored just for you. Start
                your journey towards a brighter future!
              </p>

              <div className="mt-10 lg:mt-16">
                <Link
                  href={`/assessment`}
                  className="px-12 py-5 font-bold bg-black-500 shadow-sm text-white rounded-lg transition 
                            duration-300 hover:bg-opacity-90"
                >
                  Take Assesment
                </Link>
              </div>
            </div>

            <div className="w-full md:basis-[50%] flex items-center justify-center max-md:hidden">
              <Image
                src={`/coder.png`}
                alt={`hero`}
                width={267}
                height={474}
                className="object-contain flex-shrink-0 border-none"
              />
            </div>
          </div>
        </div>
      </section>
    </BreadcrumbsWrapper>
  );
};
