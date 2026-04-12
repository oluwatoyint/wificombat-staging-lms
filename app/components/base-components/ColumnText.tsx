import { cn } from "@/app/utils/cn";

export const ColumnText = ({
  className,
  title,
  detail,
}: {
  className?: string;
  title: string;
  detail: string | number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 justify-center items-center",
        className
      )}
    >
      <h3 className="text-[#4B4B4E] font-light text-xs">{title}</h3>
      <h2 className="font-semibold text-base text-black">{detail}</h2>
    </div>
  );
};
