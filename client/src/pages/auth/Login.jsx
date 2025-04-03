// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import toast from "react-hot-toast";
// import { useUserStore } from "../../store/userStore.js";
// const Login = () => {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const {login} = useUserStore() ;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userName || !password) {
//       toast.error("Please fill all the fields");
//       return;
//     }

//     try {
//       // API call to login user
//       const res = await login({ userName, password });
//       toast.success("Login successful!");
//       localStorage.setItem("todoUser", JSON.stringify(res));
//       // Navigate to homepage
//       navigate("/");

//       console.log("Logged in as:", userName);

//       // Reset form fields
//       setUserName("");
//       setPassword("");
//     } catch (error) {
//       toast.dismiss(); // Remove any loading state
//       // Handle API errors gracefully
//       console.error("Login Error:", error);
//       toast.error(error.error || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="w-full h-screen flex justify-center items-center mt-15">
//       <div className="bg-white w-96 h-auto flex flex-col items-center gap-3 p-6 rounded-lg shadow-2xl shadow-gray-600">
//         <img src="login.png" alt="login-icon" className="w-15 h-15" />
//         <h1 className="text-2xl font-bold">Login</h1>
//         <form
//           className="flex flex-col items-center gap-4"
//           onSubmit={handleSubmit}
//         >
//           <input
//             type="text"
//             placeholder="Username"
//             className="bg-gray-200 p-2 outline-none rounded-md"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="bg-gray-200 p-2 outline-none rounded-md"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="text-gray-700 text-sm">
//             Don't have an Account?
//             <Link
//               to="/signup"
//               className="text-blue-500 font-medium hover:underline hover:text-blue-600 transition"
//             >
//               {" "}
//               SignUp
//             </Link>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:scale-105 active:border-blue-500  active:scale-95 rounded"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useUserStore } from "../../store/userStore.js";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const res = await login({ userName, password });
      toast.success("Login successful!");
      localStorage.setItem("todoUser", JSON.stringify(res));
      navigate("/");

      console.log("Logged in as:", userName);
      setUserName("");
      setPassword("");
    } catch (error) {
      toast.dismiss();
      console.error("Login Error:", error);
      toast.error(error.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md h-auto flex flex-col items-center gap-3 p-6 rounded-lg shadow-2xl shadow-gray-600">
        <img src="login.png" alt="login-icon" className="w-20 h-20" />
        <h1 className="text-2xl font-bold">Login</h1>
        <form className="flex flex-col items-center gap-4 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="bg-gray-200 p-2 w-full outline-none rounded-md"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-200 p-2 w-full outline-none rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-gray-700 text-sm text-center">
            Don't have an Account?
            <Link
              to="/signup"
              className="text-blue-500 font-medium hover:underline hover:text-blue-600 transition ml-1"
            >
              SignUp
            </Link>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 w-full border-b-4 border-blue-700 hover:scale-105 active:border-blue-500 active:scale-95 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
