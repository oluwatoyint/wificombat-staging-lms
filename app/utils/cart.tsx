"use client";

import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "@/app/context/CartContext"; // Import the cart context
import Link from "next/link";

type Props = {};

const Cart = (props: Props) => {
  const { cart } = useCart(); // Access the cart data

  // Calculate the total quantity of items in the cart
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative p-2 bg-white rounded-lg">
      <Link href="/students/cart">
        <div className="">
          <IoCartOutline size={26} className="text-black-500" />
          {cartQuantity > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-purple-800 text-white rounded-full 
              text-xs w-5 h-5 flex items-center justify-center"
            >
              {cartQuantity}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Cart;
