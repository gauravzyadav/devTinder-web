"use client"

import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { removeUserFromFeed } from "../utils/feedSlice"
import { Heart, X, Terminal } from "lucide-react"

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user
  const dispatch = useDispatch()
  const [matchStatus, setMatchStatus] = useState(null)

  // Check if we have an ID. If not, this is likely a preview in EditProfile.
  const isPreview = !_id;

  const handleSendRequest = async (status, userId) => {
    // If it's a preview, don't do anything
    if (isPreview) return;

    setMatchStatus(status)
    try {
      const token = localStorage.getItem("authToken")
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      )
      
      setTimeout(() => {
         dispatch(removeUserFromFeed(userId))
      }, 500)

    } catch (err) {
      console.error("Error sending request:", err)
      setMatchStatus(null) 
    }
  }

  // Animation Styles
  const getCardStyle = () => {
    if (matchStatus === "interested") return "translate-x-[150%] rotate-12 opacity-0"
    if (matchStatus === "ignored") return "-translate-x-[150%] -rotate-12 opacity-0"
    return ""
  }

  return (
    <div className={`relative group perspective-1000 w-full max-w-[290px] transition-all duration-500 ease-in-out ${getCardStyle()}`}>
        
      {/* BACKGROUND SHADOW */}
      <div className={`absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-none transition-opacity duration-300 ${matchStatus ? "opacity-0" : "opacity-100"}`}></div>

      {/* MAIN CARD */}
      <div className="relative bg-white border-4 border-black p-0">
        
        {/* STAMPS */}
        {matchStatus === "interested" && (
            <div className="absolute top-10 right-4 z-50 border-4 border-green-500 text-green-500 px-4 py-2 text-4xl font-black uppercase -rotate-12 bg-white/90 shadow-[4px_4px_0px_0px_#22c55e] animate-bounce">
                LIKE
            </div>
        )}
        {matchStatus === "ignored" && (
            <div className="absolute top-10 left-4 z-50 border-4 border-red-500 text-red-500 px-4 py-2 text-4xl font-black uppercase rotate-12 bg-white/90 shadow-[4px_4px_0px_0px_#ef4444] animate-bounce">
                NOPE
            </div>
        )}

        {/* HEADER BAR */}
        <div className="bg-white border-b-4 border-black p-2 flex justify-between items-center">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-black"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-black"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-black"></div>
            </div>
            <div className="font-mono text-[10px] font-bold">
               {/* 🔧 FIX: Safely handle missing ID for Previews */}
               ID: {isPreview ? "PREVIEW" : _id.slice(-4)}
            </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative aspect-square w-full overflow-hidden border-b-4 border-black bg-gray-200 group">
          <img
            src={photoUrl || "/placeholder.svg?height=300&width=300"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
          
          {/* Name Tag */}
          <div className="absolute bottom-3 left-3 bg-yellow-400 border-4 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
             <h2 className="text-lg font-black uppercase tracking-tighter">
                {firstName || "Name"}, {age || "??"}
             </h2>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-0.5 bg-blue-300 border-2 border-black font-bold text-[10px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {gender || "Gender"}
                </span>
                <span className="px-2 py-0.5 bg-purple-300 border-2 border-black font-bold text-[10px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                    <Terminal size={12} /> Dev
                </span>
            </div>

            <div className="mb-4 min-h-[40px]">
                <p className="text-gray-800 text-xs font-medium leading-normal line-clamp-3">
                    {about || "No bio provided."}
                </p>
            </div>

            {/* ACTION BUTTONS - HIDDEN IN PREVIEW */}
            {!isPreview && (
                <div className="flex gap-3">
                    <button
                        onClick={() => handleSendRequest("ignored", _id)}
                        disabled={matchStatus !== null}
                        className="cursor-pointer flex-1 bg-white text-black border-4 border-black py-2 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-red-500 hover:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex justify-center items-center gap-1 uppercase disabled:opacity-50"
                    >
                        <X strokeWidth={4} className="w-4 h-4" /> 
                        PASS
                    </button>

                    <button
                        onClick={() => handleSendRequest("interested", _id)}
                        disabled={matchStatus !== null}
                        className="cursor-pointer flex-1 bg-pink-500 text-white border-4 border-black py-2 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-600 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex justify-center items-center gap-1 uppercase disabled:opacity-50"
                    >
                        <Heart strokeWidth={4} className="w-4 h-4 fill-current" /> 
                        LIKE
                    </button>
                </div>
            )}
            
            {/* PREVIEW FOOTER */}
            {isPreview && (
               <div className="text-center py-2 font-bold text-xs bg-gray-100 border-2 border-black border-dashed">
                 PREVIEW MODE
               </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default UserCard