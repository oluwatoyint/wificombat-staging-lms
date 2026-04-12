import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetAllQuotes = () => {
  const { data: quotes, isLoading: loadingQuotes } = useQuery({
    queryKey: ["get-all-quotes"],
    queryFn: async () => {
      const res = await api.get("/quotes");
      return res.data?.data;
    },
  });
  return {
    quotes,
    loadingQuotes,
  };
};
