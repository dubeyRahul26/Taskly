import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Landing from "./pages/landing/Landing";
import Todo from "./pages/todo/Todo";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/userStore";
import { useTodoStore } from "./store/todoStore";
function App() {
  const { user, setUser } = useUserStore();
  const { fetchTodos } = useTodoStore();

  useEffect(() => {
    const localUser = localStorage.getItem("todoUser");
    if (localUser) {
      setUser(JSON.parse(localUser));
      fetchTodos();
    } else {
      setUser(null);
    }
  }, []);
  return (
    <div className=" bg-gradient-to-br from-[#E0F2FF] via-[#80C7F2] to-[#3171A6] p-4 h-screen w-full overflow-y-auto">
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/todo" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/todo" />}
        />
        <Route path="/todo" element={user ? <Todo /> : <Navigate to="/" />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
