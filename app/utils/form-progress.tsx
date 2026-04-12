import { FaCheck } from 'react-icons/fa';

const ProgressBar = ({
    steps,
    currentStep,
  }: {
    steps: any[];
    currentStep: number;
  }) => {
    const filledWidth = `${((currentStep + 1) / steps.length) * 100}%`;
  
    return (
      <div className="flex w-full items-start justify-between relative">
        <div
          className="absolute h-2 rounded bg-gray-300 w-full"
          style={{ top: "1rem" }}
        ></div>
        <div
          className="absolute h-2 rounded bg-purple-50 transition-width duration-500 ease-in-out"
          style={{ top: "1rem", width: filledWidth }}
        ></div>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`w-full flex flex-col items-center justify-center ${
              index <= currentStep ? "text-purple-50" : "text-gray-400"
            }`}
          >
            <div
              className={`z-10 p-1.5 rounded-full flex items-center justify-center ${
                index <= currentStep ? "bg-[#FBE5FF]" : "bg-[#E5E5E6]"
              }`}
            >
              <div
                className="w-6 h-6 flex items-center justify-center rounded-full transition-background duration-500 ease-in-out"
                style={{
                  background:
                    index <= currentStep
                      ? `#BC00DD`
                      : "#CBCBCD",
                }}
              >
                {index < currentStep ? (
                    <FaCheck className="text-white" size={12}/>
                ) : (
                    <span className={`${index <= currentStep ? "text-white": "text-black-500"}`}>{index + 1}</span>
                )}
              </div>
            </div>
            <p className="mt-6 mr-1 md:mr-4 text-black-500 max-md:text-xs text-center">{step.title}</p>
          </div>
        ))}
      </div>
    );
  };
  
export default ProgressBar;  