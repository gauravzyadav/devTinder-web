"use client"

import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { addFeed } from "../utils/feedSlice"
import UserCard from "./UserCard"
import { AlertCircle } from "lucide-react"

export const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()

  const getFeed = async () => {
    try {
      // 🔧 Get token from localStorage
      const token = localStorage.getItem("authToken");
      
      const res = await axios.get(BASE_URL + "/feed", {
        headers: {
          Authorization: `Bearer ${token}`, // 🔧 Add Authorization header
        },
        withCredentials: true, // Keep this for cookie fallback
      });
      
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      // 🔧 Better error handling - handle 401 properly
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login"); // Make sure navigate is available
      }
      console.error("Error fetching feed:", err);
      // TODO: You can add user-friendly error messages here
    }
  };

  useEffect(() => {
    getFeed()
  }, []) // This will run on every component mount

  // Show loading state while feed is being fetched
  if (!feed) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading profiles...</p>
        </div>
      </div>
    )
  }

  // Show empty state when no users available
  if (feed.length <= 0) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-4 text-gray-600">
        <AlertCircle className="w-12 h-12 text-red-400" />
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">No new users found!</h1>
          <p className="text-gray-500">Check back later for more profiles to discover.</p>
          <button
            onClick={getFeed}
            className="cursor-pointer mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Refresh Feed
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center my-30">
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed
