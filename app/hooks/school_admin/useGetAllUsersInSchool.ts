import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsersInSchool = ({
  role = "student",
  page = "1",
}: { role?: string; page?: string } = {}) => {
  //
  const { data: allUsers, isLoading: loadingAllUsers } = useQuery({
    queryKey: ["get-all-users-in-school", role, page],
    queryFn: async () => {
      const res = await api.get(
        `/school-admin/get_all_users_in_school?page=${page}&page_size=21&role=${role}`
      );
      return res.data;
    },
  });
  //
  return {
    allUsers,
    loadingAllUsers,
  };
};
