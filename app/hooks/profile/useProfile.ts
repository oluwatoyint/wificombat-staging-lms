"use client";
import api from "@/app/utils/auth-interceptor";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";

export const useProfile = () => {
  const [countries, setCountries] = useState();
  const [states, setStates] = useState();
  const [allSchools, setAllSchools] = useState<any[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);
  const [profilePicPreview, setProfilePicPreview] = useState<string>("");
  const [uploadingImg, setUploadingImg] = useState<boolean>(false);
  //
  const getCountries = async () => {
    const url = "https://api.countrystatecity.in/v1/countries";
    const res = await axios.get(url, {
      headers: {
        "X-CSCAPI-KEY":
          "VUJ1UU5aSmlLU2xiNEJxdUg0RnQ0akNZbXAyV2ZiVHlnN1F6dHA1dg==",
      },
    });
    setCountries(res.data);
  };

  const getStates = async (iso2: any) => {
    const url = `https://api.countrystatecity.in/v1/countries/${iso2}/states`;
    const res = await axios.get(url, {
      headers: {
        "X-CSCAPI-KEY":
          "VUJ1UU5aSmlLU2xiNEJxdUg0RnQ0akNZbXAyV2ZiVHlnN1F6dHA1dg==",
      },
    });
    setStates(res.data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  const getAllSchools = async () => {
    try {
      const res = await api.get("/retrieve-schools");
      const data = res?.data?.data;
      setAllSchools(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  useLayoutEffect(() => {
    getAllSchools();
  }, []);

  return {
    countries,
    states,
    getStates,
    allSchools,
    selectedSchool,
    setSelectedSchool,
    updating,
    setUpdating,
    profilePicPreview,
    setProfilePicPreview,
    uploadingImg,
    setUploadingImg,
  };
};
