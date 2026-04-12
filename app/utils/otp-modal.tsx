// "use client"
// import { useEffect, useState } from 'react';
// import Modal from './modal';
// import OTPInput from './otpInput';
// import { useAuth } from '../context/AuthContext';
// import { API } from './types-and-links';
// import toast, { Toaster } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import axiosInstance from './auth-interceptor';
// import { useMain } from '../context/MainContext';

// export type ModalProps = {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const OtpModal = ({isOpen, onClose}: ModalProps) => {
//   const {mail} = useAuth();
//   const router = useRouter();
//   const [minutes, setMinutes] = useState(10);
//   const [seconds, setSeconds] = useState(0);
//   const [otp, setOtp] = useState("");
//   const [isVerifyingLoading, setIsVerifyingLoading] = useState(false);
//   const [isResendCodeLoading, setIsResendCodeLoading] = useState(false);
//   const {setSuccessfulSignup, isFromForgotPassword} = useMain();
//   const [isOtpExpired, setIsOtpExpired] = useState(false);

//   useEffect(() => {
//     const countdown = setInterval(() => {
//       if (seconds > 0) {
//         setSeconds(seconds - 1);
//       }
//       if (seconds === 0) {
//         if (minutes === 0) {
//           clearInterval(countdown);
//           setIsOtpExpired(true);
//         } else {
//           setMinutes(minutes - 1);
//           setSeconds(59);
//         }
//       }
//     }, 1000);
//     return () => clearInterval(countdown);
//   }, [minutes, seconds]);

//   useEffect(() => {
//     const handleKeyPress = (e: KeyboardEvent) => {
//       if (e.key === "Enter" && otp !== "" && !isVerifyingLoading && !isResendCodeLoading) {
//         validateOtp();
//       }
//     };

//     window.addEventListener("keydown", handleKeyPress);
//     return () => {
//       window.removeEventListener("keydown", handleKeyPress);
//     };
//   }, [otp, isVerifyingLoading, isResendCodeLoading]);

//   const validateOtp = async () => {
//     try {
//       setIsVerifyingLoading(true);
//       const response = await axiosInstance.post(`${API}/otp/`, {
//         email: mail,
//         action: 'validate',
//         otp
//       });
//        // Check if the API returned an error in the body even with a 200 status code
//       if (response.data && response.data.code === "OTP_INVALID") {
//         toast.error('OTP is invalid or has expired.');
//         setIsVerifyingLoading(false);
//       }
//       else {
//         if(isFromForgotPassword){
//           toast.success('OTP verified');
//           router.push("/create-password")
//           onClose();
//         }
//         else {
//           setIsVerifyingLoading(false);
//           toast.success('OTP verified');
//           setSuccessfulSignup(true);
//           onClose();
//         }
//       }
//     } catch (error) {
//       toast.error('Error sending OTP');
//       setIsVerifyingLoading(false);
//     }
//   };

//   const resendOtp = async () => {
//     try {
//       setIsResendCodeLoading(true);
//       const response = await axiosInstance.post(`${API}/otp/`, {
//         email: mail,
//         action: 'resend'
//       });
//       toast.success('OTP resent');
//       setIsResendCodeLoading(false);
//       setMinutes(10);
//       setSeconds(0);
//       setIsOtpExpired(false);
//     } catch (error) {
//       console.error('OTP verification failed:', error);
//       setIsResendCodeLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <Toaster />
//         <div className="text-xl font-semibold text-center">
//         OTP Verification
//         </div>
//         <p className="text-lg font-medium my-4 text-center">
//         Please enter the 6-digit code sent to your email
//         </p>

//         <div className="my-4 pt-6 md:py-10 text-center space-y-3">
//             <OTPInput
//                 autoFocus
//                 isNumberInput
//                 length={6}
//                 className="mx-auto my-5/20 appearance-none"
//                 inputClassName="w-10 h-10 md:w-12 md:h-12 mx-1 md:mx-2 text-2xl text-center rounded-md border border-gray-400 overflow-y-hidden"
//                 onChangeOTP={(newOtp) => setOtp(newOtp)}
//             />

//             <div>
//                 <p className='text-black-400'>
//                 {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
//                 </p>
//             </div>
//         </div>

//         <button
//         disabled={otp === "" || isVerifyingLoading || isResendCodeLoading}
//         onClick={validateOtp}
//         className="flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314]
//         p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline
//         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
//         >
//         {isVerifyingLoading? "Verifying..." : "Verify Account"}
//         </button>

//         <button
//         disabled={isOtpExpired}
//         onClick={resendOtp}
//         className={`my-4 w-full text-center flex items-center justify-center font-semibold cursor-pointer
//           ${isOtpExpired ? '' : 'text-gray-400'}`}
//         >
//             {isResendCodeLoading ? "Resending..." : isOtpExpired ? "Resend Code" : "Wait for Expiry"}
//         </button>

//     </Modal>
//     </>
//   );
// };

// export default OtpModal;

"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import Modal from "./modal";
import OTPInput from "./otpInput";
import { useAuth } from "../context/AuthContext";
import { API } from "./types-and-links";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "./auth-interceptor";
import { useMain } from "../context/MainContext";
import api from "./auth-interceptor";
import Link from "next/link";
import Image from "next/image";
import { setCookie } from "cookies-next";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mail?: string;
};

const OtpModal = ({ isOpen, onClose, mail }: ModalProps) => {
  const router = useRouter();
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [otp, setOtp] = useState("");
  const [isVerifyingLoading, setIsVerifyingLoading] = useState(false);
  const [isResendCodeLoading, setIsResendCodeLoading] = useState(false);
  const { setSuccessfulSignup, isFromForgotPassword } = useMain();
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const [isOtpDone, setIsOtpDone] = useState<boolean>(false);
  const [isFromForgotPasswordPage, setIsFromForgotPasswordPage] =
    useState<string>("");
  const [user, setUser] = useState<any>();

  useLayoutEffect(() => {
    const role = localStorage.getItem("selectedRole");
    setUser(role);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          setIsOtpExpired(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        otp !== "" &&
        !isVerifyingLoading &&
        !isResendCodeLoading
      ) {
        validateOtp();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [otp, isVerifyingLoading, isResendCodeLoading]);

  const validateOtp = async () => {
    try {
      setIsVerifyingLoading(true);
      const response = await api.post(`/verify-token`, {
        email: mail,
        token: otp,
      });

      // Check if the API returned an error in the body even with a 200 status code
      if (!response.data?.success) {
        toast.error(response?.data?.mesage || "OTP is invalid or has expired.");
        setIsVerifyingLoading(false);
      } else {
        if (isFromForgotPasswordPage === "true") {
          toast.success("OTP verified");
          router.push("/create-password");
          // onClose();
        } else {
          setIsVerifyingLoading(false);
          toast.success("OTP verified");
          setSuccessfulSignup(true);
          setIsOtpDone(true);
          setCookie("token", response.data?.data?.token, {
            // httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            path: "/",
          });
          setCookie("user_id", response.data?.data?.user?.id, {
            // httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
          });
          setCookie("email", response.data?.data?.user?.email, {
            // httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
          });
          setCookie("first_name", response.data?.data?.user?.first_name, {
            // httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
          });
          setCookie("last_name", response.data?.data?.user?.last_name, {
            // httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
          });
          setCookie("_class", response.data?.data?.user?._class, {
            // httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
          });
          setCookie("age", response.data?.data?.user?.age, {
            // httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
          });
          setCookie("role", response.data?.data?.user?.role, {
            // httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
          });
          // onClose();
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error sending OTP");
      setIsVerifyingLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setIsResendCodeLoading(true);
      const response = await api.post("/resend-activation-token", {
        email: mail,
      });
      if (!response.data?.success) {
        toast.error(response.data?.message);
        return;
      }
      if (response.data?.success) {
        toast.success(response.data?.message);
        setIsResendCodeLoading(false);
        setMinutes(2);
        setSeconds(0);
        setIsOtpExpired(false);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      setIsResendCodeLoading(false);
    } finally {
      setIsResendCodeLoading(false);
    }
  };

  function navigateToProfileCreate() {
    if (user === "teacher") {
      router.push("/teacher/teacher-profile-create");
    } else if (user === "school_admin") {
      router.push("/school-admin/school-admin-profile-create");
    } else if (user === "student") {
      router.push("/student/student-profile-create");
    } else if (user === "user") {
      router.push("/create-profile");
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {isOtpDone ? (
        <div
          className={`fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto`}
        >
          <div className="fixed inset-0 bg-[#26002C80]"></div>
          <div
            className={`bg-white rounded-3xl shadow-lg z-60 w-full p-6 
          relative  max-w-lg max-md:mt-16 h-fit max-md:w-[96%]`}
          >
            <div>
              <Image
                src={`/assets/auth/success.svg`}
                alt="success"
                width={91}
                height={87}
                className="mt-7 object-contain mx-auto"
              />

              <div className="mt-6 text-xl font-semibold text-center">
                Verification Successful
              </div>
              <p className="text-lg font-medium my-4 text-center">
                Your email has been verified successfully
              </p>
              <button
                onClick={navigateToProfileCreate}
                className="mt-10 flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
                p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                {"Create Profile...."}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <Toaster />
          <div className="text-xl font-semibold text-center">
            OTP Verification
          </div>
          <p className="text-lg font-medium my-4 text-center">
            Please enter the 4-digit code sent to your email
          </p>

          <div className="my-4 pt-6 md:py-10 text-center space-y-3">
            <OTPInput
              autoFocus
              isNumberInput
              length={4}
              className="mx-auto my-5/20 appearance-none"
              inputClassName="w-10 h-10 md:w-12 md:h-12 mx-1 md:mx-2 text-2xl text-center rounded-md border border-gray-400 overflow-y-hidden"
              onChangeOTP={(newOtp) => setOtp(newOtp)}
            />

            <div>
              <p className="text-black-400">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
            </div>
          </div>

          <button
            disabled={otp === "" || isVerifyingLoading || isResendCodeLoading}
            onClick={validateOtp}
            className="flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
                          p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            {isVerifyingLoading ? "Verifying..." : "Verify Account"}
          </button>

          <button
            //   disabled={isOtpExpired}
            onClick={resendOtp}
            className={`my-4 w-full text-center flex items-center justify-center font-semibold cursor-pointer 
                          ${isOtpExpired ? "" : "text-gray-400"}`}
          >
            {isResendCodeLoading
              ? "Resending..."
              : isOtpExpired
              ? "Resend Code"
              : "Wait for Expiry"}
          </button>
        </Modal>
      )}
    </>
  );
};

export default OtpModal;
