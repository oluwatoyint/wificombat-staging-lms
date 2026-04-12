import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export const useCareerPathways = ({ path_id }: { path_id?: string } = {}) => {
  const [unlockingCourse, setUnlockingCourse] = useState<boolean>(false);

  // this function handles course unlocking
  const unlockCourse = async (token: string) => {
    try {
      setUnlockingCourse(true);
      const res = await api.post("/my-learning-dashboard/unlock-course", {
        token: token,
      });
      if (res.status === 200) {
        toast.success(res.data?.message);
      }
    } catch (error: any) {
      toast.error(error.response.data?.message);
    } finally {
      setUnlockingCourse(false);
    }
  };

  // this function gets the courses I have based on the career pathway I am
  const { data: courses, isLoading: loadingCourses } = useQuery({
    queryKey: ["get-courses", path_id],
    queryFn: async () => {
      const res = await api.get(`/my-learning-dashboard/courses/${path_id}`);
      return res.data;
    },
    enabled: !!path_id,
  });

  //
  return {
    unlockCourse,
    unlockingCourse,
    courses,
    loadingCourses,
  };
};
