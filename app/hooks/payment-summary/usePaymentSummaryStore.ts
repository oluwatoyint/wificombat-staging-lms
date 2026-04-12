import { create } from "zustand";

interface payloadProp {
  courses: string[];
  discount_code: string;
}

interface paymentSummaryStoreProp {
  showDiscountModal: boolean;

  setShowDiscountModal: (show: boolean) => void;

  showInvalidDiscountModal: boolean;

  setShowInvalidDiscountModal: (show: boolean) => void;

  showDiscountAppliedModal: boolean;

  setShowDiscountAppliedModal: (show: boolean) => void;

  showCoursePurchaseSuccessfulModal: boolean;

  setShowCoursePurchaseSuccessfulModal: (show: boolean) => void;

  insulfficientMsg: string;

  setInsulfficientMsg: (insulfficientMsg: string) => void;

  isValidCode: boolean;

  setIsValidCode: (isValidCode: boolean) => void;
}

export const usePaymentSummaryStore = create<paymentSummaryStoreProp>(
  (set, get) => {
    return {
      showDiscountModal: false,

      setShowDiscountModal: (show: boolean) => set({ showDiscountModal: show }),

      showInvalidDiscountModal: false,

      setShowInvalidDiscountModal: (show: boolean) =>
        set({ showInvalidDiscountModal: show }),

      showDiscountAppliedModal: false,

      setShowDiscountAppliedModal: (show: boolean) =>
        set({ showDiscountAppliedModal: show }),

      showCoursePurchaseSuccessfulModal: false,

      setShowCoursePurchaseSuccessfulModal: (show: boolean) =>
        set({ showCoursePurchaseSuccessfulModal: show }),

      insulfficientMsg: "",

      setInsulfficientMsg: (insulfficientMsg: string) =>
        set({ insulfficientMsg: insulfficientMsg }),

      isValidCode: false,

      setIsValidCode: (isValidCode: boolean) =>
        set({ isValidCode: isValidCode }),
    };
  }
);
