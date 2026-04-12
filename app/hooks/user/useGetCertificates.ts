import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetCertificates = ({
  stage = "beginner",
}: {
  stage?: string;
} = {}) => {
  // this function gets all the certificates that I have so far
  const { data: myCertificates, isLoading: loadingMyCertificates } = useQuery({
    queryKey: ["get-my-certificates", stage],
    queryFn: async () => {
      const res = await api.get(
        `/my-learning-dashboard/my_cerificates${stage ? `?stage=${stage}` : ""}`
      );
      return res.data?.data;
    },
    // enabled: !!stage,
  });
  return {
    myCertificates,
    loadingMyCertificates,
  };
};
