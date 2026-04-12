"use client";
import { Button } from "@/app/components/base-components/Button";
import { useWallet } from "@/app/hooks/wallet/useWallet";
import { BackIcon } from "@/app/icons";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { InstaFundItem } from "../../_components/InstaFundItem";
import { CustomFund } from "../../_components/CustomFund";

const WalletAddFundsPage = () => {
  const router = useRouter();
  //
  const { walletInfo, loadingWalletInfo } = useWallet();
  const [showCustomFund, setShowCustomFund] = useState<boolean>(false);
  //
  //
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <BackIcon onClick={() => router.back()} />
        <h3 className="font-semibold w-full text-center text-xl md:text-2xl lg:text-3xl">
          Add Funds to Wallet
        </h3>
      </div>
      {/* add funds and wallet info box */}
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
      </div>
      {/* instant funds list */}
      <div className="flex flex-col gap-4 mt-5">
        {instaFundsList?.map((item, index) => (
          <InstaFundItem key={index} item={item} />
        ))}
        <div className="relative h-[2px] my-5 w-full bg-gray-300">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold bg-white p-2">
            Or
          </p>
        </div>
        {!showCustomFund ? (
          <Button
            label="Enter Custom Amount"
            className="!w-full"
            onClick={() => setShowCustomFund(true)}
          />
        ) : (
          <CustomFund
            showCustomFund={showCustomFund}
            setShowCustomFund={setShowCustomFund}
          />
        )}
      </div>
    </div>
  );
};

export default WalletAddFundsPage;

const instaFundsList = [
  {
    name: "₦10,000",
    value: "10000",
  },
  {
    name: "₦20,000",
    value: "20000",
  },
  {
    name: "₦50,000",
    value: "50000",
  },
];
