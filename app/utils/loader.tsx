import Link from "next/link";
import AssessmentDesign from "../components/AssessmentComps/assessment-design";
import { merriweather } from "../fonts";
import Image from "next/image";

type LoaderProps = {
  isError?: boolean;
  isSessionExpired?: boolean;
  noDesign?: boolean;
  noCourses?: boolean;
  loadingCourses?: boolean;
  curriculum?: boolean;
  notCenter?: boolean;
  home?: boolean;
};

const Loader = ({
  isError = false,
  isSessionExpired = false,
  noDesign = false,
  noCourses = false,
  loadingCourses = false,
  curriculum,
  notCenter,
  home,
}: LoaderProps) => {
  let displayMessage = curriculum
    ? "Loading Curriculum..."
    : loadingCourses
    ? "Loading Courses..."
    : "Loading...";
  let designSrc = loadingCourses ? "/loading-courses.gif" : "";
  let altText = "";
  let buttonText = "";
  let buttonLink = "";

  if (isError) {
    displayMessage = noCourses ? "no Data Available" : "Error loading data.";
    designSrc = "/assets/dashboard/no-access.svg";
    altText = "Error occurred";
    buttonText = noCourses && !home ? "Go Back To Dashboard" : "Go Back Home";
    buttonLink = noCourses ? "/dashboard" : "/";
  } else if (isSessionExpired) {
    displayMessage = "Session expired. Please log in again.";
    designSrc = "/assets/dashboard/expired.svg";
    altText = "Session expired";
    buttonText = "Proceed to Login";
    buttonLink = "/login";
  }

  return (
    <div
      className={`relative ${
        noDesign && !notCenter && "lg:left-[7%] overflow-hidden"
      } 
    flex flex-col justify-center items-center w-full h-screen bg-white overflow-hidden`}
    >
      {!noDesign && <AssessmentDesign />}

      {!isError && !isSessionExpired && !loadingCourses && (
        <div className="relative w-28 h-28 lg:w-40 lg:h-40 rounded-full">
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full 
          border-[16px] border-[#F2F4F7]"
          ></div>
          <div
            className="z-[1] absolute top-0 left-0 w-full border-[16px] animate-spin
           border-[#BC00DD] border-t-transparent border-l-transparent h-full rounded-full 
          "
          ></div>
        </div>
      )}

      {(isError || isSessionExpired || loadingCourses) && (
        <div className="w-80 h-80 relative">
          <Image
            src={designSrc}
            alt={altText}
            layout="fill" // Dynamically sizes the image
            objectFit="contain" // Ensures it fits within the container
          />
        </div>
      )}

      <div
        className={`${merriweather.className} mt-5 text-2xl md:text-3xl font-bold`}
      >
        {displayMessage}
      </div>

      {(isError || isSessionExpired) && (
        <Link href={buttonLink}>
          <button
            className="mt-8 px-6 py-3 bg-black-500 hover:bg-purple-700 text-white 
            font-semibold rounded-md shadow-md transition-all cursor-pointer"
          >
            {buttonText}
          </button>
        </Link>
      )}
    </div>
  );
};

export default Loader;
