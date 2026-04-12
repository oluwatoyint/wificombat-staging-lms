"use client";
import { BackIcon } from "@/app/icons";
import { useRouter } from "next/navigation";
import React from "react";

const AboutWalletPage = () => {
  //
  const router = useRouter();
  //
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <BackIcon onClick={() => router.back()} />
        <h3 className="font-semibold w-full text-center text-xl md:text-2xl lg:text-3xl">
          About Wallet
        </h3>
      </div>
      {/*  */}
      <div className="border flex flex-col gap-5 border-[#E5E5E6] rounded-lg p-5 md:p-8">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg md:text-xl">How it works</h3>
          <p className="text-sm md:text-base text-black-600">
            Your EduTech wallet allows you to save money for courses over time.
            Add funds whenever you want and use them to purchase courses when
            you&apos;re ready.
          </p>
        </div>
        {/*  */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg md:text-xl">Features</h3>
          <ul className="list-disc list-inside text-black-600">
            <li>Secure fund storage</li>
            <li>Card payment methods</li>
            <li>Instant course access upon</li>
            <li>purchase Detailed transaction history</li>
          </ul>
        </div>
        {/*  */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg md:text-xl">
            Terms and Conditions
          </h3>
          <ul className="list-disc list-inside text-black-600">
            <li>Funds added cannot be withdrawn</li>
            <li>All wallet transactions are final</li>
            <li>Funds can only be used for course purchases</li>
            <li>Minimum add amount: #1,000</li>
            <li>Maximum wallet balance: #200,000</li>
          </ul>
        </div>
        {/*  */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg md:text-xl">Security</h3>
          <p className="text-black-600">
            Your wallet is protected by bank-level security. All transactions
            are encrypted and monitored 24/7 for suspicious activity.
          </p>
        </div>
        {/*  */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg md:text-xl">Support</h3>
          <p className="text-black-600">
            For any issues with your wallet, please contact our support team:
            support@edutech.com
          </p>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default AboutWalletPage;
