import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

interface Props {
  openModal: boolean;

  setOpenModal: (
    show: boolean
  ) => void | Promise<void> | Dispatch<SetStateAction<boolean>>;
}

export const useRateCourseModal = create<Props>((set) => {
  return {
    openModal: false,

    setOpenModal: (show: boolean) => set({ openModal: show }),
  };
});
