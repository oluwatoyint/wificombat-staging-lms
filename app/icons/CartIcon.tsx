import React from "react";
import { cn } from "../utils/cn";

const CartIcon = ({
  onClick,
  sum,
  fontSize = "12",
  className,
}: {
  onClick?: () => void;
  sum: number;
  fontSize?: string;
  className?: string;
}) => {
  return (
    <svg
      width="69"
      height="70"
      viewBox="0 0 69 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={cn("cursor-pointer", className)}
    >
      <g filter="url(#filter0_dd_6681_21033)">
        <rect
          x="6"
          y="14"
          width="44"
          height="44"
          rx="8"
          fill="white"
          shapeRendering="crispEdges"
        />
        <path
          d="M33 42C33.5304 42 34.0391 42.2107 34.4142 42.5858C34.7893 42.9609 35 43.4696 35 44C35 44.5304 34.7893 45.0391 34.4142 45.4142C34.0391 45.7893 33.5304 46 33 46C32.4696 46 31.9609 45.7893 31.5858 45.4142C31.2107 45.0391 31 44.5304 31 44C31 42.89 31.89 42 33 42ZM17 26H20.27L21.21 28H36C36.2652 28 36.5196 28.1054 36.7071 28.2929C36.8946 28.4804 37 28.7348 37 29C37 29.17 36.95 29.34 36.88 29.5L33.3 35.97C32.96 36.58 32.3 37 31.55 37H24.1L23.2 38.63L23.17 38.75C23.17 38.8163 23.1963 38.8799 23.2432 38.9268C23.2901 38.9737 23.3537 39 23.42 39H35V41H23C22.4696 41 21.9609 40.7893 21.5858 40.4142C21.2107 40.0391 21 39.5304 21 39C21 38.65 21.09 38.32 21.24 38.04L22.6 35.59L19 28H17V26ZM23 42C23.5304 42 24.0391 42.2107 24.4142 42.5858C24.7893 42.9609 25 43.4696 25 44C25 44.5304 24.7893 45.0391 24.4142 45.4142C24.0391 45.7893 23.5304 46 23 46C22.4696 46 21.9609 45.7893 21.5858 45.4142C21.2107 45.0391 21 44.5304 21 44C21 42.89 21.89 42 23 42ZM32 35L34.78 30H22.14L24.5 35H32Z"
          fill="#131314"
        />
        <rect x="35" y="4" width="24" height="24" rx="12" fill="#570066" />
        <text
          x="47"
          y="15"
          fill="white"
          fontSize={fontSize}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {sum}
        </text>
      </g>
      <defs>
        <filter
          id="filter0_dd_6681_21033"
          x="0"
          y="0"
          width="69"
          height="70"
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
            result="effect1_dropShadow_6681_21033"
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
            in2="effect1_dropShadow_6681_21033"
            result="effect2_dropShadow_6681_21033"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_6681_21033"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CartIcon;
