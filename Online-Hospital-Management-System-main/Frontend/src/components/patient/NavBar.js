import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userLocalDetails = JSON.parse(localStorage.getItem("user"));
  const userRole = userLocalDetails?.role;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAuthButtonClickHome = () => {
    if (isLoggedIn) {
      setIsDropdownOpen(!isDropDownOpen);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    alert("You've been logged out.");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white py-4 shadow-lg mt-2 sm:px-8 lg:px-16 sticky top-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 mx-4">
            Prescripto
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-doctors" className="text-gray-600 hover:text-blue-600">
                All Doctors
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-blue-600">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>

          {/* Profile/Login Button */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center space-x-4 relative">
              <button onMouseOver={handleAuthButtonClickHome} className="">
                <FaUserCircle className="text-blue-600 text-3xl" />
              </button>
              {isDropDownOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-md p-4 rounded w-64">
                  <Link
                    to="/profile"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                  >
                    Profile
                  </Link>
                  {userRole === "PATIENT" && (
                    <>
                      <Link
                        to="/appointments"
                        className="block py-2 text-gray-600 hover:text-blue-600"
                      >
                        Appointments
                      </Link>
                      <Link
                        to="/prescriptions"
                        className="block py-2 text-gray-600 hover:text-blue-600"
                      >
                        Prescriptions
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md w-full text-center mt-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleAuthButtonClickHome}
              className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-blue-900 focus:outline-none mx-1"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-600 focus:outline-none"
          aria-label="Close sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul className="mt-16 space-y-4 px-6 text-start">
          <li>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-blue-600 block"
            >
              Profile
            </Link>
          </li>
          {userRole === "PATIENT" && (
            <>
              <li>
                <Link
                  to="/appointments"
                  className="text-gray-600 hover:text-blue-600 block"
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/prescriptions"
                  className="text-gray-600 hover:text-blue-600 block"
                >
                  Prescriptions
                </Link>
              </li>
            </>
          )}
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
