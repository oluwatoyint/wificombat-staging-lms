import { useQuery } from "@tanstack/react-query";
import api from "../utils/auth-interceptor";

export const useGetAllPathways = () => {
  const { data: pathways, isLoading: loadingPathways } = useQuery({
    queryKey: ["get-all-pathways"],
    queryFn: async () => {
      const res = await api.get(`/course-pathways/`);
      return res.data;
    },
  });

  //
  return {
    pathways,
    loadingPathways,
  };
};
