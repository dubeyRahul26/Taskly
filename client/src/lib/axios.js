import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // this stays as /api for proxying
  withCredentials: true,
});

export default axiosInstance;
