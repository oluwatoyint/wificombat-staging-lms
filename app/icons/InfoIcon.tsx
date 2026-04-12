import React from "react";

const InfoIcon = ({ color = "#D0D5DD" }: { color?: string }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <ellipse cx="11.8372" cy="12.0664" rx="11.4368" ry="12" fill={color} />
      <rect
        x="9.93066"
        y="9.3999"
        width="3.81225"
        height="10.6666"
        rx="1.90612"
        fill="white"
      />
      <rect
        x="9.93066"
        y="4.06689"
        width="3.81225"
        height="3.99999"
        rx="1.90612"
        fill="white"
      />
    </svg>
  );
};
export default InfoIcon;
