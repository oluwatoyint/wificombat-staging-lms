import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetDashboardStats = () => {
  // this function gets the statistics of the dashboard overview page mostly
  const { data: dashboardStats, isLoading: loadingDashboardStats } = useQuery({
    queryKey: ["get-dashboard-stats"],
    queryFn: async () => {
      const res = await api.get("/my-learning-dashboard/dashbaord-stat");
      return res.data?.data;
    },
  });
  return {
    dashboardStats,
    loadingDashboardStats,
  };
};
