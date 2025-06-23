"use client";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { Home, MessageCircle, UserPlus, LogOut, Settings } from "lucide-react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on transparent pages (landing, login, or signup)
  const isTransparentPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Determine where DevTinder logo should link to
  const logoDestination = user ? "/feed" : "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparentPage
          ? "bg-transparent"
          : "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link
              to={logoDestination}
              className={`text-2xl md:text-4xl font-bold transition-all duration-300 hover:scale-105 ${
                isTransparentPage
                  ? "text-white drop-shadow-lg hover:drop-shadow-xl"
                  : "text-transparent bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text hover:from-pink-600 hover:via-rose-600 hover:to-purple-600"
              }`}
            >
              DevTinder
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Login Button for Non-Authenticated Users */}
            {!user && (
              <Link
                to="/login"
                className={`group relative overflow-hidden font-semibold py-2.5 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 ${
                  isTransparentPage
                    ? "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl"
                    : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                <span className="relative z-10 mx-2">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            )}

            {/* User Section for Authenticated Users */}
            {user && (
              <div className="flex items-center space-x-3">
                {/* Welcome Message */}
                <div
                  className={`hidden md:block text-lg tracking-wide ${
                    isTransparentPage ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  Welcome,{" "}
                  <span
                    className={`font-merriweather font-semibold  ${
                      isTransparentPage ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {user.firstName}
                  </span>
                </div>

                {/* User Dropdown */}
                <div className="relative group">
                  <button
                    className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-300 hover:scale-105 ${
                      isTransparentPage
                        ? "hover:bg-white/10 backdrop-blur-sm"
                        : "hover:bg-pink-50 hover:shadow-md"
                    }`}
                  >
                    <div className="relative">
                      <img
                        alt="user photo"
                        src={
                          user.photoUrl || "/placeholder.svg?height=40&width=40"
                        }
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-200 hover:ring-pink-300 transition-all duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <img
                            src={
                              user.photoUrl ||
                              "/placeholder.svg?height=32&width=32"
                            }
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {user.firstName} {user.lastName}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          to="/feed"
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-pink-600 transition-all duration-200"
                        >
                          <Home className="w-4 h-4" />
                          <span>Home</span>
                        </Link>

                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-pink-600 transition-all duration-200"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Edit Profile</span>
                        </Link>

                        <Link
                          to="/connections"
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-pink-600 transition-all duration-200"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Messages</span>
                        </Link>

                        <Link
                          to="/requests"
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-pink-600 transition-all duration-200"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>Connection Requests</span>
                        </Link>
                      </div>

                      {/* Logout Section */}
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center cursor-pointer
                          space-x-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
