import toast from "react-hot-toast";
import api from "./auth-interceptor";

export const signOut = async () => {
  try {
    const res = await fetch("/api/auth/sign-out-user", { cache: "no-store" });
    const data = await res.json();
    if (res.status === 200) {
      toast.success(data?.message);
      window.location.href = "/login";
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const requestOtpV2 = async ({ email }: { email: string }) => {
  try {
    const response = await api.post("/resend-activation-token", {
      email: email,
    });
    if (!response.data?.success) {
      toast.error(response.data?.message);
      return;
    }
    if (response.data?.success) {
      toast.success(response.data?.message);
    }
  } catch (error: any) {
    console.error("OTP verification failed:", error);
    toast.error(error.response?.data?.message);
  }
};
