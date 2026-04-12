import { usePaymentSummaryStore } from "@/app/hooks/payment-summary/usePaymentSummaryStore";
import { Mdiv } from "@/app/libs/framer-exports";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./Button";
import { PaymentSummaryCourseProp } from "@/app/types/payment-summary-course-props";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { LoadSpinner } from "../loaders/LoadSpinner";
import api from "@/app/utils/auth-interceptor";

export const DiscountCodeModal = ({
  courses,
  setDiscount,
}: {
  courses: PaymentSummaryCourseProp[];
  setDiscount: Dispatch<SetStateAction<number>>;
}) => {
  const {
    setShowDiscountModal,
    setShowInvalidDiscountModal,
    setIsValidCode,
    setInsulfficientMsg,
  } = usePaymentSummaryStore();

  const [applying, setApplying] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [codeErr, setCodeErr] = useState<string>("");

  const handleApplyCode = async () => {
    if (!code) {
      setCodeErr("Please enter a discount code");
      return;
    }
    try {
      setApplying(true);
      const payload = {
        courses: courses?.map((course) => course?.id),
        discount_code: code,
      };
      const payload2 = {
        courses: courses?.map((course) => course?.id),
      };
      const res = await api.post(
        `/check-discount-code?make_purchase=false&discount_code=${code}`,
        payload2
      );
      if (res.status === 200 || res.status === 201) {
        toast.success("Discount code applied");
        localStorage.setItem("purchase-payload", JSON.stringify(payload));
        setDiscount(res.data?.data?.total_discount_amount);
        setIsValidCode(true);
        setShowDiscountModal(false);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (
          error.response?.data?.message?.toLowerCase()?.includes("invalid") ||
          error.response?.data?.message
            ?.toLowerCase()
            ?.includes("discount code is not valid")
        ) {
          setShowDiscountModal(false);
          setShowInvalidDiscountModal(true);
        } else if (
          error.response?.data?.message
            .toLowerCase()
            .includes("insufficient") ||
          error.response?.data?.message.toLowerCase().includes("sufficient")
        ) {
          setShowDiscountModal(false);
          setInsulfficientMsg(error.response?.data?.message);
        }
        toast.error(error.response?.data?.message);
      } else {
        toast.error("An error occurred!");
      }
    } finally {
      setApplying(false);
    }
  };

  return (
    <Mdiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 top-0 right-0 bottom-0 left-0 bg-modal-bg flex flex-col justify-center items-center"
    >
      <div
        className="absolute top-0 right-0 bottom-0 left-0 z-10"
        onClick={() => setShowDiscountModal(false)}
      />

      <Mdiv
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="relative z-50 w-[94%] sm:w-[450px] rounded-2xl bg-white p-5"
      >
        <div className="overflow-auto max-h-[calc(100dvh-198px)] flex flex-col gap-5">
          <h3 className="text-center self-center text-lg sm:text-xl md:text-2xl font-bold text-black-500">
            Dicount Code
          </h3>
          <p className="text-center self-center text-base sm:text-lg font-semibold text-black-800">
            Please input the discount code that applies to the course{" "}
          </p>

          <label htmlFor="code" className="flex flex-col gap-1">
            <span className="font-semibold">Input dicount code</span>
            <input
              type="text"
              placeholder="Enter discount code"
              className="w-full border outline-none py-2 pl-2 rounded-md"
              onChange={(e) => {
                setCodeErr("");
                setCode(e.target.value.trim());
              }}
            />
            {codeErr && (
              <small className="text-xs text-red-500">{codeErr}</small>
            )}
          </label>
          <div className="mt-5 w-full flex items-center gap-4 flex-wrap">
            <Button
              label="Cancel"
              disabled={applying}
              className="flex-1 !w-full"
              variant="outline"
              onClick={() => setShowDiscountModal(false)}
            />
            <Button
              label={applying ? "Applying" : "Appy Code"}
              disabled={applying}
              className="!flex-row-reverse flex-1 w-full"
              onClick={handleApplyCode}
              icon={
                applying ? (
                  <LoadSpinner className="!w-[20px] !h-[20px] !mt-1" />
                ) : (
                  <></>
                )
              }
            />
          </div>
        </div>
      </Mdiv>
    </Mdiv>
  );
};
