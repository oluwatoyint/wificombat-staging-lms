import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import { cn } from "@/app/utils/cn";
import Image from "next/image";

export const ContinueLearningSection = ({ courses }: { courses: any }) => {
  const { getShade } = usePrimaryColor();
  return (
    <div>
      <h3 className="font-bold text-2xl md:text-3xl mb-5">Continue Learning</h3>
      {/*  */}
      <div
        className={cn(
          "grid items-center gap-x-5 gap-y-4",
          courses?.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
        )}
      >
        {courses?.map((course: any) => (
          <div
            key={course?.id}
            style={{ background: getShade(100) }}
            className="flex w-full p-5 rounded-lg border border-primary flex-wrap sm:flex-nowrap gap-4"
          >
            <Image
              src={course?.cover_image?.media}
              alt="continue teaching image"
              width={80}
              height={80}
              className="object-cover object-center"
            />
            <div className="w-full flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="font-bold capitalize text-xl sm:text-2xl">
                  {course?.title}
                </h3>
                <p className="text-black font-bold text-xl">
                  {Math.round(course?.user_course_progress)}%
                </p>
              </div>
              <div className="flex gap-2 text-black/70 items-center flex-wrap">
                <p>{course?.course_module_count}</p>|
                <p>{course?.course_lesson_count}</p>
              </div>
              <div className="bg-[#F2F4F7] h-[8px] w-full overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${course?.user_course_progress}%`,
                    background: getShade(200),
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
