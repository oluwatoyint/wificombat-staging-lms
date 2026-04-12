import React from "react";
import { cn } from "../utils/cn";

const AvatarIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("cursor-pointer", className)}
      onClick={onClick}
    >
      <g filter="url(#filter0_dd_6681_21035)">
        <rect
          x="6"
          y="4"
          width="44"
          height="44"
          rx="22"
          fill="white"
          shapeRendering="crispEdges"
        />
        <path
          d="M36.7992 35.9016V33.7016C36.7992 32.5346 36.3357 31.4155 35.5105 30.5903C34.6853 29.7651 33.5662 29.3016 32.3992 29.3016H23.5992C22.4323 29.3016 21.3131 29.7651 20.4879 30.5903C19.6628 31.4155 19.1992 32.5346 19.1992 33.7016V35.9016M32.3992 20.5016C32.3992 22.9316 30.4293 24.9016 27.9992 24.9016C25.5692 24.9016 23.5992 22.9316 23.5992 20.5016C23.5992 18.0715 25.5692 16.1016 27.9992 16.1016C30.4293 16.1016 32.3992 18.0715 32.3992 20.5016Z"
          stroke="#131314"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_6681_21035"
          x="0"
          y="0"
          width="60"
          height="60"
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
          <feOffset dx="2" dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.695833 0 0 0 0 0.695833 0 0 0 0 0.695833 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_6681_21035"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.694118 0 0 0 0 0.694118 0 0 0 0 0.694118 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_6681_21035"
            result="effect2_dropShadow_6681_21035"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_6681_21035"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default AvatarIcon;
