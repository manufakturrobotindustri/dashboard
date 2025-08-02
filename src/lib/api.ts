// File: lib/api.ts

import axios, { AxiosError } from "axios";
import { getToken } from "@/lib/cookies";

const baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

if (!baseURL) {
  throw new Error(" BASE_URL is undefined. Check your .env.local file.");
}

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = getToken();;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const data: any = error.response?.data ?? {};
    const backendMessage =
      data.error || data.message || error.message || "Unknown error occurred";

    error.message = backendMessage;
    return Promise.reject(error);
  }
);

export default api;
