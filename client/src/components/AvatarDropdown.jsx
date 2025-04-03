
import { useState, useEffect } from "react";
import { useUserStore } from "../store/userStore.js";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";

function AvatarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation(); // Detects route changes

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      setIsOpen(false);
      localStorage.removeItem("todoUser");
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout failed:", error);
    }
  };

  // Close the dropdown when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]); // Runs whenever the URL changes

  return (
    <div className="relative px-2">
      {/* Avatar Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center hover:scale-110">
        <img
          src="avatar.jpg"
          alt="Avatar"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-none cursor-pointer"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-3 left-0 w-44 bg-white border border-gray-300 rounded-lg shadow-lg md:w-48 sm:right-0 sm:left-auto sm:transform-none sm:translate-x-5 max-w-[90vw] overflow-hidden">
          <button
            onClick={handleLogout}
            className="block w-full text-center px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;


