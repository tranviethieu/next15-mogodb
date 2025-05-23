// services/admin/usersService.ts
import axios from "@/services/axiosInstance"; // Axios instance đã cấu hình

const usersService = {
  async GetProfileAccount() {
    const res = await axios.get("/api/profile", {
      withCredentials: true, // gửi cookie (đặc biệt với httpOnly)
    });
    return res.data; // trả về data trực tiếp
  },
};

export default usersService;
