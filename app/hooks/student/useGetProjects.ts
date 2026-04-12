import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = () => {
  //this function get the portfolio projects
  const { data: projects, isLoading: loadingProjects } = useQuery({
    queryKey: ["get-portfolio-projects"],
    queryFn: async () => {
      const res = await api.get(`/portfolio-projects`);
      return res.data;
    },
    select: (data) => data,
    staleTime: 2500,
  });
  return {
    projects,
    loadingProjects,
  };
};
