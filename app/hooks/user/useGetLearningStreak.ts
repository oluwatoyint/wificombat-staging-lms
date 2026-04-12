import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetLearningStreak = ({
  pathway_id,
  period = "this_week",
}: {
  pathway_id?: string;
  period?: string;
} = {}) => {
  // this function gets the learning streak of a user
  const { data: learningStreak, isLoading: loadingLearningStreak } = useQuery({
    queryKey: ["get-learning-streak", pathway_id, period],
    queryFn: async () => {
      const res = await api.get(
        `/my-learning-dashboard/user-course-streak/${pathway_id}?period=${period}`
      );
      return res.data;
    },
    enabled: !!pathway_id,
  });
  return {
    learningStreak,
    loadingLearningStreak,
  };
};
