"use client";
import { Button } from "@/app/components/base-components/Button";
import { SuccessModal } from "@/app/components/base-components/SuccessModal";
import { useWallet } from "@/app/hooks/wallet/useWallet";
import { AvatarIcon, BackIcon, CartIcon, InfoIcon2 } from "@/app/icons";
import { cn } from "@/app/utils/cn";
import { formatCurrency } from "@/app/utils/formatCurrency";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { BsPlus } from "react-icons/bs";
import { RiWallet2Line } from "react-icons/ri";
import { WalletPageModalView } from "../_components/WalletPageModalView";
import { useUserNav } from "@/app/hooks/user-nav/useUserNav";
import { signOut } from "@/app/utils/services";
import { useCart } from "@/app/context/CartContext";

const WalletPage = () => {
  const router = useRouter();
  //

  //
  const {
    walletInfo,
    loadingWalletInfo,
    walletTransactions,
    loadingWalletTransactions,
  } = useWallet();
  //
  const { showUserDropDown, setShowUserDropDown } = useUserNav();
  const { cartQuantity } = useCart();
  //
  return (
    <div>
      <div className="flex justify-between items-center gap-4 mb-6">
        <BackIcon onClick={() => router.back()} />
        <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
          Your Wificombat wallet
        </h3>
        <div className="flex items-center gap-2">
          <CartIcon sum={cartQuantity} className="-mt-3" />
          <InfoIcon2 onClick={() => router.push("/wallet/about-wallet")} />
          <div className="relative">
            <AvatarIcon
              onClick={() => setShowUserDropDown(!showUserDropDown)}
            />
            {/*  */}
            {showUserDropDown && (
              <div className="absolute overflow-hidden top-[50px] right-[8px] bg-white rounded-lg flex flex-col gap-2 border-gray-500 border">
                <Link
                  className="px-3 py-3 hover:bg-gray-300 cursor-pointer"
                  href={"/dashboard"}
                >
                  Dashboard
                </Link>
                <div
                  className="px-3 py-3 hover:bg-gray-300 cursor-pointer"
                  onClick={signOut}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* add funds and wallet info box */}
      <div className="rounded-3xl min-h-[200px] bg-[#FBE5FF] p-7 md:p-10 flex justify-between items-center mb-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <RiWallet2Line size={24} className="text-purple-500" />
            <p className="font-semibold text-gray-700 tracking-wide">
              Wallet Balance
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
        <Button
          label="Add Funds"
          icon={<BsPlus size={30} />}
          onClick={() => router.push("/wallet/add-funds")}
          className="flex-row-reverse"
        />
      </div>
      {/* recent transactions here.. */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-xl md:text-2xl font-semibold">
            Recent Transactions
          </h3>
          {walletTransactions?.data?.length > 10 && (
            <Link
              href="/wallet/transactions"
              className="text-lg md:text-xl text-purple-500 underline underline-offset-1"
            >
              See All
            </Link>
          )}
        </div>
        {loadingWalletTransactions ? (
          <div className="h-[250px] flex flex-col gap-8 overflow-auto scroll-style p-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-[40px] flex-shrink-0 rounded-lg bg-gray-200 p-3 animate-pulse"
              />
            ))}
          </div>
        ) : walletTransactions?.data?.length < 1 ? (
          <div className="text-xl flex justify-center items-center font-semibold text-gray-600 w-full text-center h-[250px]">
            No transactions yet
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:gap-6 mt-4">
            {walletTransactions?.data?.slice(0, 10)?.map((item: any) => {
              return (
                <div
                  key={item?.id}
                  className="p-4 md:p-6 rounded-xl flex justify-between items-center min-h-[100px] border"
                >
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg md:text-xl text-black-800 font-semibold">
                      {item?.transaction_type === "deposit"
                        ? "Added Funds"
                        : "Purchased Course"}
                    </h3>
                    <div className="flex flex-col gap-3">
                      <p>
                        {item && dayjs(item?.created_at).format("DD/MM/YYYY")}
                      </p>
                      <p
                        className={cn(
                          "w-fit px-3 py-1 text-xs rounded-full",
                          item?.status === "successful"
                            ? "text-green-600 bg-green-100"
                            : "text-red-500 bg-red-100"
                        )}
                      >
                        {item?.status}
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "text-lg md:text-xl font-semibold",
                      item?.transaction_type === "deposit"
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {item?.transaction_type === "deposit" ? "+" : "-"}
                    {item?.amount}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Suspense fallback={<div></div>}>
        <WalletPageModalView />
      </Suspense>
    </div>
  );
};

export default WalletPage;
