import { useCart } from "@/app/context/CartContext";
import { merriweather } from "@/app/fonts";
import useHandleBuy from "@/app/hooks/useHandleBuy";
import { Breadcrumbs } from "@/app/utils/breadcrumb";
import BreadcrumbsWrapper from "@/app/utils/breadcrumbsWrapper";
import Cart from "@/app/utils/cart";
import { formatPrice } from "@/app/utils/types-and-links";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";
import toast from "react-hot-toast";
import { Button } from "../base-components/Button";
import { useBuyCourse } from "@/app/hooks/course/useBuyCourse";
import { LoadSpinner } from "../loaders/LoadSpinner";
import { WalletIcon } from "@/app/icons";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { course_to_purchase } from "@/app/utils/vars";

type Props = {
  bgColor: string;
  image?: string;
  header: string;
  desc: string;
  level?: string;
  price?: string;
  buttonWhite?: boolean;
  coursePage?: boolean;
  widthStyle?: string;
  course?: any;
  type?: "course" | "module";
  modules?: any[];
  handleBuyNow?: MouseEventHandler<HTMLButtonElement>;
};

export const PathwayHero = ({
  handleBuyNow,
  bgColor,
  image,
  desc,
  header,
  buttonWhite,
  widthStyle,
  level,
  price,
  type,
  coursePage,
  course,
  modules,
}: Props) => {
  const router = useRouter();
  const { addItemToCart, isInCart, removeItemFromCart } = useCart();

  const handleAddToCart = (course: any) => {
    const cartItem = {
      id: course?.id,
      name: course?.title,
      subject: course?.title,
      level: course?.stage,
      type: type ?? "course",
      price: course?.amount,
      quantity: 1, // Initial quantity
      details: course, // Add any other details
    };

    // Check if the course is already in the cart
    const isCourseInCart = isInCart(course?.id);
    const courseModules = modules || []; // Assuming course.modules contains the module items
    const areModulesInCart = courseModules.some((module: any) =>
      isInCart(module.id)
    ); // Check if any module is in the cart

    // Logic to add to cart and display appropriate messages
    if (!isCourseInCart && !areModulesInCart) {
      addItemToCart(cartItem);
      toast.success(`${course?.title} has been added to your cart!`); // Success message
    } else if (isCourseInCart) {
      toast.error(
        `The course ${course?.title} is already in your cart. You cannot add modules.`
      ); // Course already in cart message
    } else if (areModulesInCart) {
      toast.error(`Some modules of ${course?.title} are already in your cart.`); // Modules in cart message
    } else {
      toast.error(`The course ${course?.title} is already in your cart.`); // Fallback message
    }
  };

  const handleRemoveFromCart = (courseId: any) => {
    removeItemFromCart(courseId);
  };

  const isCourseInCart = course && isInCart(course?.id);
  const { buyCourse, purchasing } = useBuyCourse();
  const role = getCookie("role");
  //
  //
  return (
    <BreadcrumbsWrapper>
      <section id="home" className="text-white">
        <div
          className={`relative isolate overflow-hidden pb-[2rem] lg:pb-[7rem] 
                md:py-[7rem] lg:py-[10rem] ${bgColor}`}
        >
          <div className="flex items-center gap-3 z-[15] absolute top-4 lg:top-7 right-5 lg:right-20">
            <Cart />
            <Link href="/wallet">
              <WalletIcon />
            </Link>
          </div>
          <div
            className="relative max-md:mt-[4rem] w-[93%] md:w-[80%] lg:w-[85%] mx-auto 
                max-lg:h-full h-[16rem] xl:h-[20rem] 2xl:h-[24rem] 
                flex flex-col md:flex-row md:items-center gap-10 md:gap-12"
          >
            <div className="w-full md:basis-[50%] relative">
              <Breadcrumbs homeLabel="Home" />
              <div className="mt-16 lg:mt-9 font-bold flex items-center gap-4">
                <h3 className="text-lg md:text-2xl capitalize text-black-200">
                  {level}
                </h3>

                {price && (
                  <h3 className="text-xl md:text-3xl">{formatPrice(price)}</h3>
                )}
              </div>

              <h1
                className={`${merriweather.className} 
                            text-2xl md:text-3xl 2xl:text-5xl 
                            max-md:leading-[45px] lg:leading-[47.2px] 2xl:leading-[78px] font-bold mt-4`}
              >
                {header}
              </h1>

              <p className="mt-2 font-semibold text-lg lg:text-xl lg:w-[85%]">
                {desc}
              </p>

              <div className="mt-10 lg:mt-16">
                {!role && !coursePage ? (
                  <Link
                    href={`/registration`}
                    className={`${
                      buttonWhite
                        ? "bg-white text-black-500"
                        : "bg-[#131314] text-white focus-visible:outline-black"
                    } 
                                        rounded-lg px-16 py-5 font-medium shadow-sm 
                                        hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                        focus-visible:outline-offset-2`}
                  >
                    Register
                  </Link>
                ) : (
                  <div className="flex items-center gap-6 h-[4rem]">
                    <Button
                      label={"Buy Now"}
                      onClick={() => {
                        localStorage.setItem(
                          course_to_purchase,
                          JSON.stringify([course])
                        );
                        localStorage.removeItem("cart");
                        router.push("/payment-summary");
                      }}
                      className="!flex-row-reverse !gap-3 !h-[52px]"
                    />

                    {isCourseInCart ? (
                      <div className="relative flex flex-col gap-2">
                        <Link href="/students/cart">
                          <button
                            className="bg-transparent border-black-50
                                                    border text-black-50 focus-visible:outline-black
                                                    rounded-lg px-8 md:px-12 py-3 font-medium shadow-sm 
                                                    hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                                    focus-visible:outline-offset-2 md:text-lg transition-colors duration-300"
                          >
                            View in Cart
                          </button>
                        </Link>
                        <button
                          onClick={() => handleRemoveFromCart(course?.id)}
                          className="absolute right-[-0.4rem] top-[-0.4rem] flex justify-center items-center"
                        >
                          <div
                            className="flex items-center justify-center w-4 h-4 bg-red-500 
                                                text-white rounded-full transition duration-300 hover:bg-red-600"
                          >
                            <span className="text-[10px] font-bold">X</span>
                          </div>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(course)}
                        className="bg-transparent border-black-500
                                            border text-black-500 focus-visible:outline-black
                                            rounded-lg px-8 md:px-12 py-3 font-medium shadow-sm 
                                            hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                            focus-visible:outline-offset-2 md:text-lg transition-colors duration-300"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div
              className={`w-full md:basis-[50%] 
                    ${
                      coursePage
                        ? "max-md:h-[340px] h-[300px] rounded-3xl"
                        : "max-md:h-[350px]"
                    }
                        flex items-center justify-center`}
            >
              {image && (
                <Image
                  src={image || "/course-page.jpeg"}
                  // src={image ?? ""}
                  alt={image ?? ""}
                  width={500}
                  height={500}
                  className={`object-contain border-none
                                ${widthStyle ?? "w-full h-full"}
                                ${
                                  coursePage &&
                                  "lg:w-[90%] h-[300px] rounded-3xl object-cover bg-blue-500"
                                }`}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </BreadcrumbsWrapper>
  );
};
