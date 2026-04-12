import { merriweather } from '@/app/fonts';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Import toast for notifications
import FlashCardReview from './flash-card';
import { IoCheckmark } from 'react-icons/io5';

type Props = {
  quizData: any[];
  setQuizData: Dispatch<any>;
  activeLessonIndex: number;
  setActiveLessonIndex: Dispatch<SetStateAction<number>>;
  moduleDetails: any[];
  handleVideoClick: () => void;
  setShowAssignment: Dispatch<SetStateAction<boolean>>;
  setIsQuizMode: Dispatch<SetStateAction<boolean>>;
  setIsLessonMode: Dispatch<SetStateAction<boolean>>;
  setIsAssignmentMode: Dispatch<SetStateAction<boolean>>;
  setIsVideoMode: Dispatch<SetStateAction<boolean>>;
};

const QuizContent = ({ quizData, activeLessonIndex, setActiveLessonIndex, handleVideoClick, setQuizData,
    moduleDetails, setShowAssignment, setIsQuizMode, setIsLessonMode, setIsAssignmentMode, setIsVideoMode }: Props) => {
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [originalQuizData, setOriginalQuizData] = useState(quizData);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState<number[]>([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [retakeAttempts, setRetakeAttempts] = useState(0);
  const [retakeMode, setRetakeMode] = useState(false);

    // console.log("quiz data", quizData);
    // console.log("new questions",missedQuestions)

    // Handle option selection
  const handleOptionSelect = (questionIndex: number, selectedOptionIndex: number | string) => {
    setQuizAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOptionIndex.toString(), // Convert selected option index to string
    }));
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      // Check if it's the end of the regular quiz or the retake quiz
      const isEndOfQuiz = currentQuizQuestion === quizData.length - 1;
      const isEndOfRetake = retakeMode && currentQuizQuestion === missedQuestions.length - 1;
  
      if (isEndOfQuiz || isEndOfRetake) {
        handleSubmitQuiz(); // Submit quiz at the end of either mode
      } else {
        handleNextQuizQuestion(); // Move to the next question
      }
    }
  };  

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentQuizQuestion, quizAnswers]);

  // Navigate to the next question
  const handleNextQuizQuestion = () => {
    if (!quizAnswers[currentQuizQuestion]) {
      toast.error('Please answer the question before proceeding.'); // Error if no answer is selected
      return;
    }

    if (currentQuizQuestion < quizData.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    }
  };

  // Navigate to the previous question
  const handlePrevQuizQuestion = () => {
    if (currentQuizQuestion > 0) {
      setCurrentQuizQuestion(currentQuizQuestion - 1);
    }
  };

  const currentQuestion = quizData[currentQuizQuestion];

  // Handle quiz submission and calculate the score
  const handleSubmitQuiz = () => {
    if (!quizAnswers[currentQuizQuestion]) {
      toast.error('Please answer the question before submitting.');
      return;
    }

    const incorrectQuestions: number[] = [];
    let correctAnswers = 0;

    quizData.forEach((question, index) => {
      const userAnswer = quizAnswers[index];

      const isCorrect = question.type === 'multiple-choice'
        ? parseInt(quizAnswers[index]) + 1 === parseInt(question.correct_answer)
       : (userAnswer && userAnswer.trim().toLowerCase()) === question.correct_answer.trim().toLowerCase();

        if (isCorrect) {
          correctAnswers += 1;
        } else {
          incorrectQuestions.push(index);
        }
      });

    const totalScore = (correctAnswers / quizData.length) * 100;
    setScore(totalScore);
    setMissedQuestions(incorrectQuestions);
    setQuizSubmitted(true);

    if (totalScore >= 75) {
        toast.success("You passed! You can now proceed to the next lesson.");
    } else {
      if(retakeAttempts < 1) toast.error("You failed. Please retake the quiz.");
        // setCurrentQuizQuestion(0); // Reset quiz
        setQuizAnswers({}); // Clear answers
        if (retakeAttempts >= 1) {
          setRetakeMode(false); // Disable retake mode after one attempt
          toast.error("Maximum retakes reached. You can now only review.");
        } else {
          setRetakeMode(true);
        }    
    }
};

  const handleRetakeQuiz = () => {
    if (retakeAttempts >= 1) {
      toast.error("You have reached the maximum retake attempts. You can now only review.");
      setRetakeMode(false);
      setReviewMode(true);
      return;
    }

    setCurrentQuizQuestion(0);
    setRetakeAttempts(retakeAttempts + 1);
    setQuizSubmitted(false);

    // Filter quiz data to only missed questions for retake
    const missedQuizData = quizData.filter((_, index) => missedQuestions.includes(index));
    // console.log("filtered missed",missedQuizData)
    setMissedQuestions(missedQuizData);
    setQuizData(missedQuizData);
  };


  const handleProceedToNextLesson = () => {
    if (activeLessonIndex < moduleDetails.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
      setIsQuizMode(false);
      setIsAssignmentMode(false);
      setIsLessonMode(false);
      setIsVideoMode(true);
      handleVideoClick();
    } else {
      // Show assignment when last lesson is reached
      setIsQuizMode(false);
      setIsVideoMode(false);
      setIsLessonMode(false);
      setIsAssignmentMode(false);
      setShowAssignment(true);
    }
  };

  if (reviewMode) {
    return <FlashCardReview 
    quizData={originalQuizData} 
    userAnswers={quizAnswers}
    handleProceedToNextLesson={handleProceedToNextLesson} />;
  }
  
  return (
    <div className='h-[110%] overflow-auto'>
         <Toaster />  {/*To display toast notifications */}
      {!quizSubmitted ? (
        <div
          className="w-full md:w-[80%] mx-auto bg-white mt-4 lg:mt-9 py-9 px-6 text-black-500 
          border border-purple-300 rounded-3xl"
        >
          <div className="flex items-center justify-center">
            {/* <div>(Timer)</div> */}
            <div>
              <h2 className={`text-lg lg:text-2xl font-semibold ${merriweather.className}`}>
                Quiz
              </h2>
            </div>
            <div></div>
          </div>

          <p className="mt-6 mb-4 lg:text-xl text-center font-semibold">
            {currentQuestion.question}
          </p>

          {currentQuestion.image && (
            <div className="mt-6 w-full h-[12rem] lg:h-[13rem] bg-gray-50 rounded-lg">
              <Image
                src={`${currentQuestion.image}`}
                alt="Quiz Image"
                width={500}
                height={200}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}

          {/* Multiple-choice options */}
          {currentQuestion.type === 'multiple-choice' && (
            <div className="mt-4 quiz-options">
            {currentQuestion.options.some((option:any) => option.image) 
            && currentQuestion.options.some((option:any) => option.text) ? (
              // If there are both image and text options
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option: { text: string; image: string }, index: number) => (
                  <div
                    key={index}
                    className={`relative border rounded-lg p-2 cursor-pointer ${
                     quizAnswers[currentQuizQuestion] === index.toString() ? 'border-blue-500' : 'border-gray-300 bg-gray-50'
                    }`}
                    onClick={() => handleOptionSelect(currentQuizQuestion, index)}
                  >
                    {option.image && (
                      <Image
                        src={option.image}
                        alt={`Option ${index}`}
                        width={100} // Adjust as necessary
                        height={100} // Adjust as necessary
                        className="w-full h-[140px] object-contain rounded-lg"
                      />
                    )}
                    {quizAnswers[currentQuizQuestion] === index.toString() && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full">
                        <IoCheckmark />
                      </div>
                    )}
                    <p className="mt-2 text-center">{option.text}</p>
                  </div>
                ))}
              </div>
            ) : currentQuestion.options.some((option:any) => option.image) ? (
              // If there are only image options
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option: { image: string }, index: number) => (
                  <div
                    key={index}
                    className={`relative border rounded-lg p-2 cursor-pointer ${
                      quizAnswers[currentQuizQuestion] === index.toString() ? 'border-blue-500' : 'border-gray-300 bg-gray-50'
                    }`}
                    onClick={() => handleOptionSelect(currentQuizQuestion, index)}
                  >
                    {option.image && (
                      <Image
                        src={option.image}
                        alt={`Option ${index}`}
                        width={100} // Adjust as necessary
                        height={100} // Adjust as necessary
                        className="w-full h-[140px] object-contain rounded-lg"
                      />
                    )}
                    {quizAnswers[currentQuizQuestion] === index.toString() && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full">
                        <IoCheckmark />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // If there are only text options
              <div className="space-y-2">
                {currentQuestion.options.map((option: { text: string }, index: number) => (
                  <label key={index} className="quiz-option flex items-center">
                    <input
                      type="radio"
                      name={`question-${currentQuizQuestion}`}
                      value={option.text}
                      checked={quizAnswers[currentQuizQuestion] === index.toString()}
                      onChange={() =>
                        handleOptionSelect(currentQuizQuestion, index)
                      }
                      className="mr-2 accent-purple-500"
                    />
                    {option.text}
                  </label>
                ))}
              </div>
            )}
          </div>
          )}

          {/* Fill-in-the-gap input */}
          {currentQuestion.type === 'fill-in-the-gap' && (
            <div className="quiz-fill-gap">
              <input
                type="text"
                placeholder="Your answer here"
                value={quizAnswers[currentQuizQuestion] || ''}
                onChange={(e) =>
                  handleOptionSelect(currentQuizQuestion, e.target.value)
                }
                className="mt-4 outline-none border-b-2 border-dashed 
                border-black-500 p-2 w-full placeholder:text-black-500"
              />
            </div>
          )}

          {/* Navigation buttons */}
          <div className="quiz-navigation flex items-center justify-between mt-6">
            <button
              onClick={handlePrevQuizQuestion}
              disabled={currentQuizQuestion === 0}
              className="px-4 py-2 bg-transparent border border-black-500 rounded-lg disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div>
              <h2 className="">{currentQuizQuestion + 1} of {retakeMode ? missedQuestions.length : quizData.length}</h2>
            </div>

            {(retakeMode ? currentQuizQuestion === missedQuestions.length - 1 : currentQuizQuestion === quizData.length - 1) ? (
              <button
                onClick={handleSubmitQuiz}
                className="px-4 py-2 bg-black-500 text-white border border-black-500 rounded-lg"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNextQuizQuestion}
                className="px-4 py-2 bg-transparent border border-black-500 rounded-lg"
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        // Show result and quiz review options
        <div className="w-full md:w-[80%] mx-auto bg-white mt-4 lg:mt-9 py-9 px-6 text-black-500 
        border border-purple-300 rounded-3xl text-center">
          <h2
            className={`text-lg lg:text-2xl font-semibold ${merriweather.className}`}
          >
            Quiz Score
          </h2>

          {score >= 75 ? 
          <Image src={`/assets/dashboard/student-pass.png`} alt='score' width={150} height={150} className='mx-auto'/> 
          : <Image src={`/assets/dashboard/student-fail.webp`} alt='score' width={150} height={150} className='mx-auto'/>  }

          <h2
            className={`text-lg md:text-xl text-black-600`}
          >
            {score >= 75
              ? `Congratulations! You're doing great.`
              : `Unfortunately, you didn't pass`}
          </h2>

          <div className="">
              <h2 className="text-lg md:text-xl text-black-600 ">You 
              {score >= 75 ? ' passed' : ' failed'} with a score of {Math.round(score)}%</h2>
              {score < 100 && <p className='mt-1'>You got question(s)
                <span className='text-red-500'>
                &nbsp;{missedQuestions.map((questionIndex) => questionIndex + 1).join(', ')}
                </span> wrong.</p>}

            <div className='mt-5 flex items-center justify-center gap-5'>
                {score >= 75 &&
               <button 
               onClick={() => setReviewMode(true)}
               className='mt-4 px-4 py-2 bg-transparent text-center border border-black-500 rounded-lg'>
                Review Quiz
               </button>}

                <button
                className="mt-4 px-4 py-2 bg-black-500 text-white border border-black-500 rounded-lg"
                onClick={() => {
                    if (score >= 75) {
                    // Proceed to next lesson or review quiz
                    // Add navigation logic here to go to the next lesson
                    handleProceedToNextLesson();
                    } else if (retakeMode) {
                      handleRetakeQuiz();
                    } else {
                      setReviewMode(true);
                    }
                }}
                >
                {score >= 75
                ? activeLessonIndex === moduleDetails.length - 1
                  ? "Proceed to Assignment" // Show this text if it's the last lesson
                  : "Proceed to Next Lesson"
                : retakeMode ? "Retake Quiz" : "Review Quiz"}
                </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default QuizContent;
