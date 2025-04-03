// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import toast from "react-hot-toast";
// import { useUserStore } from "../../store/userStore.js";
// const SignUp = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();
//   const {signup} = useUserStore() ;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate required fields
//     if (!firstName || !lastName || !userName || !password || !confirmPassword) {
//       toast.error("Please fill all the fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       // API call to sign up user
//       const res = await signup({
//         firstName,
//         lastName,
//         userName,
//         password,
//         confirmPassword,
//       });

//       toast.success("Successfully signed up!");

//       // Navigate to login page
//       navigate("/login");

//       console.log("Signup response:", res);

//       // Clear form fields
//       setFirstName("");
//       setLastName("");
//       setUserName("");
//       setPassword("");
//       setConfirmPassword("");
//     } catch (error) {
//       console.error("Signup Error:", error);
//       toast.error(error.error || "Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div className="w-full h-screen flex justify-center items-center mt-15">
//       <div className="bg-white w-96 h-auto flex flex-col items-center gap-3 p-6 rounded-lg shadow-2xl shadow-gray-600">
//         <img src="login.png" alt="login-icon" className="w-15 h-15" />
//         <h1 className="text-2xl font-bold">SignUp</h1>
//         <form
//           className="flex flex-col items-center gap-4"
//           onSubmit={handleSubmit}
//         >
//           <input
//             type="text"
//             placeholder="First Name"
//             className="bg-gray-200 px-4 py-2 outline-none rounded-md"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             className="bg-gray-200 px-4 py-2 outline-none rounded-md"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Username"
//             className="bg-gray-200 px-4 py-2 outline-none rounded-md"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="bg-gray-200 px-4 py-2 outline-none rounded-md"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="ConfirmPassword"
//             className="bg-gray-200 px-4 py-2 outline-none rounded-md"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <div className="text-gray-700 text-sm">
//             Already a User?
//             <Link
//               to="/login"
//               className="text-blue-500 font-medium hover:underline hover:text-blue-600 transition"
//             >
//               {" "}
//               Login
//             </Link>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:scale-105 active:border-blue-500  active:scale-95 rounded"
//           >
//             SignUp
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useUserStore } from "../../store/userStore.js";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { signup } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !userName || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await signup({
        firstName,
        lastName,
        userName,
        password,
        confirmPassword,
      });

      toast.success("Successfully signed up!");
      navigate("/login");

      setFirstName("");
      setLastName("");
      setUserName("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4 mt-20">
      <div className="bg-white w-full max-w-md flex flex-col items-center gap-3 p-6 rounded-lg shadow-2xl shadow-gray-600">
        <img src="login.png" alt="login-icon" className="w-16 h-16" />
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="bg-gray-200 px-4 py-2 outline-none rounded-md w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="bg-gray-200 px-4 py-2 outline-none rounded-md w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="bg-gray-200 px-4 py-2 outline-none rounded-md w-full"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-200 px-4 py-2 outline-none rounded-md w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-gray-200 px-4 py-2 outline-none rounded-md w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="text-gray-700 text-sm text-center">
            Already a User?
            <Link
              to="/login"
              className="text-blue-500 font-medium hover:underline hover:text-blue-600 transition"
            >
              {" "}
              Login
            </Link>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:scale-105 active:border-blue-500 active:scale-95 rounded w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
