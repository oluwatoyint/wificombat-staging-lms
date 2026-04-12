import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleCourse = ({
  course_id,
}: { course_id?: string } = {}) => {
  // this function uses the id passed to get the single course
  const { data: course, isLoading: loadingCourse } = useQuery({
    queryKey: ["get-singlecourse", course_id],
    queryFn: async () => {
      const res = await api.get(`/courses/${course_id}/get_by_id`);
      return res.data?.data;
    },
    enabled: !!course_id,
  });
  return {
    course,
    loadingCourse,
  };
};
