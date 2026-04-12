import api from "@/app/utils/auth-interceptor";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePaymentSummaryStore } from "../payment-summary/usePaymentSummaryStore";
import { isAxiosError } from "axios";

export const useBuyCourse = () => {
  const [purchasing, setPurchasing] = useState<boolean>(false);
  //
  const { setInsulfficientMsg, setShowCoursePurchaseSuccessfulModal } =
    usePaymentSummaryStore();
  //
  const buyCourse = async ({
    isDiscount,
    payload,
    discount_code,
  }: {
    isDiscount: boolean;
    payload: { courses: string[] };
    discount_code: string;
  }) => {
    setInsulfficientMsg("");
    try {
      setPurchasing(true);
      const res = await api.post(
        `/check-discount-code${isDiscount ? "?make_purchase=true" : ""}${
          isDiscount === true ? `&discount_code=${discount_code}` : ""
        }`,
        payload
      );
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data?.message);
        setShowCoursePurchaseSuccessfulModal(true);
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        if (
          error.response?.data?.message.toLowerCase().includes("insufficient")
        ) {
          setInsulfficientMsg(error.response?.data?.message);
        }
        toast.error(error.response?.data?.message);
      } else {
        toast.error("An error occurred!");
      }
    } finally {
      setPurchasing(false);
    }
  };
  //
  return {
    buyCourse,
    purchasing,
  };
};
