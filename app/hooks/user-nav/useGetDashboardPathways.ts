"use client";
import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardPathways = () => {
  const { data: pathways } = useQuery({
    queryKey: ["pathways"],
    queryFn: async () => {
      const res = await api.get("/my-learning-dashboard/pathways");
      const data = res.data?.data;
      return data;
    },
  });
  //
  //
  return {
    pathways,
  };
};
