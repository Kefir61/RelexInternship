import axiosGlobal from "axios";
import { BASE_URL, updateAccessToken } from "@utils";

export const axiosOur = axiosGlobal.create({
  baseURL: BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});
export const axiosAuth = axiosGlobal.create({
  baseURL: process.env.AUTH_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "*/*",
  },
});

axiosOur.interceptors.request.use((config) => {
  config.headers.Authorization = `${localStorage.getItem("access_token")}`;
  return config;
});

axiosOur.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 403 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await updateAccessToken();
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        return axiosAuth.request(originalRequest);
      } catch (e) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
    throw error;
  }
);
