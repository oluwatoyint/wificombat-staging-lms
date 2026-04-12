"use client";
import Image from "next/image";
import { TodayComp } from "../components/CodingPathwayComps/today-comp";
import Footer from "../components/general/Footer";
import GeneralNavbar from "../components/general/GeneralNavbar";
import Link from "next/link";
import RecommendationDesign from "../components/AssessmentComps/recommendation-design";
import { useRouter } from "next/navigation";
import { Suspense, useLayoutEffect, useState } from "react";
import Loader from "../utils/loader";
import { RecommendedPathway } from "../types/recommendationPathwayType";

interface IUser {
  first_name: string;
  last_name: string;
}
function RecommendationContent() {
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);
  const [pathways, setPathways] = useState<Array<RecommendedPathway>>([]);
  const [recommendedPathay, setRecommendedPathay] =
    useState<RecommendedPathway | null>(null);

  useLayoutEffect(() => {
    const pathways: Array<RecommendedPathway> = JSON.parse(
      localStorage.getItem("recommendations") || "[]"
    );
    const user = JSON.parse(
      localStorage.getItem("assessmentUserInfo") || "null"
    );
    setPathways(pathways?.filter((pathway) => pathway?.rank !== 1));
    setRecommendedPathay(
      pathways?.find((pathway) => pathway?.rank === 1) || null
    );
    setUser(user);
  }, []);

  console.log("pathways", pathways);
  const getPath = (pathwayTitle: string) => {
    const path = pathwayTitle?.toLowerCase();
    return path?.includes("gaming")
      ? "/gaming-pathway"
      : path?.includes("coding")
      ? "/coding-pathway"
      : path?.includes("artificial")
      ? "/ai-pathway"
      : path?.includes("robotics")
      ? "/robotics-pathway"
      : path?.includes("techpreneurship")
      ? "/techpreneurship-pathway"
      : "/multimedia-pathway";
  };

  //
  return (
    <div className="w-full relative">
      {/* SUMMARY */}
      <RecommendationDesign />

      <div className="relative z-[5] w-[90%] md:w-[70%] lg:w-[65%] mx-auto">
        <h1 className="relative z-[412] mt-4 text-center text-xl md:text-2xl lg:text-3xl font-medium">
          {` Hi ${user?.first_name} ${user?.last_name}, your assessment indicates a strong aptitude for logical thinking and problem-solving, which are essential for a successful coding career.`}
        </h1>
      </div>
      {/* SUMMARY */}

      {/* PATHWAY */}
      <div className="relative z-[5] mt-16 md:mt-24 w-full bg-blue-50 py-12">
        <div
          className="w-[93%] md:w-[90%] mx-auto flex flex-col md:flex-row 
                        md:items-center gap-10 md:gap-14 lg:gap-20 text-black-500"
        >
          <div className="w-full md:basis-[50%]">
            {recommendedPathay && (
              <Image
                src={`${recommendedPathay?.pathway?.cover_image?.media}`}
                alt={recommendedPathay?.pathway?.title}
                width={500}
                height={500}
                className="w-full h-[370px] object-contain border-none"
              />
            )}
          </div>

          <div className="w-full md:basis-[50%]">
            <h2 className="text-blue-500 font-semibold text-xl md:text-2xl lg:text-4xl">
              {`${recommendedPathay?.pathway?.title}`}
            </h2>

            <div className="mt-4 text-lg md:text-xl">
              {recommendedPathay?.pathway?.description}
            </div>

            {/* <p className="mt-4 text-lg md:text-xl text-black-700 font-bold">
              {"Beginner level"}
            </p>

            <p className="mt-4 md:text-lg text-black-700 font-medium">
              Key Skills:
              {skills}
            </p> */}

            <div className="mt-8 lg:mt-12">
              <Link
                href={getPath(recommendedPathay?.pathway?.title || "")}
                className={`bg-[#131314] text-white focus-visible:outline-black 
                                        rounded-lg px-16 py-5 font-medium shadow-sm hover:bg-opacity-80 
                                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                    `}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* PATHWAY */}

      {/* REASONS */}
      <div className="relative z-[5] w-[90%] mx-auto py-12 md:py-16">
        <h2 className="font-semibold text-2xl lg:text-4xl">
          Reasons For Recommendation
        </h2>

        <div className="mt-12 md:mt-16 w-full grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
              Pathway Highlights
            </h3>
            <p className="mt-4 text-lg md:text-xl">
              {
                "Coding is like building with blocks, but with computers! You can make games, apps, and even robots come to life. Imagine the fun!"
              }
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
              Courses to take
            </h3>
            <ul className="mt-4 text-lg md:text-xl">
              <li>Coding Fundamental 1</li>
              <li>Coding Fundamental 2</li>
              <li>Coding Fundamental 3</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
              Career Outlook
            </h3>
            <p className="mt-4 text-lg md:text-xl">
              {
                "Coders create amazing things! Imagine building video games, designing websites, or even helping robots learn new tricks. With coding skills, you can solve problems, be creative, and make a difference in the world!"
              }
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
              Next Step
            </h3>
            <p className="mt-4 text-lg md:text-xl">
              {
                "Ready to start coding? Let's go! Try our fun coding games, solve puzzles, or work on projects to build something awesome!"
              }
            </p>
            <div className="mt-8 lg:mt-12">
              <Link
                // href={`/${normalizePathwayName(
                //   recommendation?.pathway?.pathway_recommendation?.name
                // )}-pathway`}
                href={`/login`}
                className={`bg-[#131314] text-white focus-visible:outline-black 
                                        rounded-lg px-8 py-3 lg:py-4 font-medium shadow-sm hover:bg-opacity-80 
                                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                    `}
              >
                Get Started
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
              Reason For Beginner Level
            </h3>
            <p className="mt-4 text-lg md:text-xl">
              {
                "Coding is like building with blocks, but with computers! You can make games, apps, and even robots come to life. Imagine the fun!"
              }
            </p>
          </div>

          {/* ALTERNATIVE PATHS */}
          <div className="">
            <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
              Alternative Paths
            </h3>

            {/* <p className="mt-4 text-lg md:text-xl">
              If you&apos;re interested in{" "}
              {recommendation?.pathway?.pathway_recommendation?.name}, you might
              consider exploring these pathways as well.
            </p> */}
            <p className="mt-4 text-lg md:text-xl">
              These are some of the other pathways that you might be interested
              in:
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              {/* Alternative pathways can be added here */}
              {pathways?.map((path: RecommendedPathway, index: number) => (
                <Link
                  key={index}
                  href={getPath(path?.pathway?.title)}
                  className={`border border-[#131314] text-black-500 focus-visible:outline-black 
                                    rounded-lg px-8 py-3 font-medium shadow-sm hover:bg-opacity-80 
                                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                `}
                >
                  {path?.pathway?.title}
                </Link>
              ))}
            </div>
          </div>
          {/* ALTERNATIVE PATHS */}
        </div>
      </div>
      {/* REASONS */}
    </div>
  );
}

export default function RecommendationPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="mx-auto relative container w-full max-w-[2000px] overflow-hidden">
        {/* Navbar and Footer */}
        <GeneralNavbar />

        <Suspense fallback={<Loader />}>
          <RecommendationContent />
        </Suspense>

        <TodayComp
          desc="Start Learning from your favorite pathway Today!"
          header="Start Pathway Today!"
          linkto="/students/curriculum"
        />

        <Footer />
      </div>
    </Suspense>
  );
}
