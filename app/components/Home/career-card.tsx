"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../base-components/Button";
import { LoadSpinner } from "../loaders/LoadSpinner";
import { useBuyCourse } from "@/app/hooks/course/useBuyCourse";
import { course_to_purchase } from "@/app/utils/vars";
import { useRouter } from "next/navigation";

type Props = {
  pathway: string;
  desc: string;
  price?: string;
  linkTo?: string;
  subject?: string;
  item?: any;
  moduleSubject?: string;
  level?: string;
  bgColor?: string;
  textWhite?: boolean;
  pathways?: string[];
  image?: string;
  moduleImage?: string;
  pathwayImage?: string;
  curriculum?: boolean;
  type?: "course" | "module";
  viewCourse?: boolean;
  showBtns?: boolean;
  handleBuyNow?: (item: any, purchaseType?: string) => void;
};

const CareerCard = ({
  bgColor,
  desc,
  linkTo,
  level,
  subject,
  item,
  type,
  viewCourse,
  handleBuyNow,
  textWhite,
  pathways,
  image,
  pathwayImage,
  curriculum,
  price,
  moduleImage,
  moduleSubject,
  showBtns = true,
}: Props) => {
  const router = useRouter();
  const { addItemToCart, removeItemFromCart, isInCart, cart, setIsModalOpen } =
    useCart();

  const handleAddToCart = () => {
    if (item) {
      // Check if item is defined
      const { id, course_id, title, subject, level } = item; // Extract properties directly from item

      if (id) {
        // Ensure item.id is defined
        // Check if the main course is in the cart
        const isCourseInCart = isInCart(course_id); // Now check course_id directly
        const isModuleInCart = isInCart(id); // Check if the module is already in cart

        // Check how many modules of this course are already in the cart
        const modulesInCart = cart.filter(
          (cartItem: any) =>
            cartItem.course_id === course_id && cartItem.type === "module"
        ).length;
        const totalModules = item.totalModules || 0;

        if (isCourseInCart) {
          toast.error(
            `The main course is already in your cart. You cannot add this module.`
          );
          return;
        }

        // Handle adding modules or courses
        if (!isModuleInCart) {
          if (!isCourseInCart) {
            // If all modules are already in the cart, show a toast and prevent adding
            if (modulesInCart + 1 === totalModules) {
              setIsModalOpen(true);
              toast.error(
                "You are trying to add all modules. Please add the full course instead."
              );
              return; // Prevent further execution
            }

            // Show success message only if the main course is not in the cart
            toast.success(`${title || subject} has been added to your cart!`);
          }
          addItemToCart({
            id: id,
            course_id: course_id,
            name: title || subject,
            subject: subject,
            level: level,
            type: "module",
            price: item?.amount || price,
            details: item,
            quantity: 1,
          });
        }
      } else {
        toast.error("Item ID is undefined.");
      }
    } else {
      toast.error("Item is undefined.");
    }
  };

  const handleRemoveFromCart = () => {
    if (item && item.id) {
      removeItemFromCart(item.id);
    }
  };

  const handleClearModules = () => {
    // Logic to clear modules (remove all modules from the cart)
    cart.forEach((cartItem: any) => {
      if (cartItem.course_id === item.course_id && cartItem.type === "module") {
        removeItemFromCart(cartItem.id);
      }
    });
    setIsModalOpen(false); // Close the modal after clearing
  };

  // const finalLink =
  // linkTo ||
  // (coursePageLinkTo && { pathname: coursePageLinkTo.pathname, query: coursePageLinkTo.query });

  return (
    <div className="h-full">
      <div className="w-full px-3 py-4 flex flex-col h-full bg-[#fafafa] shadow-lg rounded-2xl cursor-pointer">
        <div
          className={`relative w-full rounded-2xl overflow-hidden 
                ${curriculum ? "h-[198px]" : "h-[198px]"} 
                     px-4 flex items-end
                    ${bgColor ?? "bg-blue-500"}
                    ${image && "flex items-center justify-center"}
                     `}
        >
          {pathwayImage && (
            <Link href={linkTo ?? ""} className="w-full h-full overflow-hidden">
              <Image
                src={pathwayImage}
                alt="pathway"
                width={900}
                height={600}
                className="w-full h-full object-contain"
              />
            </Link>
          )}

          {image && (
            <Link
              href={linkTo ?? ""}
              className="flex w-full h-full overflow-hidden items-center justify-center"
            >
              {/* <div className="absolute inset-0 bg-gray-50"> */}
              <Image
                src={image}
                alt="pathway"
                width={300}
                height={300}
                className="w-full h-full object-contain"
              />
              {/* </div> */}
            </Link>
          )}

          {moduleImage && (
            <div className="absolute inset-0 bg-gray-50">
              <Image
                src={moduleImage}
                alt="pathway"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* <div className="relative z-[7]">
                        {!pathwayImage &&
                        <h3 
                        className={`${textWhite ? "text-white": ""}  
                        my-3 text-lg md:text-2xl text-black-500 font-semibold`}>
                            {pathway} Pathway</h3>}
                    </div> */}
        </div>

        <div className="flex flex-col gap-2 pt-3">
          {subject && (
            <Link href={linkTo ?? ""}>
              <h3
                title={subject}
                className={`font-medium line-clamp-1 text-lg
                            ${
                              !curriculum ? "md:text-xl" : "font-semibold"
                            } text-black-800`}
              >
                {subject}
              </h3>
            </Link>
          )}

          {moduleSubject && (
            <h3
              className={`font-medium lg:h-[4rem]
                        ${
                          !curriculum ? "md:text-xl" : "font-semibold"
                        } text-black-800`}
            >
              {moduleSubject}
            </h3>
          )}

          <div
            className={`flex items-center gap-5 ${curriculum ? "" : "mt-4"}`}
          >
            {level && (
              <h3
                className={`capitalize font-medium md:text-lg 
                    ${
                      curriculum
                        ? "text-black-600 font-semibold "
                        : "text-black-800"
                    } `}
              >
                {level}
              </h3>
            )}

            {price && <h3 className={`font-bold text-black-500`}>{price}</h3>}
          </div>

          <p className={`text-black-800 line-clamp-2`}>{desc}</p>

          {curriculum && showBtns && (
            <div className="flex items-center justify-center gap-4">
              {viewCourse ? ( // Check for viewCourse flag
                <Link
                  href={linkTo ?? ""}
                  className="w-full border bg-black-500 text-white py-3
                                    font-semibold text-center transition ease-in-out duration-300 
                                    hover:bg-opacity-80 rounded-lg"
                >
                  View Course
                </Link>
              ) : isInCart(item?.id) ? (
                <div className="w-full flex items-center gap-4">
                  <div className="relative w-full basis-[50%] flex flex-col gap-2">
                    <Link
                      href={`/students/cart`}
                      className="w-full border border-black-500 text-black-500 py-2
                                            font-semibold text-center transition ease-in-out duration-300 
                                            hover:bg-opacity-80 rounded-lg"
                    >
                      View in Cart
                    </Link>
                    <button
                      onClick={handleRemoveFromCart}
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
                  <Button
                    label={"Buy Now"}
                    onClick={() => {
                      localStorage.setItem(
                        course_to_purchase,
                        JSON.stringify([item?.details])
                      );
                      localStorage.removeItem("cart");
                      router.push("/payment-summary");
                    }}
                    className="!flex-row-reverse !gap-3"
                  />
                </div>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="w-full basis-[50%] border border-black-500 py-2 text-black-500 
                                        font-semibold text-center transition ease-in-out duration-300 
                                        hover:bg-opacity-80 rounded-lg"
                  >
                    Add to Cart
                  </button>

                  <Button
                    label={"Buy Now"}
                    onClick={() => {
                      localStorage.setItem(
                        course_to_purchase,
                        JSON.stringify([item?.details])
                      );
                      localStorage.removeItem("cart");
                      router.push("/payment-summary");
                    }}
                    className="!flex-row-reverse !gap-3"
                  />
                </>
              )}
            </div>
          )}

          {pathways && (
            <div className="flex flex-wrap items-center gap-1">
              {pathways?.map((pathway, index) => (
                <div
                  key={index}
                  className="bg-black-50 py-1 px-2 rounded-lg border text-center flex items-center justify-center
                        text-black-600 text-xs capitalize"
                >
                  {pathway}
                </div>
              ))}
              <div
                className="bg-black-50 py-1 px-2 rounded-lg border 
                    text-center flex items-center justify-center text-black-600"
              >
                <FaPlus size={14} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
