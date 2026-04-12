import Link from "next/link";
import React, { ReactNode } from "react";

export const CardTagWrap = ({
  is_unlocked,
  href,
  children,
}: {
  is_unlocked: boolean;
  href: string;
  children: ReactNode;
}) => {
  switch (is_unlocked) {
    case true:
      return (
        <Link
          href={href}
          className="w-[296px] flex-shrink-0 whitespace-normal flex flex-col gap-2"
        >
          {children}
        </Link>
      );
    case false:
      return (
        <div className="cursor-not-allowed w-[296px] flex-shrink-0 whitespace-normal flex flex-col gap-2">
          {children}
        </div>
      );
    default:
      return (
        <div className="cursor-not-allowed w-[296px] flex-shrink-0 whitespace-normal flex flex-col gap-2">
          {children}
        </div>
      );
  }
};
