"use client";
import { Button } from "@/app/components/base-components/Button";
import { WifiCombatLogo } from "@/app/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const WalletNav1 = () => {
  const pathname = usePathname();
  return (
    <nav className="max-w-[1440px] mx-auto py-3 px-4 md:px-6 lg:px-10 flex items-center justify-between gap-4 mb-5">
      <Link href="/">
        <WifiCombatLogo />
      </Link>
      {pathname === "/wallet" && (
        <Link href="/dashboard">
          <Button variant="outline" label="Go to Dashboard" />
        </Link>
      )}
    </nav>
  );
};
