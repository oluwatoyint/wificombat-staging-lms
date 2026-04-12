"use client";
import { useEffect, useRef, useState } from "react";
import { CurriculumLevel } from "@/app/utils/types-and-links";
import HeadingDesign from "../../general/HeaderDesign";
import CareerCard from "../../Home/career-card";
import Loader from "@/app/utils/loader";
import { RiLoader4Fill } from "react-icons/ri";
import { Toaster } from "react-hot-toast";
import api from "@/app/utils/auth-interceptor";
import { Truncate } from "@/app/utils/truncate";
import { useQuery } from "@tanstack/react-query";

type CareerPathwayCurriculumProps = {
  schoolCurriculum?: boolean;
  showHeadingDesign?: boolean;
};

export const CareerPathwayCurriculum = ({
  schoolCurriculum,
  showHeadingDesign = true,
}: CareerPathwayCurriculumProps) => {
  const [activePathIndex, setActivePathIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] =
    useState<CurriculumLevel>("Beginner");
  const [pathways, setPathways] = useState<any[]>([]);
  const [pathwaysLoading, setPathwaysLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(false);
  //
  const [pathId, setPathId] = useState<string>("");
  //

  const headingText = schoolCurriculum
    ? "school curriculum"
    : "career pathway curriculum";

  //
  useEffect(() => {
    const fetchPathways = async () => {
      setPathwaysLoading(true);
      try {
        const response = await api.get(`/course-pathways`);
        setPathways(response.data?.data); // Set fetched pathways to state
        if (response.data?.data?.length > 0) {
          // setPathId(response.data?.data[0]?.id);
          setPathId(response.data?.data?.[response.data?.data?.length - 1]?.id);
        }
      } catch (error) {
        console.error("Error fetching pathways:", error);
      } finally {
        setPathwaysLoading(false); // Done loading
      }
    };

    fetchPathways();
  }, []);
  //
  // const hasMounted = useRef(false);
  // useEffect(() => {
  //   if (!hasMounted.current) {
  //     hasMounted.current = true;
  //     return;
  //   }
  //   //
  //   const levels_items = document.querySelector(".level-items-container");
  //   levels_items?.scrollIntoView({ behavior: "smooth" });
  // }, [pathId]);
  const scrollUp = () => {
    const levels_items = document.querySelector(".level-items-container");
    levels_items?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch courses by pathway ID
  const fetchCourses = async (pathwayId: string) => {
    setCoursesLoading(true); // loading courses
    try {
      const response = await api.get(
        `/courses/get_all?pathway_id=${pathwayId}`
      );
      return response.data?.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setCoursesLoading(false); // Done loading
    }
  };
  //
  const { data: courses } = useQuery({
    queryKey: ["get-all-courses", pathways, pathId],
    queryFn: async () => fetchCourses(pathId),
    enabled: !!pathways && !!pathId,
  });

  const handlePathwayClick = (index: number, pathwayId: string) => {
    setActivePathIndex(index);
    setPathId(pathwayId);
  };

  const levelNames = schoolCurriculum
    ? {
        Beginner: "Elementary",
        Intermediate: "Junior High School",
        Advance: "Senior High School",
      }
    : {
        Beginner: "Beginner",
        Intermediate: "Intermediate",
        Advance: "Advance",
      };

  const levels: CurriculumLevel[] = ["Beginner", "Intermediate", "Advance"];
  if (pathwaysLoading) {
    return (
      <div className="overflow-hidden">
        <Loader curriculum={true} />
      </div>
    );
  }
  return (
    <section>
      {showHeadingDesign && <HeadingDesign heading={headingText} />}
      <Toaster />

      <div className="level-items-container mt-8 md:mt-10 lg:mt-20 mb-20">
        <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
          <div className="w-full flex gap-4 md:gap-7 items-center justify-center font-semibold text-xl md:text-3xl">
            {levels.map((level) => (
              <h2
                key={level}
                className={`cursor-pointer ${
                  selectedLevel === level
                    ? "text-purple-500 border-b-4 border-purple-500"
                    : ""
                }`}
                onClick={() => setSelectedLevel(level)}
              >
                {levelNames[level]}
              </h2>
            ))}
          </div>

          <div className="mt-10 md:mt-16 flex flex-col lg:flex-row gap-16 items-center lg:items-start justify-between">
            <div
              className="w-full lg:basis-[13%] py-3 px-2 md:px-3 flex flex-wrap 
              lg:flex-col items-center max-sm:justify-between rounded shadow-xl max-lg:px-4 border"
            >
              {[...pathways]?.toReversed()?.map((pathway: any, index) => (
                <div
                  key={pathway?.id}
                  onClick={() => {
                    handlePathwayClick(index, pathway?.id);
                    scrollUp();
                  }}
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    width: "120px",
                    height: "120px",
                    lineHeight: "1.2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className={`px-1 lg:px-4 lg:leading-[24.5px] text-center font-medium break-words cursor-pointer text-sm
                    ${
                      index === activePathIndex
                        ? `bg-purple-500 text-white`
                        : `transition-colors duration-500 hover:bg-gray-200`
                    }`}
                  title={pathway?.title}
                >
                  {Truncate(pathway?.title, 10)} <br /> Pathway
                </div>
              ))}
            </div>

            {coursesLoading ? (
              <div className="w-full h-[20rem] flex items-center justify-center">
                <RiLoader4Fill
                  size={145}
                  className="animate-spin text-purple-500"
                />
              </div>
            ) : (
              <div className="w-full lg:basis-[87%]">
                {courses?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 min-[1250px]:grid-cols-3 gap-9">
                    {courses.filter(
                      (course: any) =>
                        course?.stage === selectedLevel.toLowerCase()
                    )?.length > 0 ? (
                      courses
                        .filter(
                          (course: any) =>
                            course?.stage === selectedLevel.toLowerCase()
                        )
                        .map((course: any, index: number) => (
                          <CareerCard
                            key={index}
                            curriculum={true}
                            pathway={course?.title}
                            // price={formatPrice(course.price)}
                            subject={course?.title}
                            image={course?.cover_image?.media}
                            level={course?.stage}
                            desc={Truncate(course?.description, 14)}
                            linkTo={`/course/${course.id}`}
                            item={{ ...course, id: course?.id }}
                            viewCourse={true}
                          />
                        ))
                    ) : (
                      <p className="w-full m-auto text-center">
                        No courses available for this level.
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="w-full m-auto text-center">
                    No courses available for this pathway.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
