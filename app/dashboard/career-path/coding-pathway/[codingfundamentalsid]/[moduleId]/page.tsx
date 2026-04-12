"use client";

import { useState, useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { SlLockOpen, SlLock } from "react-icons/sl";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
// import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import axiosInstance from "@/app/utils/auth-interceptor";
import Loader from "@/app/utils/loader";
import { API_VERSION_ONE } from "@/app/utils/types-and-links";
import LessonContent from "@/app/components/Dashboard/CareerPathway/lesson-content";
import toast, { Toaster } from "react-hot-toast";
import QuizContent from "@/app/components/Dashboard/CareerPathway/quiz-content";
import { IoChevronBackOutline } from "react-icons/io5";
import AssignmentContent from "@/app/components/Dashboard/CareerPathway/assignment-content";
import VideoContent from "@/app/components/Dashboard/CareerPathway/video-content";

const Page = ({ params }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  const dashboardData = useDashboardStore((state) => state.dashboardData);
  const [moduleDetails, setModuleDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<any[]>([]);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0); // Track active lesson by index
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide
  const [isVideoMode, setIsVideoMode] = useState(true);
  const [isLessonMode, setIsLessonMode] = useState(false);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [isAssignmentMode, setIsAssignmentMode] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any[]>([]);
  const [currentAssigmnet, setCurrentAssignment] = useState(0);
  const [activeAssignmentIndex, setActiveAssignmentIndex] = useState(0);
  const [currentAssignmentSlide, setCurrentAssignmnentSlide] = useState(0); // Track the current slide
  const [expandedLessons, setExpandedLessons] = useState<number[]>([]);

  // Fetch module details
  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_VERSION_ONE}/module/${params.moduleId}/lessons`
        );
        setModuleDetails(response.data);
        setLoading(false);

        if (response.data.length > 0) {
          // Automatically select the first lesson's content and split into slides
          // const content = response.data[0].content;
          // const splitContent = content.split("***");
          // setSelectedContent(splitContent);

          const firstLessonVideoCode = response.data[0].video_code;
          setSelectedContent([firstLessonVideoCode]);
        }
      } catch (error) {
        console.error("Error fetching moduleDetails:", error);
        setLoading(false);
      }
    };

    fetchModuleDetails();
  }, [params.moduleId]);

  // console.log(moduleDetails)
  //Fetch Quiz
  const fetchQuiz = async (lessonIndex: number) => {
    setQuizLoading(true);
    // setTimeout((toast("Fetching Quiz...")), 700);
    try {
      const response = await axiosInstance.get(
        moduleDetails[lessonIndex].quiz_url
      );
      setQuizData(response.data); // Store quiz data
      setActiveLessonIndex(lessonIndex);
      setIsVideoMode(false);
      setIsLessonMode(false);
      setIsAssignmentMode(false);
      setIsQuizMode(true); // Enable quiz mode
      setQuizLoading(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error: any) {
      console.error("Error fetching quiz:", error);
      toast.error("Error fetching quiz", error);
      setQuizLoading(false); // Enable quiz mode
    }
  };

  // Handle lesson click and split content
  const handleLessonClick = (index: number, content: string) => {
    setIsVideoMode(false);
    setIsQuizMode(false);
    setIsAssignmentMode(false);
    setIsLessonMode(true);
    const splitContent = content.split("***"); // Split content into slides
    setSelectedContent(splitContent); // Store slides in state
    setCurrentSlide(0); // Reset to first slide
    setActiveLessonIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleVideoClick = (lessonIndex: number) => {
    setIsVideoMode(true);
    setIsAssignmentMode(false);
    setIsLessonMode(false);
    setIsQuizMode(false);
    setActiveLessonIndex(lessonIndex);
    const videoCode = moduleDetails[lessonIndex].video_code; // Get video code from the selected lesson
    setSelectedContent([videoCode]);
    console.log(videoCode);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAssignmentClick = (index: number, assignment: string) => {
    setIsVideoMode(false);
    setIsQuizMode(false);
    setIsAssignmentMode(true);
    setIsLessonMode(false);
    const splitAssignmnet = assignment.split("***"); // Split content into slides
    setSelectedAssignment(splitAssignmnet); // Store slides in state
    setCurrentAssignment(0); // Reset to first slide
    setActiveAssignmentIndex(index);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // Handle slide navigation
  const handleNextSlide = () => {
    if (currentSlide < selectedContent.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (moduleDetails[activeLessonIndex].quiz_url) {
      setIsQuizMode(true); // Show the quiz button
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleVideoNext = () => {
    // if (moduleDetails?.has_completed_lesson) {
    setIsVideoMode(false);
    setIsLessonMode(true);
    const lessonContent = moduleDetails[activeLessonIndex].content.split("***"); // Split content into slides
    console.log(lessonContent);
    setSelectedContent(lessonContent);
    setCurrentSlide(0); // Reset to the first slide
    // } else {
    //   return;
    // }
  };

  if (loading)
    return (
      <div className="overflow-hidden">
        {" "}
        <Loader noDesign />;
      </div>
    );
  if (moduleDetails.length === 0)
    return (
      <div className="overflow-hidden">
        {" "}
        <Loader noCourses isError noDesign />{" "}
      </div>
    );

  const moduleTitle = moduleDetails.length > 0 ? moduleDetails[0].module : "";
  const numberOfLessons = moduleDetails.length;
  const numberOfQuizzes = moduleDetails.filter(
    (detail) => detail.quiz_url
  ).length;
  // const numberOfAssignments = moduleDetails.filter(
  //   (detail) => detail.assignment
  // ).length;
  const numberOfAssignments = moduleDetails.length;

  // function  OpenModules(){
  //   setOpenModule(true)
  // }

  // const toggleExpandModule = (index: number) => {
  //   // setExpandModule(expandModule === index ? null : index); // Toggle open/close
  //   setExpandModule(prevState => prevState === index ? null : index);
  // };
  const toggleExpandModule = (index: number) => {
    setExpandedLessons((prevState) =>
      prevState.includes(index)
        ? prevState.filter((lessonIndex) => lessonIndex !== index)
        : [...prevState, index]
    );
  };

  return (
    <>
      <Toaster />
      {/* <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      <div
        className={`${raleway.className} relative h-screen lg:overflow-hidden`}
      >
        {/* Main Section */}
        <div
          className={`${
            toggleSidebar ? "lg:pl-36" : "lg:pl-64"
          } transition-all duration-500 ease-in-out pb-4`}
        >
          <DashboardHeader
            setSidebarOpen={setSidebarOpen}
            name={dashboardData?.username}
          />

          <main className="h-full">
            <div className="h-full space-y-10">
              <div className="h-full flex max-lg:flex-col-reverse max-lg:gap-6 ">
                {/* Sidebar Section */}
                <div className="w-full h-full lg:h-screen lg:w-[40%] xl:w-[35%] ">
                  <div className="h-[83%] w-full px-4 sm:px-6 lg:px-8 pb-4 overflow-scroll">
                    {/* Module Info */}
                    <div className="lg:ml-[12%]">
                      <div className="mt-5 text-sm flex gap-3 items-center">
                        <a href="/dashboard/career-path/coding-pathway">
                          <div
                            className="relative border border-[#5F5F5F1A] p-2 
                        cursor-pointer font-bold rounded-lg shadow-sm"
                          >
                            <IoChevronBackOutline size={20} />
                          </div>
                        </a>

                        <h1 className="text-xl font-medium">{moduleTitle}</h1>
                      </div>

                      <div className="mt-4 text-sm flex gap-3 items-center">
                        <p>{numberOfLessons} Lessons</p>
                        <p>{numberOfQuizzes} Quiz</p>
                        <p>{numberOfAssignments} Assignment</p>
                      </div>

                      {/* MODULE PLAN */}
                      <div className="">{/* input the module plan here */}</div>
                      {/* MODULE PLAN */}
                    </div>
                    {/* Module Info */}

                    {/* Lessons List */}
                    {moduleDetails.map((details, index) => (
                      <div
                        key={index}
                        className="mt-4 w-full flex items-stretch justify-between overflow-hidden"
                      >
                        {/* 
 className="flex-shrink-0 cursor-pointer"
                            onClick={() =>
                              handleLessonClick(index, details.content)
                            } */}
                        <div className="w-full flex items-start gap-2">
                          <div onClick={() => toggleExpandModule(index)}>
                            {expandedLessons.includes(index) ? (
                              <IoMdArrowDropright size={25} />
                            ) : (
                              <IoMdArrowDropdown size={25} />
                            )}
                          </div>

                          <div className="ml-[5%]">
                            <h2 className={`text-lg font-medium`}>
                              Lesson {index + 1}
                            </h2>
                            {!expandedLessons.includes(index) && (
                              <div className="space-y-5 font-medium">
                                <div>
                                  <p
                                    className={`mt-5 cursor-pointer
                                  ${
                                    activeLessonIndex === index && isVideoMode
                                      ? "text-purple-500"
                                      : ""
                                  }`}
                                    onClick={() => handleVideoClick(index)}
                                  >
                                    {details.title}
                                  </p>
                                  <p className="text-sm text-black-600">
                                    Video : 2:00 mins
                                  </p>
                                </div>

                                <div>
                                  <p
                                    className={`mt-5 cursor-pointer
                                  ${
                                    activeLessonIndex === index &&
                                    isLessonMode &&
                                    !isQuizMode &&
                                    !isVideoMode
                                      ? "text-purple-500"
                                      : ""
                                  }`}
                                    onClick={() =>
                                      handleLessonClick(index, details.content)
                                    }
                                  >
                                    Lesson note
                                  </p>
                                  <p className="text-sm text-black-600">
                                    Reading : 2:00 mins
                                  </p>
                                </div>

                                <div>
                                  <p
                                    onClick={() => fetchQuiz(index)}
                                    className={`font-medium cursor-pointer
                                 ${
                                   activeLessonIndex === index && isQuizMode
                                     ? "text-purple-500"
                                     : ""
                                 }`}
                                  >
                                    Quiz
                                  </p>
                                  <p className="text-sm text-black-600">
                                    1:00 mins
                                  </p>
                                </div>

                                <div>
                                  <p
                                    className={`mt-5 cursor-pointer
                                  ${
                                    activeLessonIndex === index &&
                                    isAssignmentMode &&
                                    !isLessonMode &&
                                    !isQuizMode &&
                                    !isVideoMode
                                      ? "text-purple-500"
                                      : ""
                                  }`}
                                    // onClick={() =>
                                    //   handleLessonClick(index, details.content)
                                    // }
                                    onClick={() =>
                                      handleAssignmentClick(
                                        index,
                                        details.assignment
                                      )
                                    }
                                  >
                                    Assignmnent
                                  </p>
                                </div>

                                {/* <div>
                                <p className="font-medium cursor-pointer">Assignment</p>
                              </div> */}
                              </div>
                            )}
                          </div>
                        </div>
                        <div onClick={() => toggleExpandModule(index)}>
                          {expandedLessons.includes(index) ? (
                            <SlLock size={20} className="" />
                          ) : (
                            <SlLockOpen size={20} className="" />
                          )}
                        </div>
                      </div>
                    ))}
                    {/* Lessons List */}

                    {/* Assignment */}
                    <div className="mt-4 w-full flex items-stretch justify-between overflow-hidden">
                      <div className="w-full flex items-start gap-2 cursor-pointer">
                        <div className="flex-shrink-0 cursor-pointer">
                          {numberOfAssignments
                            ? "" // <IoMdArrowDropright size={25} />
                            : ""}
                        </div>

                        {/* <div className="ml-[5%]">
                          <h2
                            className={`text-lg font-medium cursor-pointer ${
                              isAssignmentMode ? "text-purple-500" : ""
                            }`}
                            onClick={() => {
                              setIsAssignmentMode(true);
                              setIsQuizMode(false);
                              setIsLessonMode(false);
                              setIsVideoMode(false);
                            }}
                          >
                            Assignment
                          </h2>
                        </div> */}
                      </div>

                      {/* <div>
                        <SlLockOpen size={20} className="" />
                      </div> */}
                    </div>
                    {/* Assignment */}
                  </div>
                </div>
                {/* Sidebar Section */}

                {/* Content Section */}
                <div
                  className={`relative w-full lg:h-[83vh] lg:w-[60%] xl:w-[65%] 
                bg-[#F9F9FF] px-4 pb-16 sm:px-6 lg:px-8 space-y-4 overflow-hidden`}
                >
                  {/* VIDEO CONTENT */}
                  {isVideoMode && (
                    <VideoContent
                      videoCode={selectedContent}
                      lessonTitle={moduleDetails[activeLessonIndex].title} // Pass the lesson title
                      lessonIndex={activeLessonIndex + 1} // Pass the lesson number (1-based index)
                      setIsVideoMode={setIsVideoMode}
                      setIsLessonMode={setIsLessonMode}
                      onNext={handleVideoNext}
                    />
                  )}
                  {/* VIDEO CONTENT */}

                  {/* LESSON CONTENT */}
                  {isLessonMode && (
                    <LessonContent
                      currentSlide={currentSlide}
                      handleNextSlide={handleNextSlide}
                      handlePrevSlide={handlePrevSlide}
                      selectedContent={selectedContent}
                      fetchQuiz={() => fetchQuiz(activeLessonIndex)}
                      isQuizMode={isQuizMode}
                      loadingQuiz={quizLoading}
                      lessonTitle={moduleDetails[activeLessonIndex].title} // Pass the lesson title
                      lessonIndex={activeLessonIndex + 1} // Pass the lesson number (1-based index)
                      totalSlides={selectedContent.length}
                    />
                  )}
                  {/* LESSON CONTENT */}

                  {/* QUIZ CONTENT */}
                  {isQuizMode && (
                    <QuizContent
                      quizData={quizData}
                      setQuizData={setQuizData}
                      activeLessonIndex={activeLessonIndex}
                      moduleDetails={moduleDetails}
                      setActiveLessonIndex={setActiveLessonIndex}
                      setShowAssignment={setIsAssignmentMode}
                      setIsLessonMode={setIsLessonMode}
                      setIsQuizMode={setIsQuizMode}
                      setIsVideoMode={setIsVideoMode}
                      setIsAssignmentMode={setIsAssignmentMode}
                      handleVideoClick={() =>
                        handleVideoClick(activeLessonIndex + 1)
                      }
                    />
                  )}
                  {/* QUIZ CONTENT */}

                  {/* ASSIGNMENT CONTENT */}
                  {isAssignmentMode && (
                    <AssignmentContent
                      currentAssignmentSlide={currentAssignmentSlide}
                      selectedAssignment={selectedAssignment}
                      isQuizMode={isQuizMode}
                      loadingQuiz={quizLoading}
                      lessonIndex={activeLessonIndex + 1} // Pass the lesson number (1-based index)
                      assignmnetIndex={0}
                      currentAssignment={0}
                    />
                  )}
                  {/* ASSIGNMENT CONTENT */}
                </div>
                {/* Content Section */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;
