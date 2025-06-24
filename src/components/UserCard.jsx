"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import { Heart, X, Calendar, FileText } from "lucide-react"

// Your existing imports
import axios from "axios"
import { useDispatch } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { removeUserFromFeed } from "../utils/feedSlice"

const UserCard = ({ user, isPreview = false }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(null)

  // State for like glow effect only
  const [showLikeGlow, setShowLikeGlow] = useState(false)

  // 🔧 UPDATED: Enhanced handleSendRequest function with Authorization header
  const handleSendRequest = async (status, userId) => {
    if (isPreview || isLoading) return // Prevent multiple clicks

    // Only show glow for like action
    if (status === "interested") {
      setShowLikeGlow(true)
    }

    setIsLoading(status)

    try {
      // 🔧 Get token from localStorage
      const token = localStorage.getItem("authToken")

      // Make API call with Authorization header
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔧 Add Authorization header
          },
          withCredentials: true, // Keep this for cookie fallback
        },
      )

      // For like action, keep glow for 30 seconds before removing card
      if (status === "interested") {
        setTimeout(() => {
          dispatch(removeUserFromFeed(userId))
          setIsLoading(null)
          setShowLikeGlow(false)
        }, 200) // 30 seconds delay
      } else {
        // For pass action, remove immediately
        dispatch(removeUserFromFeed(userId))
        setIsLoading(null)
      }
    } catch (err) {
      console.error("Error sending request:", err)

      // 🔧 Handle 401 errors (token expired/invalid)
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken")
        // You might want to redirect to login or show a message
        // window.location.href = "/login" // Uncomment if needed
      }

      // Reset states on error so user can try again
      setIsLoading(null)
      setShowLikeGlow(false)
    }
  }

  const fullName = `${firstName} ${lastName}`.trim()
  const displayInfo = age && gender ? `${age}, ${gender}` : age ? `${age}` : gender || ""

  // Like glow class (only for like action)
  const getLikeGlowClass = () => {
    if (showLikeGlow) {
      return "shadow-2xl shadow-pink-500/60 ring-4 ring-pink-400/40 scale-105"
    }
    return ""
  }

  return (
    <Card
      className={`w-full max-w-[280px] mx-auto overflow-hidden transition-all duration-300 border-0 shadow-md ${getLikeGlowClass()}`}
    >
      {/* Very Compact Profile Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={photoUrl || "/placeholder.svg?height=280&width=224"}
          alt={`${fullName}'s profile`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/placeholder.svg?height=280&width=224"
          }}
        />

        {/* Preview Badge */}
        {isPreview && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 text-black shadow-sm text-xs px-1.5 py-0.5">
              Preview
            </Badge>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Very Compact Name and Age Overlay */}
        <div className="absolute bottom-2 left-2 text-white">
          <h3 className="text-lg font-bold mb-0.5 drop-shadow-sm">{fullName}</h3>
          {displayInfo && (
            <div className="flex items-center gap-1 text-xs opacity-90">
              <Calendar className="h-3 w-3" />
              <span className="drop-shadow-sm">{displayInfo}</span>
            </div>
          )}
        </div>

        {/* Like glow overlay (only for like action) */}
        {showLikeGlow && (
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-gradient-to-t from-pink-500/20 via-transparent to-pink-500/10 animate-pulse" />
        )}
      </div>

      {/* Very Compact Card Content */}
      {about && (
        <CardContent className="p-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
              <FileText className="h-3 w-3" />
              About
            </div>
            <p className="text-xs leading-relaxed text-gray-700 line-clamp-2">{about}</p>
          </div>
        </CardContent>
      )}

      {/* Very Compact Action Buttons */}
      {!isPreview && (
        <CardFooter className="p-2 pt-1">
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors h-7 text-xs cursor-pointer disabled:cursor-not-allowed"
              onClick={() => handleSendRequest("ignored", _id)}
              disabled={isLoading !== null}
            >
              {isLoading === "ignored" ? (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 border border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                  <span className="text-xs">Processing...</span>
                </div>
              ) : (
                <>
                  <X className="h-3 w-3 mr-1" />
                  Pass
                </>
              )}
            </Button>
            <Button
              size="sm"
              className={`flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 transition-all duration-300 h-7 text-xs cursor-pointer disabled:cursor-not-allowed ${
                showLikeGlow ? "shadow-lg shadow-pink-500/50 scale-105 animate-pulse" : ""
              }`}
              onClick={() => handleSendRequest("interested", _id)}
              disabled={isLoading !== null}
            >
              {isLoading === "interested" ? (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 border border-pink-200 border-t-white rounded-full animate-spin"></div>
                  <span className="text-xs">Processing...</span>
                </div>
              ) : (
                <>
                  <Heart className="h-3 w-3 mr-1" />
                  Like
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      )}

      {/* Very Compact Preview Mode Footer */}
      {isPreview && (
        <CardFooter className="p-2 pt-1">
          <div className="w-full text-center">
            <p className="text-xs text-gray-500 italic">This is how your profile will appear to others</p>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

export default UserCard
