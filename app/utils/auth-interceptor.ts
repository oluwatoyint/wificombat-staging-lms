import axios from "axios";
import { BASE_URL } from "./vars";

const baseURL = BASE_URL,
  isServer = typeof window === "undefined";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const res = await fetch("/api/auth/get-token", { cache: "no-store" }).then(
      (res) => res.json()
    );
    let token = res?.token;
    if (isServer) {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } else {
      if (token) {
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const errorResponse = error.response;
    if (errorResponse.status === 403) {
      // window.location.href = "/";
    }
    if (errorResponse.status === 401) {
      window.location.href = "/login";
    } else {
      throw error;
    }
  }
);

export default api;
