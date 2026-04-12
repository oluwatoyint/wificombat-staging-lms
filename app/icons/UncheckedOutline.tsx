import React from "react";
import { cn } from "../utils/cn";

export default function UncheckedOutline({
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
      <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" fill="white" />
      <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" stroke="#D0D5DD" />
    </svg>
  );
}
