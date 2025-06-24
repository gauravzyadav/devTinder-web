"use client";

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Eye, EyeOff } from "lucide-react";

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

  // Determine if we're on signup page based on route
  const isSignupForm = location.pathname === "/signup";

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
  
      // 🔧 Store token in localStorage for cross-domain requests
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }
  
      // 🔧 Updated: Backend now returns { user, token, message }
      dispatch(addUser(res.data.user)); // Use res.data.user instead of res.data
      return navigate("/feed");
    } catch (err) {
      // 🔧 Better error handling for JSON responses
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
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
  
      // 🔧 Store token in localStorage for cross-domain requests
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }
  
      // 🔧 Updated: Backend now returns { user, token, message }
      dispatch(addUser(res.data.user)); // Use res.data.user instead of res.data.data
      return navigate("/profile");
    } catch (err) {
      // 🔧 Better error handling for JSON responses
      setError(err?.response?.data?.message || err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20">
      {/* Compact Login/Signup Card */}
      <div className="w-full max-w-sm ">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6">
          {/* Compact Header */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              {isSignupForm ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600 text-xs">
              {isSignupForm
                ? "Join us to find your perfect match"
                : "Sign in to continue"}
            </p>
          </div>

          {/* Compact Form */}
          <div className="space-y-3">
            {/* Name Fields for Signup */}
            {isSignupForm && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white/80"
                    placeholder="Enter first name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white/80"
                    placeholder="Enter last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={emailId}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white/80"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter your email password"
                className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white/80"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500 hover:text-pink-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              className="w-full cursor-pointer bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              onClick={isSignupForm ? handleSignUp : handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3  h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSignupForm ? "Creating account..." : "Signing in..."}
                </div>
              ) : (
                <>{isSignupForm ? "Create Account" : "Sign In"}</>
              )}
            </button>

            {/* Toggle Form */}
            <div className="text-center pt-2 text-xs text-gray-600 font-medium">
              {isSignupForm ? (
                <>
                  Have an account?{" "}
                  <span
                    className="text-pink-600 hover:underline cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      navigate("/login");
                      setError("");
                    }}
                  >
                    Log in
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span
                    className="text-pink-600 hover:underline cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      navigate("/signup");
                      setError("");
                    }}
                  >
                    Sign up
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Compact Footer */}
        <div className="text-center mt-4 text-xs text-white/70">
          By continuing, you agree to our Terms & Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default Login;
