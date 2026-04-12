import React from "react";
import { cn } from "../utils/cn";

export const EditIcon = ({
  size = "44",
  onClick,
  className,
}: {
  size?: string;
  onClick?: () => void | Promise<void>;
  className?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={cn("cursor-pointer", className)}
    >
      <rect x="1.5" y="0.5" width="41" height="41" rx="8.5" stroke="#CBCBCD" />
      <g filter="url(#filter0_d_5512_12500)">
        <rect x="2" y="1" width="40" height="40" rx="8" fill="white" />
        <rect x="2.5" y="1.5" width="39" height="39" rx="7.5" stroke="white" />
        <path
          d="M15 12C13.89 12 13 12.89 13 14V28C13 28.5304 13.2107 29.0391 13.5858 29.4142C13.9609 29.7893 14.4696 30 15 30H29C29.5304 30 30.0391 29.7893 30.4142 29.4142C30.7893 29.0391 31 28.5304 31 28V21H29V28H15V14H22V12H15ZM27.78 13C27.6 13.0015 27.4278 13.0733 27.3 13.2L26.08 14.41L28.58 16.91L29.8 15.7C30.06 15.44 30.06 15 29.8 14.75L28.25 13.2C28.12 13.07 27.95 13 27.78 13ZM25.37 15.12L18 22.5V25H20.5L27.87 17.62L25.37 15.12Z"
          fill="#636369"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_5512_12500"
          x="0"
          y="0"
          width="44"
          height="44"
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
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5512_12500"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5512_12500"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
