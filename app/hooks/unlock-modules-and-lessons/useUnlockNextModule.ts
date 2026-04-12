import api from "@/app/utils/auth-interceptor";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useUnlockNextModule = () => {
  const queryClient = useQueryClient();
  const [nextModule, setNextModule] = useState<string>("");
  const unLockNextModule = async ({
    current_module_id,
  }: {
    current_module_id: string;
  }) => {
    try {
      const res = await api.get(
        `/my-learning-dashboard/lesson/next-module/unlock/${current_module_id}`
      );
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data?.message);
        setNextModule(res.data?.data?.next_module?.id);
      }
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return {
    unLockNextModule,
    nextModule,
  };
};
