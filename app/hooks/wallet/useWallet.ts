import { useWalletStore } from "@/app/stores/wallet/wallet-store";
import api from "@/app/utils/auth-interceptor";
import { getSuccessUrl } from "@/app/utils/get-success-url";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export const useWallet = () => {
  const [funding, setFunding] = useState<boolean>(false);

  const { isFunding, setIsFunding } = useWalletStore();

  // this functtion gets the wallet info and balances...
  const { data: walletInfo, isLoading: loadingWalletInfo } = useQuery({
    queryKey: ["get-wallet-info"],
    queryFn: async () => {
      const res = await api.get("/wallet/info");
      return res.data;
    },
  });

  // this function gets the wallet transactions...
  const { data: walletTransactions, isLoading: loadingWalletTransactions } =
    useQuery({
      queryKey: ["get-wallet-transactions"],
      queryFn: async () => {
        const res = await api.get(`/wallet/transactions`);
        return res.data;
      },
    });

  // this function takes amount as argument and uses it to fund the users wallet
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

  return {
    walletInfo,
    loadingWalletInfo,
    walletTransactions,
    loadingWalletTransactions,
    funding,
    fundWallet,
  };
};
