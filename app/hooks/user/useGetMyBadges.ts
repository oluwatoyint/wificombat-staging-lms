import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetMyBadges = () => {
  const { data: myBadges, isLoading: loadingMyBadges } = useQuery({
    queryKey: ["get-my-badges"],
    queryFn: async () => {
      const res = await api.get("/my-learning-dashboard/my_badges");
      return res.data?.data;
    },
  });
  return {
    myBadges,
    loadingMyBadges,
  };
};
