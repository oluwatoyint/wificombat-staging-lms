import { Button } from "@/app/components/base-components/Button";
import { AssessmentQuestion } from "@/app/types/AssessmentQuestionProp";
import { AssessmentUserInfo } from "@/app/types/AssessmentUserInfo";
import {
  assessmentAgesTwo,
  assessmentGender,
} from "@/app/utils/types-and-links";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import toast from "react-hot-toast";
import { IoCheckmark } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const GetUserInfoSteps = ({
  userInfo,
  setUserInfo,
  assessmentQuestions,
}: {
  userInfo: AssessmentUserInfo;
  setUserInfo: Dispatch<SetStateAction<AssessmentUserInfo>>;
  assessmentQuestions: AssessmentQuestion[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const infoStep = searchParams.get("ser_fo_st") || "1";

  useEffect(() => {
    if (infoStep === "3" && !userInfo?.first_name) {
      params.set("ser_fo_st", "1");
      router.replace(`?${params.toString()}`);
    } else if (infoStep === "2" && !userInfo?.gender) {
      params.set("ser_fo_st", "2");
      router.replace(`?${params.toString()}`);
    } else if (infoStep === "2" && !userInfo?.first_name) {
      params.set("ser_fo_st", "1");
      router.replace(`?${params.toString()}`);
    }
  }, [userInfo]);

  const goToStepTwo = () => {
    if (!userInfo?.first_name) {
      return toast.error("Please enter your first name");
    }

    if (!userInfo?.last_name) {
      return toast.error("Please enter your last name");
    }

    if (!userInfo?.email) {
      return toast.error("Please enter your email");
    }

    params.set("ser_fo_st", "2");
    router.replace(`?${params.toString()}`);
  };

  const goToStepThree = () => {
    if (!userInfo?.gender) {
      return toast.error("Please select your gender");
    }

    params.set("ser_fo_st", "3");
    router.replace(`?${params.toString()}`);
  };

  const goToAssessments = () => {
    if (!userInfo?.age) {
      return toast.error("Please select your age range");
    }
    params.delete("ser_fo_st");
    params.set("vw", "2");
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-col gap-2 h-full">
      <h2 className="text-center font-merriweather font-bold text-lg 576:text-xl sm:text-2xl mb-4">
        Part 1: Introductory Questions
      </h2>
      {infoStep === "1" ? (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center gap-5 flex-wrap">
            <label htmlFor="first_name" className="flex flex-1 flex-col gap-2">
              <span className="font-medium text-sm sm:text-base text-black">
                First Name
              </span>
              <input
                type="text"
                placeholder="Enter your first name"
                className="border outline-none py-3 px-3 rounded-lg"
                value={userInfo?.first_name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, first_name: e.target.value })
                }
              />
            </label>

            <label htmlFor="last_name" className="flex flex-1 flex-col gap-2">
              <span className="font-medium text-sm sm:text-base text-black">
                Last Name
              </span>
              <input
                type="text"
                placeholder="Enter your last name"
                className="border outline-none py-3 px-3 rounded-lg"
                value={userInfo?.last_name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, last_name: e.target.value })
                }
              />
            </label>
          </div>

          <label htmlFor="email" className="flex flex-col gap-2">
            <span className="font-medium text-sm sm:text-base text-black">
              Email
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              className="border outline-none py-3 px-3 rounded-lg"
              value={userInfo?.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
          </label>

          <label htmlFor="mobile_no" className="flex flex-col gap-2">
            <span className="font-medium text-sm sm:text-base text-black">
              Mobile Number (Optional)
            </span>
            <PhoneInput
              country={"ng"} // Set the default country
              value={userInfo?.mobile_number}
              onChange={(phone) =>
                setUserInfo({ ...userInfo, mobile_number: phone })
              }
              inputStyle={{
                width: "100%", // Make input take full width
                // border: "none", // Remove input border
                // boxShadow: "none", // Remove shadow
                borderRadius: "8px", // Rounded corners if needed
                padding: "24px 40px",
              }}
              buttonStyle={{
                backgroundColor: "white", // Set background of country selector to match
                border: "none", // Remove border
                borderLeft: "1px solid #ccc", // Add border to the right of country selector
                borderTop: "1px solid #ccc", // Add border to the bottom of country selector
                borderBottom: "1px solid #ccc", // Add border to the top of country selector
                borderRadius: "8px 0 0 8px",
              }}
              containerStyle={{
                width: "100%", // Make container take full width
              }}
            />
          </label>
        </div>
      ) : infoStep === "2" ? (
        <div className="flex flex-col gap-6">
          <div
            className="mt-6 w-full bg-yellow-400 text-white 
                                        font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl"
          >
            What is your gender?
          </div>

          <div className="mt-5 w-full py-3 rounded-lg grid grid-cols-2 justify-items-center justify-center gap-4 max-w-[408px] mx-auto">
            {assessmentGender?.map((gender) => (
              <div
                key={gender.id}
                onClick={() =>
                  setUserInfo({ ...userInfo, gender: gender?.sex })
                }
                className={`relative w-full text-center rounded-lg cursor-pointer`}
              >
                <input
                  required
                  type="radio"
                  value={gender.sex}
                  defaultChecked={userInfo?.gender === gender?.sex}
                  className="hidden" // Hide the radio input
                />

                <div className="w-full h-[180px] overflow-hidden">
                  <Image
                    src={gender?.image}
                    alt="Age-Type"
                    width={180}
                    height={180}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="mt-4 font-medium">{gender?.sex}</div>

                {userInfo?.gender === gender?.sex && (
                  <div className="absolute top-[-0.3rem] right-0 bg-green-500 text-white rounded-full">
                    <IoCheckmark />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : infoStep === "3" ? (
        <div className="flex flex-col">
          <div
            className="mt-6 w-full bg-blue-500 text-white 
                                          font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl"
          >
            What is your age?
          </div>

          <div className="mt-5 w-full py-3 rounded-lg grid grid-cols-2 gap-4 max-w-[408px] mx-auto">
            {assessmentAgesTwo?.map((AgeType) => (
              <div
                key={AgeType?.id}
                onClick={() => setUserInfo({ ...userInfo, age: AgeType?.age })}
                className={`relative w-full text-center rounded-lg cursor-pointer`}
              >
                <input
                  required
                  type="radio"
                  value={AgeType?.age}
                  defaultChecked={userInfo?.age === AgeType?.age}
                  className="hidden" // Hide the radio input
                />

                <div className="w-full h-[180px] overflow-hidden">
                  <Image
                    src={
                      userInfo?.gender === "Male"
                        ? AgeType?.maleImage
                        : AgeType?.femaleImage
                    }
                    alt="Age-Type"
                    width={180}
                    height={180}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="mt-4 font-medium">{AgeType?.age}</div>

                {userInfo?.age === AgeType?.age && (
                  <div
                    className="absolute top-[-0.3rem] right-0 
                                                      bg-green-500 text-white rounded-full"
                  >
                    <IoCheckmark />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="flex items-center justify-between mt-auto">
        <Button
          disabled={infoStep === "1"}
          onClick={() => {
            params.set("ser_fo_st", (Number(infoStep) - 1).toString());
            router.replace(`?${params.toString()}`);
          }}
          variant="outline"
          label="Previous"
          className="max-w-[85px] text-sm px-3 disabled:bg-transparent disabled:opacity-25"
        />
        <div>{`Step ${infoStep} of ${
          (assessmentQuestions !== undefined &&
            assessmentQuestions?.length + 3) ||
          "3"
        }`}</div>
        <Button
          onClick={() => {
            if (infoStep === "1") {
              goToStepTwo();
              return;
            } else if (infoStep === "2") {
              goToStepThree();
              return;
            } else if (infoStep === "3") {
              goToAssessments();
              return;
            } else {
              return;
            }
          }}
          variant="outline"
          label="Next"
          disabled={infoStep === "3" && assessmentQuestions === undefined}
          className="max-w-[85px] text-sm px-3 disabled:bg-transparent disabled:opacity-25"
        />
      </div>
    </div>
  );
};
