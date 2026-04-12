import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

interface Props {
  openModal: boolean;

  showModal2: boolean;

  wrongType: "video" | "audio";

  setOpenModal: (
    show: boolean
  ) => void | Promise<void> | Dispatch<SetStateAction<boolean>>;

  setShowModal2: (
    show: boolean
  ) => void | Promise<void> | Dispatch<SetStateAction<boolean>>;

  setWrongType: (type: "video" | "audio") => void;
}

export const useWhatWentWrong = create<Props>((set) => {
  return {
    openModal: false,

    showModal2: false,

    wrongType: "audio",

    setOpenModal: (show: boolean) => set({ openModal: show }),

    setShowModal2: (show: boolean) => set({ showModal2: show }),

    setWrongType: (type: "video" | "audio") => set({ wrongType: type }),
  };
});
