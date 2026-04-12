"use client"

type Props = {
    heading?: string;
    headingTwo?: React.ReactNode;
    noUppercase?: boolean;
}

const HeadingDesignTwo = ({ heading, headingTwo, noUppercase }: Props) => {
  return (
    <div className="relative">
        <div className="relative flex flex-col gap-5 items-center justify-center">
            <div className="w-full flex flex-col items-center gap-2 mt-[2.5rem] md:mt-[4rem] lg:mt-[7rem]">
                <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="lg:w-24 w-14 h-14 lg:h-24"
                >
                <circle cx="50" cy="50" r="50" fill="#FFB600" />
                <path
                    d="M67.5 57.5C67.5 67.175 59.675 75 50 75C40.325 75 32.5 67.175 32.5 57.5C32.5 50.525 36.6 44.5 42.5 41.675V32.5C42.5 31.125 43.625 30 45 30H46.25L43.75 25H56.25L53.75 30H55C56.375 30 57.5 31.125 57.5 32.5V41.675C63.4 44.5 67.5 50.525 67.5 57.5ZM47.5 35V45.25C44.6766 45.8263 42.139 47.3605 40.3167 49.5927C38.4945 51.825 37.4994 54.6184 37.5 57.5L37.7 59.775L42.5 54.825L52.675 65L62.325 55.35C61.8885 52.8756 60.7183 50.5895 58.9663 48.7885C57.2143 46.9874 54.9614 45.7546 52.5 45.25V35H47.5ZM52.675 50C54.05 50 55.175 51.125 55.175 52.5C55.175 53.875 54.05 55 52.675 55C51.25 55 50.175 53.875 50.175 52.5C50.175 51.125 51.25 50 52.675 50Z"
                    fill="white"
                />
                </svg>

                <h2 className={`w-[90%] mx-auto mt-2 text-center md:text-3xl text-2xl 
                lg:text-5xl font-semibold md:font-medium block whitespace-pre-line
                ${noUppercase ? 'capitalize' : 'uppercase'} `}>
                    {heading && heading}
                    {headingTwo && headingTwo}
                </h2>
            </div>
        </div>
    </div>
  )
}

export default HeadingDesignTwo