import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetTeacherClasses = () => {
  const { data: teacherClasses } = useQuery({
    queryKey: ["get-teacher-classes"],
    queryFn: async () => {
      const res = await api.get(`/teacher-dashboard/my_class`);
      return res.data?.data;
    },
  });
  //
  return {
    teacherClasses,
  };
};
