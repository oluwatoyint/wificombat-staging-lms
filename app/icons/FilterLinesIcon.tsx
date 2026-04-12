import { cn } from "../utils/cn";

const FilterLinesIcon = ({
  size = "20",
  className,
  onClick,
}: {
  size?: string;
  className?: string;
  onClick?: () => void;
}) => {
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
      <path
        d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
        stroke="#344054"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FilterLinesIcon;
