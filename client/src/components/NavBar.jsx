import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import AvatarDropdown from "./AvatarDropdown";
import { useUserStore } from "../store/userStore.js";

const NavBar = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="bg-white shadow-md py-3 px-6 md:px-10 fixed top-0 left-0 w-full flex items-center justify-between z-50">
        <div
          className="flex items-center gap-3 sm:gap-4 md:gap-5 cursor-pointer transition-all duration-300 hover:scale-105 py-2 px-2"
          onClick={() => (user ? navigate("/todo") : navigate("/"))}
        >
          {/* Logo Image */}
          <img
            src="logo.png"
            alt="Taskly Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 md:w-13 md:h-13 object-contain border border-blue-500 rounded-lg shadow-lg "
          />

          {/* Taskly Heading */}
          <h2
            className="text-3xl sm:text-3xl md:text-4xl text-blue-600 font-extrabold tracking-wide transition-all duration-300"
            style={{
              textShadow:
                "1px 1px 2px rgba(30, 58, 138, 0.8), 2px 2px 3px rgba(30, 64, 175, 0.7), 3px 3px 3px rgba(30, 58, 138, 0.6)",
              letterSpacing: "0.06em",
            }}
          >
            Taskly
          </h2>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute top-[60px] left-0 w-full bg-white shadow-md rounded-lg py-4 px-6 md:p-0 md:flex md:items-center md:static md:shadow-none md:bg-transparent md:w-auto transition-all ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <li className="py-2 md:py-0">
            <Link
              to={"/"}
              className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition duration-300 hover:bg-gray-200 md:inline md:hover:bg-gray-200"
            >
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li className="py-2 md:py-0">
                <Link
                  to={"/todo"}
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition duration-300 hover:bg-gray-200 md:inline md:hover:bg-gray-200"
                >
                  Tasks
                </Link>
              </li>
              <li className="py-2 md:py-0 flex items-center gap-4 ">
                <AvatarDropdown />
              </li>
            </>
          ) : (
            <>
              <li className="py-2 md:py-0">
                <Link
                  to={"/login"}
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition duration-300 hover:bg-gray-200 md:inline md:hover:bg-transparent"
                >
                  Login
                </Link>
              </li>
              <li className="py-2 md:py-0 px-2">
                <Link
                  to={"/signup"}
                  className="block px-5 py-2 text-lg font-medium text-white bg-blue-500 rounded-md transition duration-300 hover:bg-blue-600 md:inline"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
