import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetTeacherClassPathways = ({
  _class = "primary_1",
  term = "first_term",
}: {
  _class?: string;
  term?: string;
}) => {
  const { data: teacherClassPathways, isLoading: loadingTeacherClassPathways } =
    useQuery({
      queryKey: ["get-teacher-class-pathways", _class, term],
      queryFn: async () => {
        const res = await api.get(
          `/teacher-dashboard/get_class_pathways/?class=${
            _class ? _class : ""
          }&term=${term ? term : ""}`
        );
        return res.data;
      },
    });
  return {
    teacherClassPathways,
    loadingTeacherClassPathways,
  };
};
