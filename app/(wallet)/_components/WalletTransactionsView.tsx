"use client";
import React from "react";
import { Button } from "@/app/components/base-components/Button";
import { useWallet } from "@/app/hooks/wallet/useWallet";
import { BackIcon } from "@/app/icons";
import api from "@/app/utils/auth-interceptor";
import { cn } from "@/app/utils/cn";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Truncate } from "@/app/utils/truncate";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";

export const WalletTransactionsView = () => {
  const router = useRouter();
  //
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const params = new URLSearchParams(searchParams);
  // this function gets the wallet transactions...
  const { data: walletTransactions, isLoading: loadingWalletTransactions } =
    useQuery({
      queryKey: ["get-wallet-transactions"],
      queryFn: async () => {
        const res = await api.get(`/wallet/transactions?page=${page}`);
        return res.data;
      },
    });
  //
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  //
  const transactions = useMemo(() => {
    if (search) {
      return walletTransactions?.data?.filter(
        (item: any) =>
          item?.id?.toLowerCase()?.includes(search) ||
          item?.reference?.toLowerCase()?.includes(search?.toLowerCase())
      );
    }
    if (selectedFilter) {
      return walletTransactions?.data?.filter((item: any) =>
        item?.transaction_type
          ?.toLowerCase()
          ?.includes(selectedFilter?.toLowerCase())
      );
    }
    return walletTransactions?.data;
  }, [walletTransactions?.data, search, selectedFilter]);
  //
  const handleNextPage = () => {
    if (walletTransactions?.next !== null) {
      params.set("page", walletTransactions?.next);
      router.push(`?${params}`);
    }
  };
  //
  const handlePreviousPage = () => {
    if (walletTransactions?.next !== null) {
      params.set("page", walletTransactions?.previous);
      router.push(`?${params}`);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <BackIcon onClick={() => router.back()} />
        <h3 className="font-semibold w-full text-center text-xl md:text-2xl lg:text-3xl">
          Transaction History
        </h3>
      </div>
      {/*  */}
      <div className="p-4 md:p-6 lg:p-8 rounded-lg border border-black-600">
        {/* wallet table filter header */}
        <div className="flex justify-between items-center flex-wrap gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="flex items-center gap-2">
              <span className="font-semibold text-lg md:text-xl">
                All Transaction
              </span>
              <span className="text-blue-500 cursor-pointer bg-blue-100 font-medium w-fit px-3 py-1 rounded-full text-xs">
                {walletTransactions && transactions?.length} Transactions
              </span>
            </h3>
            <p className="text-black-600 text-xs md:text-sm">
              See all your transactions , either debit or deposit
            </p>
          </div>
          {/*  */}
          <div className="flex items-center gap-3">
            <div className="border overflow-hidden pl-3 flex items-center gap-2 rounded-md">
              <BiSearch />
              <input
                type="text"
                placeholder="Search"
                className="outline-none py-2 pl-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* filter button here... */}
            <div className="relative">
              <div
                className="w-fit max-w-[150px] px-2 py-[6px] rounded-md border border-black-600 text-black-600 flex items-center gap-1 cursor-pointer"
                onClick={() => setShowFilters(!showFilters)}
              >
                <IoFilter />
                <p className="capitalize">{selectedFilter || "Filters"}</p>
              </div>
              <div
                style={{ height: showFilters ? "60px" : "0px" }}
                className={cn(
                  "absolute w-full transition-all duration-500 overflow-hidden top-[42px] left-0 flex flex-col gap-1 bg-white border-black-600 rounded-md",
                  showFilters ? "border" : "border-0"
                )}
              >
                <p
                  className="text-sm cursor-pointer text-black-600 px-2 py-1 hover:bg-gray-200"
                  onClick={() => {
                    if (selectedFilter === "deposit") {
                      setSelectedFilter("");
                    } else {
                      setSelectedFilter("deposit");
                    }
                    setShowFilters(false);
                  }}
                >
                  Deposit
                </p>
                <p
                  className="text-sm cursor-pointer text-black-600 px-2 py-1 hover:bg-gray-200"
                  onClick={() => {
                    if (selectedFilter === "debit") {
                      setSelectedFilter("");
                    } else {
                      setSelectedFilter("debit");
                    }
                    setShowFilters(false);
                  }}
                >
                  Debit
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* wallet table */}
        <div className="overflow-x-auto max-h-[450px] scroll-style mt-6">
          <table className="min-w-full">
            <thead>
              <tr className="whitespace-nowrap bg-gray-50 border-b">
                <th className="p-3 text-left">Transaction ID</th>
                <th className="p-3 text-left">Amount (₦)</th>
                <th className="p-3 text-left">Transaction Type</th>
                <th className="p-3 text-left">Date and Time</th>
                <th className="p-3 text-left">Reference Number</th>
                <th className="p-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {loadingWalletTransactions ? (
                <></>
              ) : walletTransactions && transactions?.length < 1 ? (
                <div className="text-center col-span-8">No Transactions</div>
              ) : (
                walletTransactions &&
                transactions?.map((transaction: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b text-xs md:text-sm text-black-600 whitespace-nowrap hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="p-3" title={transaction?.id}>
                      {Truncate(transaction?.id, 10)}
                    </td>
                    <td className="p-3">
                      {formatCurrency(String(transaction?.amount), "NGN")}
                    </td>
                    <td
                      className={`p-3 capitalize ${
                        transaction.transaction_type === "deposit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction?.transaction_type}
                    </td>
                    <td className="p-3">
                      {transaction &&
                        dayjs(transaction?.created_at).format(
                          "DD/MM/YYYY hh:mmA"
                        )}
                    </td>
                    <td className="p-3" title={transaction?.reference}>
                      {Truncate(transaction?.reference, 10)}
                    </td>
                    <td className="p-3" title={transaction?.description}>
                      {Truncate(transaction?.description, 10)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* footer and paginations here */}
        <div className="flex border-t border-t-black-600/50 mt-5 pt-3 justify-between items-center gap-4">
          <p className="text-black-600 text-sm">
            Page {walletTransactions?.current_page} of{" "}
            {walletTransactions?.total_pages}
          </p>
          <div className="flex items-center gap-3">
            <Button
              disabled={walletTransactions?.previous === null}
              className="!w-[75px] !h-[20px]"
              label="Previous"
              variant="outline"
              onClick={handlePreviousPage}
            />
            <Button
              disabled={walletTransactions?.next === null}
              className="!w-[75px] !h-[20px]"
              label="Next"
              variant="outline"
              onClick={handleNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
