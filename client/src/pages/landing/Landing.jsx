import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-15 flex flex-col items-center bg-gradient-to-br from-[#E0F2FF] via-[#80C7F2] to-[#3171A6] p-4">

      <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-4">
        {/* Text Section */}
        <div className="md:w-1/2 w-full text-center p-6 flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-black text-4xl md:text-5xl font-bold text-center">
              Simplify your
              <span className="text-blue-500"> to-do</span> list
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 px-2 md:px-0">
              Taskly is a simple, user-friendly to-do list app that helps you
              stay organized and motivated.
            </p>
            <div className="flex items-center gap-4 w-full justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 text-lg border-b-4 border-blue-700 hover:border-blue-500 hover:scale-105 active:scale-95 active:bg-blue-500 rounded transition-all"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center pb-6 md:pb-10">
          <img
            src="landingImg.jpg"
            alt="Landing-page-image"
            className="w-[90%] md:w-[520px] h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
