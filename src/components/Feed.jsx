"use client"

import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { addFeed } from "../utils/feedSlice"
import UserCard from "./UserCard"
import Footer from "./Footer"
import { Frown, RefreshCw } from "lucide-react"

export const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getFeed = async () => {
    try {
      const token = localStorage.getItem("authToken");
      
      const res = await axios.get(BASE_URL + "/feed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed()
  }, [])

  // --- NEO-BRUTALIST LOADING STATE ---
  if (!feed) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex flex-col items-center justify-center space-y-8 font-sans">
        <div className="w-24 h-24 border-4 border-black bg-pink-500 animate-spin shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"></div>
        <h2 className="text-4xl font-black bg-yellow-400 border-4 border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2">
          FETCHING DATA...
        </h2>
      </div>
    )
  }

  // --- NEO-BRUTALIST EMPTY STATE ---
  if (feed.length <= 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex flex-col selection:bg-pink-500 selection:text-white">
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black p-8 max-w-md w-full text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
            
            {/* Decoration */}
            <div className="absolute -top-6 -left-6 bg-red-500 text-white font-bold p-2 border-4 border-black transform -rotate-12">
              404: LOVE NOT FOUND
            </div>

            <Frown className="w-24 h-24 mx-auto mb-6 text-black" strokeWidth={2.5} />
            
            <h1 className="text-4xl font-black uppercase mb-4 tracking-tight">
              No Matches Left
            </h1>
            
            <p className="text-lg font-bold text-gray-600 mb-8 border-b-4 border-gray-200 pb-4">
              You've browsed all available developers in your area. Time to refactor your search criteria?
            </p>
            
            <button
              onClick={getFeed}
              className="cursor-pointer w-full bg-blue-400 text-black font-black text-xl py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-6 h-6" /> REFRESH FEED
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // --- MAIN FEED ---
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5]">
      <div className="flex flex-grow items-center justify-center py-12 px-4">
        {/* 🔥 THE FIX IS HERE: Added 'key={feed[0]._id}' */}
        <UserCard user={feed[0]} key={feed[0]._id} />
      </div>
      <Footer />
    </div>
  )
}

export default Feed