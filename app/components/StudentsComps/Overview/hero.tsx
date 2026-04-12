import { merriweather } from "@/app/fonts";
import { WalletIcon } from "@/app/icons";
import { Breadcrumbs } from "@/app/utils/breadcrumb";
import BreadcrumbsWrapper from "@/app/utils/breadcrumbsWrapper";
import Cart from "@/app/utils/cart";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { boolean } from "zod";

type Props = {
  bgColor?: "blue" | "purple" | "black";
  headerOne: string;
  headerTwo: string;
  text: string;
  whiteButton?: boolean;
  btnColor?: boolean;
  textColor?: boolean;
};

export const StudentsHero = ({
  bgColor,
  headerOne,
  headerTwo,
  text,
  btnColor,
  textColor,
}: Props) => {
  const cookiesStore = cookies();
  const role = cookiesStore.get("role")?.value;
  return (
    <BreadcrumbsWrapper>
      <section id="home" className="text-white">
        <div
          className={`relative isolate overflow-hidden pb-[2rem] lg:pb-[7rem] md:py-[7rem] lg:py-[10rem] 
                 ${
                   bgColor === "blue"
                     ? "bg-blue-500"
                     : bgColor === "purple"
                     ? "bg-purple-500"
                     : "bg-black"
                 }`}
        >
          <div className="flex items-center gap-3 z-[15] absolute top-4 lg:top-7 right-5 lg:right-20">
            <Cart />
            <Link href="/wallet">
              <WalletIcon />
            </Link>
          </div>
          <div
            className={`relative max-lg:mt-[5rem] w-[93%] md:w-[80%] lg:w-[85%] mx-auto 
                max-lg:h-full h-[16rem] xl:h-[20rem] 2xl:h-[24rem] 
                    flex flex-col md:flex-row md:items-center md:justify-between gap-10`}
          >
            <div className="w-full md:basis-[50%] relative">
              <Breadcrumbs homeLabel="Home" />
              <p
                className={`${merriweather.className} 
                            text-5xl md:text-4xl lg:text-5xl 2xl:text-6xl 
                            max-md:leading-[45px] lg:leading-[67.2px] 2xl:leading-[78px] font-bold max-lg:pt-8`}
              >
                {headerOne}
              </p>
              {/* <p>{headerOne}</p> */}

              <p className="mt-5 font-semibold text-lg md:text-xl lg:w-[85%]">
                {headerTwo}
              </p>

              <div className="mt-10 lg:mt-16">
                <>
                  {!role && (
                    <Link
                      href={`/registration`}
                      className={`px-16 py-5 font-medium shadow-sm rounded-lg 
                            transition duration-300 hover:bg-opacity-90  ${
                              btnColor ? "bg-black-500" : "bg-white"
                            } ${textColor ? "text-white" : "text-black"}`}
                    >
                      Register
                    </Link>
                  )}
                </>
              </div>
            </div>

            <div
              className="w-full md:basis-[50%] max-md:h-[350px]
                        max-md:flex max-md:items-center max-md:justify-center"
            >
              {text != undefined && (
                <Image
                  src={`/${text}`}
                  alt={text}
                  width={500}
                  height={500}
                  className="w-full h-[570px] object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </BreadcrumbsWrapper>
  );
};
