
import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

// 🔹 axios instance (এটা loader এ use করা যাবে)
export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 React hook (এটা component এর ভিতরে use হবে)
const useApi = () => {
  const { user } = useAuth();
  const token = user?.accessToken;

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  return { api };
};

export default useApi;
