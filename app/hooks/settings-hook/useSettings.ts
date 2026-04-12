"use client";
import api from "@/app/utils/auth-interceptor";
import { signOut } from "@/app/utils/services";
import { useState } from "react";
import toast from "react-hot-toast";
interface passwordDetailsProp {
  current_password: string;
  new_password: string;
}
export const useSettings = () => {
  const [passwordDetails, setPasswordDetails] = useState<passwordDetailsProp>({
    current_password: "",
    new_password: "",
  });
  const [updatingPass, setUpdatingPass] = useState<boolean>(false);
  //
  //
  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    if (!passwordDetails?.current_password || !passwordDetails?.new_password) {
      toast.error("Please fill in all details");
      return;
    }
    try {
      setUpdatingPass(true);
      const res = await api.put("/dashboard/change-password", passwordDetails);
      if (res.data.success) {
        toast.success(res.data.message);
        await signOut();
        window.location.href = "/login";
      }
    } catch (error: any) {
      toast.error(error.response.data?.message);
    } finally {
      setUpdatingPass(false);
    }
  };

  return {
    passwordDetails,
    setPasswordDetails,
    handleChangePassword,
    updatingPass,
  };
};
