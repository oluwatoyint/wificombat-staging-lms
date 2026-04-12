import React from "react";
import { cn } from "../utils/cn";

const BackIcon = ({
  onClick,
  className,
  size = "52",
}: {
  onClick?: () => void | Promise<void>;
  className?: string;
  size?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={cn("cursor-pointer", className)}
    >
      <g filter="url(#filter0_dd_5512_12777)">
        <rect x="6" y="6" width="40" height="40" rx="8" fill="white" />
      </g>
      <path
        d="M29.41 30.58L24.83 26L29.41 21.41L28 20L22 26L28 32L29.41 30.58Z"
        fill="#131314"
      />
      <defs>
        <filter
          id="filter0_dd_5512_12777"
          x="0"
          y="0"
          width="52"
          height="52"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.372549 0 0 0 0 0.372549 0 0 0 0 0.372549 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5512_12777"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-2" dy="-2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.370833 0 0 0 0 0.370833 0 0 0 0 0.370833 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_5512_12777"
            result="effect2_dropShadow_5512_12777"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_5512_12777"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default BackIcon;
