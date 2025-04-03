import {create} from 'zustand' ;
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL  ||  'http://localhost:5000/api';
axios.defaults.withCredentials = true;

export const useUserStore = create((set , get) =>({
    user: null,
	loading: false,

    setUser: (userData) => {
        localStorage.setItem("todoUser", JSON.stringify(userData)); // Save to localStorage
        set({ user: userData });
      },

    signup : async (data) => {
        try {
            const res = await axios.post(`${SERVER_URL}/auth/signup`, data);
            set({ user: res.data, loading: false });
            return res.data;  // Return only the response data

        } catch (error) {
            console.error("Signup Error:", error.response?.data || error.message);
            throw error.res?.data || { message: "Something went wrong!" };
        }
    },

    login : async (data) => {
        try {
            const res = await axios.post(`${SERVER_URL}/auth/login`, data);
            set({ user: res.data, loading: false });
            return res.data;
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            throw error.response?.data || { message: "Something went wrong!" };
        }
    },

    logout : async () => {
        try {
            await axios.post(`${SERVER_URL}/auth/logout`);
            set({ user: null, loading: false });
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout Error:", error.response?.data || error.message);
        }
    }

}))
