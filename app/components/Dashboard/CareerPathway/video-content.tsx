import React from "react";

type Props = {
  videoCode: any;
  lessonTitle: string;
  lessonIndex: number;
  setIsLessonMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVideoMode: React.Dispatch<React.SetStateAction<boolean>>;
  onNext: () => void;
};

const VideoContent = ({
  videoCode,
  lessonIndex,
  lessonTitle,
  onNext,
}: Props) => {
  return (
    <div className="relative lg:h-full">
      <div className="">
        <div
          dangerouslySetInnerHTML={{ __html: videoCode }}
          className="mt-7 md:mt-9 rounded-2xl styleElements"
        />

        <div className="mt-4">
          <h4 className="font-bold lg:text-lg">{lessonTitle}</h4>
          <p className="mt-3">Lesson {lessonIndex}</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        <button
          onClick={onNext}
          className={`relative lg:absolute lg:bottom-0 mt-5 px-4 py-2 bg-black-500 text-white border border-black-500 
            flex items-center justify-center text-center rounded-lg 
            disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed`}
        >
          Proceed to Next Lesson
        </button>
      </div>
    </div>
  );
};

export default VideoContent;
