import api from "@/app/utils/auth-interceptor";
import { useQuery } from "@tanstack/react-query";

export const useReportCard = ({
  course_id,
  user_id,
}: {
  course_id?: string;
  user_id?: string;
} = {}) => {
  //this function gets user report card details
  const { data: myReportCardDetails, isLoading: loadingMyReportCardDetails } =
    useQuery({
      queryKey: ["get-my-report-card-details", user_id, course_id],
      queryFn: async () => {
        const res = await api.get(
          `/my-learning-dashboard/report-card/${course_id}/${user_id}`
        );
        return res.data;
      },
      enabled: !!user_id && !!course_id,
    });

  //
  return {
    myReportCardDetails,
    loadingMyReportCardDetails,
  };
};
