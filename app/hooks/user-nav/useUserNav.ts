"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useUserNav = () => {
  //
  const router = useRouter();
  const isLogged = getCookie("role");
  //
  const [showUserDropDown, setShowUserDropDown] = useState<boolean>(false);
  //
  const handleNavigation = (href: string) => {
    router.push(href);
  };
  //

  return {
    isLogged,
    showUserDropDown,
    setShowUserDropDown,
    handleNavigation,
  };
};
