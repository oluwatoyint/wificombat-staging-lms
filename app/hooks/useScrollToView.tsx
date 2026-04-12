"use client";

import { useCallback } from "react";

const useScrollToView = () => {
  const scrollToView = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return scrollToView;
};

export { useScrollToView };
