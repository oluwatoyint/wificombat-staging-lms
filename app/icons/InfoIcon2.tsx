import React from "react";
import { cn } from "../utils/cn";

const InfoIcon2 = ({
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
      <g filter="url(#filter0_dd_6681_21034)">
        <rect
          x="6"
          y="4"
          width="44"
          height="44"
          rx="8"
          fill="white"
          shapeRendering="crispEdges"
        />
        <path
          d="M27 23H29V21H27M28 34C23.59 34 20 30.41 20 26C20 21.59 23.59 18 28 18C32.41 18 36 21.59 36 26C36 30.41 32.41 34 28 34ZM28 16C26.6868 16 25.3864 16.2587 24.1732 16.7612C22.9599 17.2638 21.8575 18.0003 20.9289 18.9289C19.0536 20.8043 18 23.3478 18 26C18 28.6522 19.0536 31.1957 20.9289 33.0711C21.8575 33.9997 22.9599 34.7362 24.1732 35.2388C25.3864 35.7413 26.6868 36 28 36C30.6522 36 33.1957 34.9464 35.0711 33.0711C36.9464 31.1957 38 28.6522 38 26C38 24.6868 37.7413 23.3864 37.2388 22.1732C36.7362 20.9599 35.9997 19.8575 35.0711 18.9289C34.1425 18.0003 33.0401 17.2638 31.8268 16.7612C30.6136 16.2587 29.3132 16 28 16ZM27 31H29V25H27V31Z"
          fill="#131314"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_6681_21034"
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
            result="effect1_dropShadow_6681_21034"
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
            in2="effect1_dropShadow_6681_21034"
            result="effect2_dropShadow_6681_21034"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_6681_21034"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default InfoIcon2;
