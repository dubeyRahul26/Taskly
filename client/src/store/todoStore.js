import { create } from "zustand";
import axios from "axios";
import { useUserStore } from "./userStore";
import toast from "react-hot-toast";

const SERVER_URL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

export const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,

  setTodos: (todos) => set({ todos }),

  fetchTodos: async () => {
    try {
      set((state) => ({ ...state, loading: true }));
      const { user } = useUserStore.getState();

      if (!user || !user._id) {
        console.error("User not found");
        set((state) => ({ ...state, loading: false }));
        return;
      }
      const response = await axios.get(
        `${SERVER_URL}/todo/get-all-tasks/${user._id}`
      );
      set((state) => ({ ...state, todos: response.data, loading: false }));
    } catch (error) {
      console.error("Error fetching todos:", error.message);
      set((state) => ({ ...state, loading: false }));
    }
  },

  addTodo: async (data) => {
    try {
      set((state) => ({ ...state, loading: true }));
      console.log("AddTodo:", data);

      const { user } = useUserStore.getState();

      console.log(user, user._id);
      if (!user || !user._id) {
        console.error("User not found");
        set((state) => ({ ...state, loading: false }));
        return;
      }

      const response = await axios.post(`${SERVER_URL}/todo/create-task`, {
        ...data,
        createdBy: user._id,
      });

      console.log("Todo added:", response.data);

      set((state) => ({
        ...state,
        todos: [...(state.todos || []), response.data],
        loading: false,
      }));

      console.log("AddTodo Completed : ",get().todos);
      

      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding todo:", error.message);
      set((state) => ({ ...state, loading: false }));
      toast.error("Failed to add task!");
    }
  },

  deleteTodo: async (todoId) => {
    try {
      set((state) => ({ ...state, loading: true }));
      await axios.delete(`${SERVER_URL}/todo/delete-task/${todoId}`);
      set((state) => ({
        ...state,
        todos: state.todos.filter((todo) => todo._id !== todoId),
        loading: false,
      }));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error.message);
      set((state) => ({ ...state, loading: false }));
      toast.error("Failed to delete task!");
    }
  },

  updateTodo: async (todoId, data) => {
    try {
      console.log("Updating todo", todoId, data);
      set((state) => ({ ...state, loading: true }));
      await axios.patch(`${SERVER_URL}/todo/update-task/${todoId}`, data);
      set((state) => ({
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === todoId ? { ...todo, ...data } : todo
        ),
        loading: false,
      }));
      toast.success("Task updated successfully!");
    } catch (error) {
      console.error("Error updating todo:", error.message);
      set((state) => ({ ...state, loading: false }));
      toast.error("Failed to update task!");
    }
  },
}));
