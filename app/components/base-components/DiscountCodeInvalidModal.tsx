import { usePaymentSummaryStore } from "@/app/hooks/payment-summary/usePaymentSummaryStore";
import { Mdiv } from "@/app/libs/framer-exports";
import React from "react";
import { Button } from "./Button";
import { WarningIcon } from "@/app/icons";

export const DiscountCodeInvalidModal = () => {
  const { setShowInvalidDiscountModal } = usePaymentSummaryStore();

  return (
    <Mdiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 top-0 right-0 bottom-0 left-0 bg-modal-bg flex flex-col justify-center items-center"
    >
      <div
        className="absolute top-0 right-0 bottom-0 left-0 z-10"
        onClick={() => setShowInvalidDiscountModal(false)}
      />

      <Mdiv
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="relative z-50 w-[94%] sm:w-[450px] rounded-2xl bg-white p-5"
      >
        <div className="overflow-auto max-h-[calc(100dvh-198px)] flex flex-col gap-4 items-center">
          <WarningIcon />
          <h3 className="text-center self-center text-lg sm:text-xl md:text-2xl font-bold text-black-500">
            Dicount Code Invalid
          </h3>
          <p className="text-center self-center text-base sm:text-lg font-semibold text-black-800">
            The discount code you have added is invalid, please input the
            correct code.
          </p>
          <Button
            label="Close"
            className="flex-1 !w-full"
            variant="outline"
            onClick={() => setShowInvalidDiscountModal(false)}
          />
        </div>
      </Mdiv>
    </Mdiv>
  );
};
