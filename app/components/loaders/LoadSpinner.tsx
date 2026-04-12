import { cn } from "@/app/utils/cn";

export const LoadSpinner = ({ className }: { className?: string }) => {
  return <div className={cn("load-spinner-2", className)} />;
};
