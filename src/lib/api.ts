import axios, { AxiosError } from "axios";
import { getToken } from "@/lib/cookies";
import type { ApiError } from "@/types/api";

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
    const { message, error: errorMsg } = (error.response?.data ?? {}) as Partial<ApiError> & { error?: string };
    const backendMessage =
        errorMsg || message || error.message || "Unknown error occurred";
    
    error.message = backendMessage;
    return Promise.reject(error);
  }
);

export default api;
