import { Button } from "@/app/components/base-components/Button";
import { LoadSpinner } from "@/app/components/loaders/LoadSpinner";
import { useWallet } from "@/app/hooks/wallet/useWallet";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export const CustomFund = ({
  setShowCustomFund,
  showCustomFund,
}: {
  setShowCustomFund: Dispatch<SetStateAction<boolean>>;
  showCustomFund: boolean;
}) => {
  const { funding, fundWallet } = useWallet();
  //
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: 0,
    },
  });
  const amount = watch("amount");

  useEffect(() => {
    const custom_fund_btns = document.querySelector(".custom-fund-btns");
    if (custom_fund_btns && showCustomFund) {
      custom_fund_btns.scrollIntoView({ behavior: "smooth" });
    }
  }, [showCustomFund]);

  const onSubmit = async (data: { amount: number }) => {
    await fundWallet(String(data?.amount));
  };
  //
  return (
    <div className="flex flex-col gap-4 mt-5">
      <div className="bg-[#F2F2F3] min-h-[160px] rounded-xl p-6">
        <label htmlFor="amount" className="flex flex-col gap-1">
          <span className="font-semibold text-base">Enter Amount</span>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: true,
              validate: (value) => value > 9 || "Amount must be up to 10",
            }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="amount"
                value={amount === 0 ? "" : amount}
                placeholder="₦0"
                className="py-3 pl-4 outline-none border border-gray-500 rounded-md text-base"
              />
            )}
          />
          <small className="text-red-400">{errors.amount?.message}</small>
        </label>
      </div>
      <div className="custom-fund-btns flex items-center gap-3">
        <Button
          onClick={() => setShowCustomFund(false)}
          disabled={funding}
          label="Cancel"
          className="!w-full !gap-3"
          variant="outline"
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={amount <= 0 || funding}
          label={funding ? "Funding" : "Add Funds"}
          className="!w-full !flex-row-reverse !gap-3"
          icon={
            funding ? (
              <LoadSpinner className="!w-[20px] !h-[20px] !mt-1" />
            ) : (
              <></>
            )
          }
        />
      </div>
    </div>
  );
};
