import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api/v1"
      : `${import.meta.env.VITE_PRODUCTION_BASE_URL}/api/v1`,
  withCredentials: true,
});

export default axiosInstance;
