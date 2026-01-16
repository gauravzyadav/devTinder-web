"use client";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { Home, MessageCircle, UserPlus, LogOut, Settings, User } from "lucide-react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(BASE_URL + "/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      localStorage.removeItem("authToken");
      dispatch(removeUser());
      return navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("authToken");
      dispatch(removeUser());
      navigate("/");
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoDestination = user ? "/feed" : "/";

  return (
    <nav className="relative z-50 bg-[#FFFDF5] border-b-4 border-black h-20 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LOGO SECTION */}
          <div className="flex-shrink-0">
            <Link
              to={logoDestination}
              className="text-3xl font-black tracking-tighter hover:text-pink-500 transition-colors flex items-center gap-1"
            >
              <span className="bg-black text-white px-2 py-1 transform -rotate-3">CODE</span>
              <span className="text-black">MATE</span>
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-4">
            
            {/* NOT LOGGED IN: Show Login Button */}
            {!user && (
              <Link
                to="/login"
                className="cursor-pointer font-bold py-2 px-6 bg-yellow-400 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                LOGIN
              </Link>
            )}

            {/* LOGGED IN: Show User Menu */}
            {user && (
              <div className="flex items-center space-x-4" ref={dropdownRef}>
                <div className="hidden md:block font-bold text-lg">
                  Welcome, <span className="bg-pink-500 text-white px-1">{user.firstName}</span>
                </div>

                {/* Avatar Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all overflow-hidden bg-white"
                  >
                    <img
                      alt="user photo"
                      src={user.photoUrl || "/placeholder.svg?height=40&width=40"}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-4 w-64 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50">
                      {/* Header */}
                      <div className="bg-yellow-400 p-4 border-b-4 border-black">
                        <p className="font-black text-lg truncate">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs font-mono font-bold">@developer</p>
                      </div>

                      {/* Links */}
                      <div className="p-2 space-y-1">
                        <Link
                          to="/feed"
                          className="flex items-center space-x-3 px-4 py-3 font-bold hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black"
                        >
                          <Home className="w-5 h-5" />
                          <span>FEED</span>
                        </Link>

                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-3 font-bold hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black"
                        >
                          <Settings className="w-5 h-5" />
                          <span>EDIT PROFILE</span>
                        </Link>

                        <Link
                          to="/connections"
                          className="flex items-center space-x-3 px-4 py-3 font-bold hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>MESSAGES</span>
                        </Link>

                        <Link
                          to="/requests"
                          className="flex items-center space-x-3 px-4 py-3 font-bold hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black"
                        >
                          <UserPlus className="w-5 h-5" />
                          <span>REQUESTS</span>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t-4 border-black p-2">
                        <button
                          onClick={handleLogout}
                          className="cursor-pointer flex items-center justify-center space-x-2 w-full px-4 py-3 font-black bg-red-500 text-white border-2 border-black hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>LOGOUT</span>
                        </button>
                      </div>
                    </div>
                  )}
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