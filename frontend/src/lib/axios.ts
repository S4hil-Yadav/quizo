import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000"
      : import.meta.env.VITE_PRODUCTION_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
