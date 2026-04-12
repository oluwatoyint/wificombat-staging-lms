"use client";
import { useEffect, useId, useRef, useState } from "react";

const serviceTab = [
  { id: 1, currentValue: "20,000", percentage: 85, title: "Students" },
  { id: 2, currentValue: "300", percentage: 75, title: "Programs" },
  { id: 3, currentValue: "500", percentage: 90, title: "Schools" },
  { id: 4, currentValue: "50,000", percentage: 95, title: "Projects" },
];

const Impact = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-6 pt-16 text-center md:px-14">
      <h3 className="text-3xl md:text-4xl font-semibold">
        Wificombat Academy Impact
      </h3>
      <p className="mt-3 max-w-2xl md:text-xl">
        We have been in operation for over 10 years and we have trained
        students, educators in different schools, done various projects and
        programs.
      </p>

      <div className="my-16 h-full w-full md:w-[90%] lg:w-[88%] mx-auto">
        <div className="flex flex-col justify-center gap-6 max-sm:flex-row max-sm:flex-wrap lg:flex-row lg:justify-around">
          {serviceTab.map((item) => (
            <CircularProgressBar
              key={item.id}
              startPercentage={0}
              endPercentage={item.percentage}
              gradientColors={["#BC00DD", "#BC00DD"]}
              size={200}
              strokeWidth={12}
              className="mx-auto w-48"
            >
              <div className="flex flex-col gap-2 text-center">
                <strong className="text-2xl">{item.currentValue}+</strong>
                <span className="text-lg">{item.title}</span>
              </div>
            </CircularProgressBar>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Impact;

interface CircularProgressBarProps {
  startPercentage: number;
  endPercentage: number;
  gradientColors: string[];
  children: React.ReactNode;
  size: number;
  strokeWidth: number;
  className?: string;
  animationDuration?: number;
}

const CircularProgressBar = ({
  startPercentage,
  endPercentage,
  gradientColors,
  children,
  size,
  strokeWidth,
  className,
  animationDuration = 2,
}: CircularProgressBarProps) => {
  const [progress, setProgress] = useState(startPercentage);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProgress(endPercentage);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [endPercentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((100 - progress) / 100) * circumference;

  const gradientId = `gradient-${useId()}`;

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform rotate-90"
      >
        <defs>
          <linearGradient id={gradientId} gradientTransform="rotate(90)">
            {gradientColors.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / (gradientColors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f2f2f2"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          fill="none"
          style={{
            transition: `stroke-dashoffset ${animationDuration}s ease-in-out`,
          }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
