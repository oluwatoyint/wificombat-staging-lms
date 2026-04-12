import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetTeacherStudents = ({
  _class = "primary_1",
}: { _class?: string } = {}) => {
  //
  const { data: teacherStudents, isLoading: loadingTeacherStudents } = useQuery(
    {
      queryKey: ["get-teacher-students", _class],
      queryFn: async () => {
        const res = await api.get(
          `/teacher-dashboard/my_students/?class=${_class}`
        );
        return res.data;
      },
    }
  );
  //
  return {
    teacherStudents,
    loadingTeacherStudents,
  };
};
