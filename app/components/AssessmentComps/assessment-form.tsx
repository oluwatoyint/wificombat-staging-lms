"use client"
import { useRouter } from "next/navigation";
import { IoCheckmark, IoChevronBackOutline } from "react-icons/io5"
import AssessmentDesign from "./assessment-design";
import {useEffect, useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { merriweather } from "@/app/fonts";
import { RiLoader4Fill } from "react-icons/ri";
import { useMain } from "@/app/context/MainContext";
import { API, assessmentAges, assessmentGender, } from "@/app/utils/types-and-links";
import axios from "axios";
import { Question } from "./assessment-questions";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type Option = {
    [key: string]: number;
  };
  

type Assessment = {
    id: number;
    question: string;
    category: string;
    options: Option;
}

type Response = {
    question_id: number;
    question: string;
    answer: string;
};

const getQuestionsEndpoint = (age: string) => {
    if (age === "5-7 years old" || age === "8-10 years old") return "https://wificombatacademy.com/api/v2/assessment/junior";
    if (age >= "11-14 years old" || age === "15-18 years old") return "https://wificombatacademy.com/api/v2/assessment/senior";
    return null;
  };

const AssessmentForm = () => {
    const router = useRouter();
    const {setUsername} = useMain();
    const [questions, setQuestions] = useState<any>([]);
    const [pathways, setPathways] = useState<any>([]);
    const [noQuestions, setNoQuestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [selectedAge, setSelectedAge] = useState("");
    const [selectedGender, setSelectedGender] = useState<String | null>(null);
    const handleSelectAge = (age: string) => setSelectedAge(age);
    const handleSelectGender = (gender: string) => setSelectedGender(gender);
    const [responses, setResponses] = useState<{ questionId: number; answer: string; pathway: string; pathwayId: number; }[]>([]);
    const [validationErrors, setValidationErrors] = useState<String []>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
          const endpoint = getQuestionsEndpoint(selectedAge);
          if (!endpoint) return;

          setLoading(true);
    
          try {
            const response = await axios.get(endpoint)
            setQuestions(response.data.quiz || []);
            setPathways(response.data.reasons || []);
            setNoQuestions(false);
        } catch (error) {
            console.error("Failed to fetch questions:", error);
            setNoQuestions(true);
            return
          } finally {
            setLoading(false);
          }
        };
    
        fetchQuestions();
      }, [selectedAge]);

      const handleResponseChange = (questionId: number, answer: string, pathway: string, pathwayId: number) => {
        setResponses((prev) => {
            const existingResponseIndex = prev.findIndex(response => response.questionId === questionId);
            if (existingResponseIndex !== -1) {
                // Update existing response
                const updatedResponses = [...prev];
                updatedResponses[existingResponseIndex] = { questionId, answer, pathway, pathwayId };
                return updatedResponses;
            }
            // Add new response
            return [...prev, { questionId, answer, pathway, pathwayId }];
        });
    };
    
    const validateCurrentStep = (): string[] => {
        const errors: string[] = [];
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (currentStep === 0 && !name) {
            errors.push("Name is required.");
            // toast.error("Name is required!");
        }
        if (currentStep === 0 && ( !email || !emailPattern.test(email)) && name ) {
            errors.push("A valid email is required.");
          }
        if (currentStep === 1 && !selectedGender) {
            errors.push("Gender is required.");
            // toast.error("Gender is required.");
        }
        if (currentStep === 2 && !selectedAge) {
            errors.push("Age is required.");
            // toast.error("Age is required.");
        }
        if (currentStep >= 3 && currentStep <= totalSteps) {
            // Get the actual question based on current step
            const questionIndex = currentStep - 3;
            const currentQuestion = questions[questionIndex];
            const answered = responses.some(response => response.questionId === currentQuestion?.id);
            
            if (!answered) {
                errors.push(`Please answer the question for step ${currentStep + 1}.`);
            }
        }
        setValidationErrors(errors);
        return errors;
    };

    const analyzeResponses = () => {
        const pathwayCounts: { [key: string]: number } = {};
        
        // Assuming the pathwayId is passed correctly
        responses.forEach(response => {
            if (response.answer === "yes") { // Adjust based on your logic for positive response
                pathwayCounts[response.pathwayId] = (pathwayCounts[response.pathwayId] || 0) + 1;
            }
        });
    
        let selectedPathwayId = '';
        let maxCount = 0;
    
        for (const [pathwayId, count] of Object.entries(pathwayCounts)) {
            if (count > maxCount) {
                maxCount = count;
                selectedPathwayId = pathwayId; // This now correctly captures the ID
            }
        }
    
        // console.log("Selected pathway ID:", selectedPathwayId);
        
        // Find the reason associated with the selected pathway ID
        const selectedPathwayData = pathways.find((item: any) => String(item.pathway.id) === String(selectedPathwayId));
        // console.log("Selected pathway Data:", selectedPathwayData);
        const reason = selectedPathwayData ? selectedPathwayData.pathway.reason : ""; // Get the reason
    
        // console.log("Reason for selected pathway:", reason);
        
        return { selectedPathwayId, selectedPathwayData }; // Return both the pathwayId and reason
    };   
    
    // SEND EMAIL
    const sendRecommendationEmail = async (userEmail: string, pathwayData: any) => {
        setSubmitting(true)
        try {
            const content = `
    <div style="background-color: #f4f4f4; padding: 20px; display: flex; justify-content: center;">

        <div style="background-color: #ffffff; padding: 30px; max-width: 600px; width: 100%; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); text-align: center; font-family: Arial, sans-serif; color: #333333;">
    
        <h1 style="color: #4CAF50; margin-bottom: 20px;">Your Personalised Learning Journey with WiFiCombat eLearn</h1>

        <h2>Hi ${name},</h2>
        <p><strong>Your Personalised Learning Journey Starts Here</strong></p>
        <p>We've analysed your assessment results and crafted a tailored learning path to help you reach your full potential.</p>
        
        <h2>Recommended Pathway:</h2>
        <h3 style="color: #4CAF50;">${pathwayData.pathway.pathway_recommendation.name} Pathway</h3>
        <p>${pathwayData.pathway.pathway_recommendation.description}</p>

        <h3>Why ${pathwayData.pathway.pathway_recommendation.name}?</h3>
        <p>${pathwayData.pathway.pathway_recommendation.pathway_outlook}</p>
        
        <p><strong>Take the Next Step</strong></p>
        <p>Ready to embark on your ${pathwayData.pathway.pathway_recommendation.name} journey? Click the button below to register and explore our comprehensive courses:</p>
        
        <a href="https://wificombatacademy.com/registration" style="background-color: #131314; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px; margin-top: 10px;">
            Start Your ${pathwayData.pathway.pathway_recommendation.name} Journey
        </a>

        <p><strong>Your Success is Our Mission</strong></p>
        <p>At WiFiCombat eLearn, we're committed to empowering learners like you. With our expert-led courses and personalised support, you'll gain the skills and knowledge to thrive in the tech industry.</p>

       <p>Best regards,</p>
            <p>The WiFiCombat eLearn Team</p>
            <img src="https://wificombat-elearning.vercel.app/wificombat.svg" alt="Company Logo" style="width:100px;height:auto;"/>
            <p><a href="https://https://wificombat-elearning.vercel.app/">Visit Our Website</a> | Contact: info@wificombatacademy.com</p>

        <p>Click the button below to register and learn more:</p>

        </div>
    </div>
        `;
        
            // Sending the email
            await axios.post(
            'https://wificombatacademy.com/api/v2/assessment/mail/',
            {
                email: userEmail,
                content,
            },
            {
                headers: {
                'X-API-KEY': '4TjhoZiPVpXBwBRfkIHfOgiatLuY4n5WMUb6Wnc17OM',
                },
            }
            );
        
            return true;
        } catch (error) {
            console.error("Failed to send recommendation email:", error);
            toast.error("Failed to send recommendation email. Please try again.");
            return false;
        }
        finally {
        setSubmitting(false);

        }
        };
    // SEND EMAIL
    
    const handleNext = async () => {
        if (submitting) return;
        const errors = validateCurrentStep(); // Your validation logic
    
        if (errors.length > 0) {
            errors.forEach(error => {
                toast.error(error); // Display error messages
            });
        } else {
            if (currentStep === totalSteps - 1) {
                // If it's the last step, gather the data and navigate to the recommendation page
                const { selectedPathwayId, selectedPathwayData } = analyzeResponses(); // Collect responses

                // Make sure selectedPathway is a string, not null or undefined
                if (selectedPathwayId && selectedPathwayData) {

                    const emailSent = await sendRecommendationEmail(email, selectedPathwayData);

                    if (emailSent) {
                        const pathwayDataEncoded = encodeURIComponent(JSON.stringify(selectedPathwayData));

                        // Build the URL string manually
                        const url = `/recommendation?pathwayId=${selectedPathwayId}
                        &pathwayData=${pathwayDataEncoded}
                        &userName=${name}
                        &age=${selectedAge}`;

                        // Navigate to the recommendation page
                        router.push(url);
                    }

                } else {
                    console.error("selectedPathway is null or undefined");
                }
            } else {
                // Move to the next question
                setCurrentStep(currentStep + 1);
            }
        }
    };
    
    const prev = () => {
        if (currentStep !== 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // NAVIGATIONS
    const totalSteps = 3 + questions.length;
    const Navigations = () => {
        const prev = () => {
            if (currentStep !== 0) {
                setCurrentStep(currentStep - 1);
            }
        };

        const next = () => {
            // if (validateCurrentStep()) {
            //     setCurrentStep(currentStep + 1);
            // }
            if (submitting) return null;
            if(noQuestions) {
                toast.error("Failed to fetch questions due to network");
                return;
            }
            const errors = validateCurrentStep();

            if (errors.length > 0) {
                // Display all validation errors as toast messages
                errors.forEach(error => {
                    toast.error(error);
                });
            } else {
                // Proceed to the next step if no errors
                setCurrentStep(currentStep + 1);
            }
        };

        return (
            <div>
                {
                (currentStep === totalSteps - 1 && !questions)? 
                <>
                    <div className="mt-16 flex items-center justify-center">
                        <div>
                            <div
                                onClick={() => {}}
                                className={`bg-[#131314] xl:text-lg text-white focus-visible:outline-black 
                                    rounded-lg px-16 py-5 font-medium flex items-center justify-center text-center 
                                    shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                    focus-visible:outline-offset-2disabled:bg-gray-400 disabled:cursor-not-allowed `}
                            >
                                {submitting ? 
                                <div className="flex items-center gap-1">
                                Submitting
                                <RiLoader4Fill className="animate-spin"/>
                                </div> : 
                                "Submit"}
                            </div>
                        </div>
                    </div>
                </> : 

                <>
                    <div className="mt-16 w-full flex items-center justify-between text-black-500">
                        <button
                        disabled={currentStep <= 0}
                        onClick={prev}
                        className="py-2 px-4 border border-[#D0D5DD] shadow-md rounded-lg
                        disabled:text-gray-400 disabled:cursor-not-allowed">
                            Previous
                        </button>  

                        <div>
                            {currentStep + 1} of {totalSteps}
                        </div>

                        <button
                        disabled={currentStep >= totalSteps || loading}
                        onClick={next}
                        className="py-2 px-4 border border-[#D0D5DD] shadow-md rounded-lg
                        disabled:px-6 disabled:text-gray-400 disabled:cursor-not-allowed">
                            {loading ? <RiLoader4Fill className="animate-spin"/> : "Next"} 
                        </button> 
                    </div>
                </>
                }
            </div>
        )
    }
    // END NAVIGATIONS

    return (
        <section className="relative w-full h-screen bg-white pb-20 flex justify-center overflow-y-auto">
            <AssessmentDesign />
            <Toaster/>
            <div className="z-[5] w-[90%] md:w-[85%] mx-auto ">
               <div className="relative">                 
                    <IoChevronBackOutline
                        size={24}
                        onClick={() => router.back()}
                        className="z-50 absolute left-3 lg:left-[5rem] top-3 lg:top-8 max-lg:mb-3 border border-[#5F5F5F1A] 
                        p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-lg"
                    />
               </div>


                <form 
                 onSubmit={(e) => e.preventDefault()}
                className="z-20 relative text-black-500 pb-12">
                    {validationErrors.length > 0 && (
                        <div className="text-red-500 mb-4 text-center">
                            {/* {validationErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))} */}
                        </div>
                    )}

                    {currentStep === 0 && (
                        <div className="form-box mt-32 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 1: Introductory Questions
                            </h1>

                            <div className="mt-8 space-y-4">
                               <div>
                                 <label className="font-medium">Name</label>

                                <input 
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="outline-none w-full p-3 border border-black-300 
                                rounded-lg placeholder:text-[#656765]"
                                />
                               </div>
                               <div className="mt-3">
                                 <label className="font-medium">Email</label>

                                <input 
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="outline-none w-full p-3 border border-black-300 
                                rounded-lg placeholder:text-[#656765]"
                                />
                               </div>
                               <div className="mt-3">
                                    <label className="font-medium">Mobile Number (Optional)</label>

                                    <div className="outline-none w-full px-3 py-2 border border-black-300 
                                rounded-lg placeholder:text-[#656765]">
                                    <PhoneInput
                                        country={'ng'} // Set the default country
                                        value={number}
                                        onChange={(phone) => setNumber(phone)}
                                        inputStyle={{
                                            width: '100%',             // Make input take full width
                                            border: 'none',            // Remove input border
                                            boxShadow: 'none',         // Remove shadow
                                            borderRadius: '8px',       // Rounded corners if needed
                                          }}
                                          buttonStyle={{
                                            backgroundColor: 'white',  // Set background of country selector to match
                                            border: 'none',            // Remove border
                                          }}
                                          containerStyle={{
                                            width: '100%',             // Make container take full width
                                          }}
                                    />
                                    </div>
                                </div>
                            </div>


                            <Navigations />
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="z-[5] relative form-box max-md:mt-32 md:mt-12 xl:mt-16 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 1: Introductory Questions
                            </h1>

                            <div className="mt-6 w-full bg-yellow-400 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                What is your gender?
                            </div>

                            <div className="mt-5 w-full py-3 rounded-lg grid grid-cols-2 gap-4">
                                {assessmentGender.map((gender) => (
                                    <div
                                    key={gender.id}
                                    onClick={() => handleSelectGender(gender.sex)}
                                    className={`relative w-full text-center rounded-lg cursor-pointer`}
                                    >
                                    <input
                                        required
                                        type="radio"
                                        value={gender.sex}
                                        checked={selectedGender === gender.sex}
                                        className="hidden" // Hide the radio input
                                    />

                                    <div className="w-full h-[150px] md:h-[250px]">
                                        <Image 
                                        src={gender.image}
                                        alt="Age-Type"
                                        width={180}
                                        height={180}
                                        className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>

                                    <div className="mt-4 font-medium">{gender.sex}</div>

                                    {selectedGender === gender.sex && (
                                        <div className="absolute top-[-0.3rem] right-0 bg-green-500 text-white rounded-full">
                                            <IoCheckmark />
                                        </div>
                                    )}
                                    </div>
                                ))}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="z-[5] relative form-box max-md:mt-32 md:mt-6 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 1: Introductory Questions
                            </h1>

                            <div className="mt-6 w-full bg-blue-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                What is your age?
                            </div>

                            <div className="mt-5 w-full py-3 rounded-lg grid grid-cols-2 gap-4">
                                {assessmentAges.map((AgeType) => (
                                    <div
                                    key={AgeType.id}
                                    onClick={() => handleSelectAge(AgeType.age)}
                                    className={`relative w-full text-center rounded-lg cursor-pointer`}
                                    >
                                    <input
                                        required
                                        type="radio"
                                        value={AgeType.age}
                                        checked={selectedAge === AgeType.age}
                                        className="hidden" // Hide the radio input
                                    />

                                    <div className="w-full h-[150px] md:h-[250px]">
                                        <Image 
                                        src={selectedGender === "Male" ? AgeType.maleImage : AgeType.femaleImage}
                                        alt="Age-Type"
                                        width={180}
                                        height={180}
                                        className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>

                                    <div className="mt-4 font-medium">{AgeType.age}</div>

                                    {selectedAge === AgeType.age && (
                                        <div className="absolute top-[-0.3rem] right-0 
                                        bg-green-500 text-white rounded-full">
                                            <IoCheckmark />
                                        </div>
                                    )}
                                    </div>
                                ))}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep >= 3 && currentStep < totalSteps && (
                    () => {
                        const questionIndex = currentStep - 3;
                        const question = questions[questionIndex];

                        if (!question) {
                        return (
                            <div className="text-center text-red-500">
                            No question found for step {currentStep}
                            </div>
                        );
                        }

                        return (
                        <div key={question.id} className="max-md:py-4 max-md:mb-4 pt-32 lg:h-screen">
                            
                        <Question
                        key={question.id}
                        question={question}
                        index={questionIndex}
                        selectedAnswer={responses.find(response => response.questionId === question.id)?.answer}
                        onChange={handleResponseChange} // Ensure pathway is passed
                        onNext={handleNext}
                        onPrev={prev}
                        isLastStep={currentStep === totalSteps - 1}
                        stepNumber={currentStep - 2} 
                        totalQuestions={questions.length}
                        submitting={submitting}
                        />

                        </div>
                        );
                    }
                    )()}


                </form>
            </div>

        </section>
    )
}

export default AssessmentForm