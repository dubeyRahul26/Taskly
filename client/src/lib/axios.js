import axios from "axios";

const axiosInstance = axios.create({
	baseURL:
	  import.meta.env.MODE === "development"
		? "http://localhost:5000/api" // for development
		: "https://taskly-lwbt.onrender.com/api", // for production
	withCredentials: true, // send cookies to the server
  });

export default axiosInstance;
