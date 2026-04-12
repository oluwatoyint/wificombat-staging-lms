import React from "react";
import { cn } from "../utils/cn";

export default function CheckOutline({
  size = "20",
  className,
  onClick,
}: {
  size?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("cursor-pointer", className)}
      onClick={onClick}
    >
      <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" fill="#F2F2F3" />
      <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" stroke="#131314" />
      <path
        d="M14.6663 6.5L8.24967 12.9167L5.33301 10"
        stroke="#131314"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
