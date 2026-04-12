import React, { useEffect, useState } from "react";
import { CourseItem } from "../[career-pathway]/_components/CourseItem";

export const StudentCodingPathwayView = ({
  courses,
  loadingCourses,
}: {
  courses: any;
  loadingCourses: boolean;
}) => {
  //
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  //
  if (!hydrated) return null;
  //
  return (
    <main className="pb-10 mt-8">
      <div className="px-4 sm:px-6 lg:px-8 space-y-10">
        {/* -------- */}
        <div className="flex flex-col gap-y-10">
          {loadingCourses ? (
            <>
              {Array.from({ length: 5 }, (_, index) => (
                <div
                  key={index}
                  className="h-[140px] bg-gray-300 animate-pulse rounded-xl"
                />
              ))}
            </>
          ) : (
            courses?.data?.map((course: any) => (
              <CourseItem key={course?.id} course={course} />
            ))
          )}
        </div>
      </div>
    </main>
  );
};
