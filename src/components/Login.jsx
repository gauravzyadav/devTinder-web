"use client";

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isSignupForm = location.pathname === "/signup";

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }

      dispatch(addUser(res.data.user));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }

      dispatch(addUser(res.data.user));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-[#FFFDF5] font-sans selection:bg-pink-500 selection:text-white">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 border-4 border-black rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-400 border-4 border-black rotate-12 opacity-50"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        {/* Card Shadow Layer */}
        <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 border-4 border-black rounded-none"></div>
        
        <div className="relative bg-white border-4 border-black p-8 shadow-none">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-black mb-2 uppercase tracking-tighter">
              {isSignupForm ? "Join the Club" : "Welcome Back"}
            </h2>
            <p className="text-gray-600 font-bold border-b-4 border-yellow-300 inline-block px-1">
              {isSignupForm
                ? "Find your pair programming partner"
                : "Login to push some code"}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {isSignupForm && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    className="w-full px-4 py-3 bg-white border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400 font-bold"
                    placeholder="John"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    className="w-full px-4 py-3 bg-white border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400 font-bold"
                    placeholder="Doe"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-black text-black mb-2 uppercase">Email</label>
              <input
                type="email"
                placeholder="dev@example.com"
                value={emailId}
                className="w-full px-4 py-3 bg-white border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400 font-bold"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-black text-black mb-2 uppercase">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 bg-white border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400 font-bold"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-10 text-black hover:text-pink-500 cursor-pointer transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-100 border-2 border-black text-red-600 px-4 py-3 font-bold text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              className="w-full cursor-pointer bg-pink-500 text-white font-black py-4 px-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed uppercase"
              onClick={isSignupForm ? handleSignUp : handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                   <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                   PROCESSING...
                </>
              ) : (
                <>
                  {isSignupForm ? "Create Account" : "Sign In"} <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>

            {/* Toggle Link */}
            <div className="text-center pt-4 font-bold text-sm">
              {isSignupForm ? (
                <>
                  Already a member?{" "}
                  <span
                    className="text-black bg-yellow-300 px-1 border border-black cursor-pointer hover:bg-yellow-400 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    onClick={() => { navigate("/login"); setError(""); }}
                  >
                    LOGIN HERE
                  </span>
                </>
              ) : (
                <>
                  New here?{" "}
                  <span
                    className="text-black bg-yellow-300 px-1 border border-black cursor-pointer hover:bg-yellow-400 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    onClick={() => { navigate("/signup"); setError(""); }}
                  >
                    CREATE ACCOUNT
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Text
      <div className="fixed bottom-4 text-xs font-bold text-gray-400 text-center w-full pointer-events-none">
        DEV_TINDER © {new Date().getFullYear()} • COMMIT EARLY • COMMIT OFTEN
      </div> */}
    </div>
  );
};

export default Login;