import { create } from "zustand";

interface Prop {
  isFunding: boolean;

  setIsFunding: (funding: boolean) => void;
}

export const useWalletStore = create<Prop>((set) => {
  return {
    isFunding: false,

    setIsFunding: (funding: boolean) => set({ isFunding: funding }),
  };
});
