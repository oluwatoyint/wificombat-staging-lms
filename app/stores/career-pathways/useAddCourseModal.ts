import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

interface StoreProp {
  openModal: boolean;
  setOpenModal: (
    show: boolean
  ) => void | Promise<void> | Dispatch<SetStateAction<boolean>>;
}

export const useAddCourseModalStore = create<StoreProp>((set) => {
  return {
    openModal: false,

    setOpenModal: (show: boolean) => set({ openModal: show }),
  };
});
