import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentProgress = () => {
  //this function get the portfolio student progress summary
  const { data: studentProgress, isLoading: loadingStudentProgress } = useQuery(
    {
      queryKey: ["get-student-progresss-summary"],
      queryFn: async () => {
        const res = await api.get(`/portfolio/student-progress`);
        return res.data;
      },
      select: (data) => data?.data,
      staleTime: 2500,
    }
  );
  return {
    studentProgress,
    loadingStudentProgress,
  };
};
