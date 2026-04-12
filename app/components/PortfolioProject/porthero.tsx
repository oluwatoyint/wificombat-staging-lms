import { merriweather } from "@/app/fonts";
import { WalletIcon } from "@/app/icons";
import { Breadcrumbs } from "@/app/utils/breadcrumb";
import BreadcrumbsWrapper from "@/app/utils/breadcrumbsWrapper";
import Cart from "@/app/utils/cart";
import Image from "next/image";
import Link from "next/link";

export const PortHero = () => {
  return (
    <BreadcrumbsWrapper>
      <section id="home" className="text-white">
        <div
          className={`relative isolate overflow-hidden pb-[7rem] md:py-[7rem] lg:py-[10rem] bg-black-500`}
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
              <p
                className={`${merriweather.className} 
                            text-5xl md:text-4xl lg:text-5xl 2xl:text-6xl 
                            max-md:leading-[45px] lg:leading-[67.2px] 2xl:leading-[78px] font-bold max-lg:pt-3`}
              >
                Portfolio & Projects
              </p>

              <p className="mt-5 font-semibold text-lg md:text-xl lg:w-[85%]">
                The portfolio and project feature is a powerful tool designed to
                help students actively track, document, and showcase their
                entire learning and career development journey
              </p>

              <div className="mt-10 lg:mt-16">
                <Link
                  href={`/assessment`}
                  className="px-12 py-5 font-bold bg-white shadow-sm text-black rounded-lg transition 
                            duration-300 hover:bg-opacity-90"
                >
                  Take Assesment
                </Link>
              </div>
            </div>

            <div className="w-full md:basis-[50%] flex items-center justify-center max-md:hidden">
              <Image
                src={`/Portfolio_page.png`}
                alt={`hero`}
                width={1000}
                height={1000}
                className="object-contain flex-shrink-0 border-none"
              />
            </div>
          </div>
        </div>
      </section>
    </BreadcrumbsWrapper>
  );
};
