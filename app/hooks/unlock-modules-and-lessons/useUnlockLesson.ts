import api from "@/app/utils/auth-interceptor";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export const useUnlockLesson = () => {
  const queryClient = useQueryClient();
  const unlockLesson = async ({
    current_lesson_id,
    module_id,
  }: {
    current_lesson_id: string;
    module_id: string;
  }) => {
    try {
      const res = await api.get(
        `/my-learning-dashboard/lesson/next-lesson/unlock/${current_lesson_id}`
      );
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data?.message);
        queryClient.invalidateQueries({
          queryKey: ["lessons", module_id],
        });
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
    unlockLesson,
  };
};
