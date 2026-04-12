"use client";

import { useEffect, useState } from "react";

const useNavbarVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [removeNavbar, setRemoveNavbar] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY <= 150) {
        setIsVisible(false);
        setRemoveNavbar(false);
      } else if (scrollY >= 300) {
        setIsVisible(true);
        setRemoveNavbar(true);
      } else {
        setIsVisible(true);
        setRemoveNavbar(false);
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return { isVisible, removeNavbar };
};

export { useNavbarVisibility };