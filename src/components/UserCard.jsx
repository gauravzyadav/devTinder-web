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

  // Your existing handleSendRequest function
  const handleSendRequest = async (status, userId) => {
    if (isPreview) return

    setIsLoading(status)

    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true })
      dispatch(removeUserFromFeed(userId))
    } catch (err) {
      console.error("Error sending request:", err)
    } finally {
      setIsLoading(null)
    }
  }

  const fullName = `${firstName} ${lastName}`.trim()
  const displayInfo = age && gender ? `${age}, ${gender}` : age ? `${age}` : gender || ""

  return (
    <Card className="w-full max-w-[280px] mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg border-0 shadow-md">
      {/* Very Compact Profile Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={photoUrl || "/placeholder.svg?height=280&width=224"}
          alt={`${fullName}'s profile`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors h-7 text-xs"
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
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 transition-all duration-200 h-7 text-xs"
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
