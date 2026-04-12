import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleQuote = ({ quoteId }: { quoteId: string }) => {
  const { data: quote, isLoading: loadingQuote } = useQuery({
    queryKey: ["get-single-quote", quoteId],
    queryFn: async () => {
      const res = await api.get(`/quotes/${quoteId}`);
      return res.data;
    },
  });
  return {
    quote,
    loadingQuote,
  };
};
