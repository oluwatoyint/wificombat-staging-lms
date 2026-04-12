import { LoadSpinner } from "@/app/components/loaders/LoadSpinner";
import { useWallet } from "@/app/hooks/wallet/useWallet";
import { useWalletStore } from "@/app/stores/wallet/wallet-store";
import api from "@/app/utils/auth-interceptor";
import { cn } from "@/app/utils/cn";
import { getSuccessUrl } from "@/app/utils/get-success-url";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiPlusCircle } from "react-icons/bi";

export const InstaFundItem = ({
  item,
}: {
  item: { name: string; value: string };
}) => {
  const [funding, setFunding] = useState<boolean>(false);

  const { isFunding, setIsFunding } = useWalletStore();
  const { funding: customFunding } = useWallet();
  //
  const fundWallet = async (amount: string) => {
    try {
      setFunding(true);
      setIsFunding(true);
      const payload = {
        amount: Number(amount),
        success_url: getSuccessUrl(),
      };
      const res = await api.post("/wallet/fund", payload);
      const data = res.data.data?.data;
      if (res.status === 200) {
        toast.success(res.data?.message);
      }
      window.location.href = data?.link;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setFunding(false);
      setIsFunding(false);
    }
  };
  //
  return (
    <div
      className={cn(
        "p-5 rounded-lg flex justify-between items-center gap-4 border border-gray-500",
        isFunding === true && "pointer-events-none cursor-not-allowed"
      )}
    >
      <h3 className="font-semibold">Add {item?.name}</h3>
      <button
        className="text-gray-600 cursor-pointer disabled:cursor-not-allowed"
        disabled={funding || customFunding}
        onClick={() => fundWallet(item?.value)}
      >
        {funding ? (
          <LoadSpinner className="!border-purple-500 !border-b-transparent" />
        ) : (
          <BiPlusCircle size={24} />
        )}
      </button>
    </div>
  );
};
