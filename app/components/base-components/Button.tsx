import { cn } from "@/app/utils/cn";
import { ButtonHTMLAttributes } from "react";

interface BtnProp extends ButtonHTMLAttributes<HTMLElement> {
  label: string;
  icon?: JSX.Element;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void | Promise<void>;
  variant?: "primary" | "outline";
}
export const Button = ({
  label,
  className,
  disabled,
  icon,
  type,
  variant = "primary",
  onClick,
  ...rest
}: BtnProp) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...rest}
      className={cn(
        variant === "primary"
          ? `flex justify-center items-center cursor-pointer w-full min-[376px]:w-[170px] h-[44px] rounded-md disabled:bg-[#B1B1B4] active:bg-[#1c1c1e] bg-[#131314] p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1f1f21] disabled:cursor-not-allowed`
          : "flex justify-center items-center cursor-pointer w-full min-[376px]:w-[170px] h-[44px] rounded-md disabled:bg-[#B1B1B4] p-4 text-sm font-semibold leading-6 text-black border-[1.5px] border-black shadow-sm disabled:cursor-not-allowed",
        className
      )}
    >
      <span>{label}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};
