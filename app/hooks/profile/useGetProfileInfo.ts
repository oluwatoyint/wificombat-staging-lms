import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export const useGetProfileInfo = () => {
  const user_id = getCookie("user_id");

  // this functtion gets the user profile details
  const { data: profileInfo, isLoading: loadingProfileInfo } = useQuery({
    queryKey: ["get-user-profile-details", user_id],
    queryFn: async () => {
      const res = await api.get(`/profile/user/${user_id}`);
      return res.data;
    },
    select: (data) => data?.data,
    staleTime: 2500,
    enabled: !!user_id,
  });
  return {
    profileInfo,
    loadingProfileInfo,
  };
};
