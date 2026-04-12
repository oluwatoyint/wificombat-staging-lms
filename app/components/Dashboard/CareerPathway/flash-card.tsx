"use client"

import React, { useState } from 'react';
import { merriweather } from '@/app/fonts';
import Image from 'next/image';
import { VscClose } from 'react-icons/vsc';

type FlashCardProps = {
  quizData: any[];
  userAnswers: { [key: number]: string };
  handleProceedToNextLesson: () => void;
};

const FlashCardReview = ({ quizData, handleProceedToNextLesson, userAnswers }: FlashCardProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (currentCard < quizData.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false); // Reset flip state for the next card
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const currentQuestion = quizData[currentCard];
  const userAnswer = userAnswers[currentCard];
  const isCorrect = 
    currentQuestion.type === 'multiple-choice' 
      ? parseInt(userAnswer) + 1 === parseInt(currentQuestion.correct_answer)
      : userAnswer?.trim().toLowerCase() === currentQuestion.correct_answer.trim().toLowerCase();

  const answerColor = isCorrect ? 'text-green-500' : 'text-red-500';

  return (
    <>
      {showModal && (
      <div className="z-[40] fixed bg-[#26002C80] inset-0 flex items-center justify-center">
        <div className="relative w-[90%] mx-auto bg-white max-w-lg p-4 py-12 rounded-3xl shadow-lg">

          <Image 
          width={60}
          height={200}
          src={`/assets/dashboard/note.svg`}
          alt='note'
          className={`object-contain mx-auto`}
          />

          <h2 className='mt-4 px-4 text-xl text-center font-bold'>Please Note</h2>

          <p className="mt-4 px-4 text-center text-black-500 font-medium">
            Please note that the questions you got correctly will be 
            highlighted in green color, and the ones you got wrong will be in red.
          </p>

          <button onClick={handleCloseModal} 
          className="absolute right-0 top-0 mt-4 px-4 py-2">
            <VscClose size={25}/>
          </button>
        </div>
      </div>
      )}

    <div className="w-full md:w-[80%] mx-auto bg-transparent mt-4 lg:mt-9 py-9 px-6 text-black-500 rounded-3xl">
      <div className="flashcard-container text-center relative rounded-3xl">
        {/* Flashcard */}
        <div
          className={`flashcard ${isFlipped ? 'flipped' : ''} 
          w-full md:w-[60%] mx-auto bg-white border border-purple-500 rounded-3xl `}
          style={{ transition: 'transform 0.8s', transformStyle: 'preserve-3d',}}
        >
          {/* Front side */}
          <div className="flashcard-front p-4 bg-white
          absolute inset-0 flex items-center justify-center rounded-3xl" style={{ backfaceVisibility: 'hidden' }}>
            <h2 className={`text-lg lg:text-2xl font-semibold ${answerColor} ${merriweather.className}`}>
              {currentQuestion.question}
            </h2>
          </div>

          {/* Back side (answer) */}
          <div
            className="flashcard-back p-4 bg-white absolute 
            inset-0 flex items-center justify-center rounded-3xl"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className='flex flex-col justify-between gap-5'>
              <h2 className={`text-lg lg:text-2xl font-semibold text-green-500 ${merriweather.className}`}>
                Correct Answer
              </h2>

              <h2 className={`text-lg lg:text-2xl font-semibold ${merriweather.className}`}>
                Answer: {currentQuestion.type === 'multiple-choice'
                  ? currentQuestion.options[parseInt(currentQuestion.correct_answer) - 1].text
                  : currentQuestion.correct_answer}
              </h2>

            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="z-[1] relative top-[-3rem] quiz-navigation flex items-center justify-center gap-7 mt-6">

          {/* Flip button */}
          {!(currentCard === quizData.length - 1 && isFlipped) &&<> 
          <button
            onClick={handleFlipCard}
            className="px-12 py-2 font-medium bg-white text-black-500 border border-black-500 rounded-lg"
          >
            Flip
          </button>

          <button
            onClick={handleNextCard}
            disabled={!isFlipped || currentCard === quizData.length - 1}
            className="px-12 py-2 font-medium border bg-black-500 text-white rounded-lg 
            disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed"
          >
            Next
          </button>
          </>
          }

          {/* Proceed to next lesson button */}
          {currentCard === quizData.length - 1 && isFlipped && (
            <button
              onClick={handleProceedToNextLesson}
              className="relative top-[-1.3rem] mt-6 px-4 py-2 font-medium bg-black-500 
              text-white border border-black-500 rounded-lg"
            >
              Proceed to Next Lesson
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .flashcard {
          position: relative;
          width: 100%;
          height: 50vh;
          cursor: pointer;
        }

        .flipped {
          transform: rotateY(180deg);
        }

        .flashcard-front,
        .flashcard-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
    </>
  );
};

export default FlashCardReview;