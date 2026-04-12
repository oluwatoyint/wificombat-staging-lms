import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetTeacherSingleStudent = ({
  student_id,
}: {
  student_id: string;
}) => {
  const { data: teacherStudent, isLoading: loadingTeacherStudent } = useQuery({
    queryKey: ["get-teacher-student", student_id],
    queryFn: async () => {
      const res = await api.get(`/teacher-dashboard/${student_id}/get_by_id/`);
      return res.data;
    },
  });
  return {
    teacherStudent,
    loadingTeacherStudent,
  };
};
