"use client";
import { Button } from "@/app/components/base-components/Button";
import { CoursePurchaseSuccessfulModal } from "@/app/components/base-components/CoursePurchaseSuccessfulModal";
import { DiscountCodeInvalidModal } from "@/app/components/base-components/DiscountCodeInvalidModal";
import { DiscountCodeModal } from "@/app/components/base-components/DiscountCodeModal";
import { LoadSpinner } from "@/app/components/loaders/LoadSpinner";
import { useBuyCourse } from "@/app/hooks/course/useBuyCourse";
import { usePaymentSummaryStore } from "@/app/hooks/payment-summary/usePaymentSummaryStore";
import { useWallet } from "@/app/hooks/wallet/useWallet";
import { BackIcon } from "@/app/icons";
import { Mshow } from "@/app/libs/framer-exports";
import { PaymentSummaryCourseProp } from "@/app/types/payment-summary-course-props";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { course_to_purchase } from "@/app/utils/vars";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";

const PaymentSummaryPage = () => {
  const router = useRouter();

  const {
    showDiscountModal,
    setShowDiscountModal,
    showInvalidDiscountModal,
    isValidCode,
    setIsValidCode,
    insulfficientMsg,
    showCoursePurchaseSuccessfulModal,
  } = usePaymentSummaryStore();

  const { walletInfo, loadingWalletInfo } = useWallet();
  const { buyCourse, purchasing } = useBuyCourse();
  //
  const [courses, setCourses] = useState<PaymentSummaryCourseProp[]>([]);

  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    if (window === undefined) return;
    const items = localStorage.getItem(course_to_purchase);
    setCourses(JSON.parse(items || ""));
  }, []);
  //
  useEffect(() => {
    return () => {
      localStorage.removeItem("purchase-payload");
      setIsValidCode(false);
    };
  }, []);
  //
  const totalAmount = courses?.reduce((acc, course) => {
    return acc + parseFloat(course?.amount);
  }, 0);
  //
  return (
    <Fragment>
      <div>
        <div className="w-full flex items-center gap-4 mb-6">
          <BackIcon onClick={() => router.back()} />
          <h2 className="flex-1 justify-self-center text-center font-bold text-2xl sm:text-3xl">
            Payment Description
          </h2>
        </div>

        <div className="rounded-3xl min-h-[200px] bg-[#FBE5FF] p-7 md:p-10 flex justify-between items-center mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-700 tracking-wide">
                Current Balance
              </p>
            </div>
            {loadingWalletInfo ? (
              <div className="h-[34px] bg-gray-300 w-[120px] rounded-md animate-pulse" />
            ) : (
              <h2 className="text-purple-500 font-bold text-xl md:text-2xl lg:text-3xl">
                {formatCurrency(String(walletInfo?.data?.balance), "NGN")}
              </h2>
            )}
          </div>
          {insulfficientMsg && (
            <Button
              label="Add Funds"
              icon={<BsPlus size={30} />}
              onClick={() => router.push("/wallet/add-funds")}
              className="flex-row-reverse"
            />
          )}
        </div>
        {insulfficientMsg && (
          <p className="text-sm text-red-500 mb-8">{insulfficientMsg}</p>
        )}

        <div className="flex flex-col gap-2 mb-8">
          <h3 className="font-semibold text-gray-700 text-xl sm:text-2xl">
            Order Summary
          </h3>
          <div className="my-3 flex flex-col gap-6">
            {courses?.length < 1 ? (
              <div>
                There&apos;s currently no item in the purchase list for checkout
              </div>
            ) : (
              courses?.map((course: PaymentSummaryCourseProp) => (
                <div
                  key={course?.id}
                  className="flex justify-between items-center gap-4 p-5 rounded-2xl border flex-wrap"
                >
                  <div className="flex flex-col gap-1">
                    <h4 className="font-semibold text-black-500 text-lg">
                      {course?.title}
                    </h4>
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-4">
                        <h5 className="font-medium text-black-700">
                          Instructor:
                        </h5>
                        <p className="font-normal text-sm text-black-600">
                          {course?.instructor?.first_name || "N/A"}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <h5 className="font-medium text-black-700">Level:</h5>
                        <p className="font-normal text-sm text-black-600">
                          {course?.stage}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-black-500 text-base sm:text-lg md:text-xl">
                    {formatCurrency(String(course?.amount), "NGN")}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 my-4">
          <div className="flex justify-between items-center gap-4">
            <h3 className="font-semibold text-black-800 text-base">Discount</h3>
            <h4 className="text-lg sm:text-xl font-bold text-black-700">
              {formatCurrency(String(discount), "NGN")}
            </h4>
          </div>
          <div className="flex justify-between items-center gap-4">
            <h3 className="font-semibold text-black-800 text-base">Total</h3>
            <div className="text-lg sm:text-xl font-bold text-black-700">
              {formatCurrency(String(totalAmount), "NGN")}
            </div>
          </div>
        </div>

        <div className="w-full flex items-center gap-4 mt-12">
          {!isValidCode && (
            <Button
              label="Add Discount Code"
              className="flex-1 w-full"
              variant="outline"
              onClick={() => setShowDiscountModal(true)}
            />
          )}
          <Button
            label={purchasing ? "Purchasing" : "Pay Now"}
            onClick={() => {
              const data = localStorage.getItem("purchase-payload");
              const payload = data ? JSON.parse(data) : null;
              if (!isValidCode && !payload) {
                buyCourse({
                  discount_code: "",
                  isDiscount: false,
                  payload: {
                    courses: courses?.map(
                      (course: PaymentSummaryCourseProp) => course?.id
                    ),
                  },
                });
              } else if (payload) {
                buyCourse({
                  discount_code: payload?.discount_code,
                  isDiscount: true,
                  payload: { courses: payload?.courses },
                });
              }
            }}
            disabled={purchasing}
            className="!flex-row-reverse flex-1 w-full"
            icon={
              purchasing ? (
                <LoadSpinner className="!w-[20px] !h-[20px] !mt-1" />
              ) : (
                <></>
              )
            }
          />
        </div>
      </div>
      <Mshow>
        {showDiscountModal && (
          <DiscountCodeModal setDiscount={setDiscount} courses={courses} />
        )}
        {showInvalidDiscountModal && <DiscountCodeInvalidModal />}
        {showCoursePurchaseSuccessfulModal && <CoursePurchaseSuccessfulModal />}
      </Mshow>
    </Fragment>
  );
};

export default PaymentSummaryPage;
