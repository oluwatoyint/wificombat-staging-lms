import { item_key } from "@/app/utils/vars";
import { create } from "zustand";

interface Props {
  selectedItem: any | null;

  setSelectedItem: (item: any | null) => void;
}

export const useSelectedItemToView = create<Props>((set, get) => {
  return {
    selectedItem: null,

    setSelectedItem: (item) => {
      if (item) {
        localStorage.setItem(item_key, JSON.stringify(item)); // save to localStorage
      } else {
        localStorage.removeItem(item_key); // clear if null
      }
      set({ selectedItem: item });
    },
  };
});
