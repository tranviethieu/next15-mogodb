// services/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "", // hoặc để trống nếu dùng relative path
  withCredentials: true, // gửi cookie
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
