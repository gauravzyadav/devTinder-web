"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Alert, AlertDescription } from "./ui/alert"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { CheckCircle, User, Calendar, Users, FileText, Camera, AlertCircle } from "lucide-react"

// Your existing imports
import UserCard from "./UserCard"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"

const EditProfile = ({ user }) => {
  // Keep all your existing state
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
  const [age, setAge] = useState(user.age || "")
  const [gender, setGender] = useState(user.gender || "")
  const [about, setAbout] = useState(user.about || "")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const dispatch = useDispatch()

  // Your existing saveProfile function
  const saveProfile = async () => {
    setError("")
    setIsLoading(true)

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        },
      )

      const updatedUser = res?.data?.data
      if (updatedUser) {
        dispatch(addUser(updatedUser))
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      } else {
        setError("Unexpected response from server.")
      }
    } catch (err) {
      if (err.response && err.response.data && typeof err.response.data === "string") {
        const msg = err.response.data
        const parts = msg.split(": ")
        setError(parts[parts.length - 1])
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("An error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const previewUser = {
    firstName,
    lastName,
    photoUrl,
    age: Number.parseInt(age) || undefined,
    gender,
    about,
  }

  return (
    <>
      <div className="container mx-auto px-4 py-3 max-w-5xl">
        {/* Very Compact Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold tracking-tight">Edit Profile</h1>
          <p className="text-gray-600 text-xs mt-1">Update your profile information and see how it looks to others</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Very Compact Edit Form */}
          <Card className="h-fit">
            <CardHeader className="pb-3 pt-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-xs">Make changes to your profile here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pb-4">
              {/* Very Compact Profile Photo Preview */}
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={photoUrl || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="text-xs">
                    {firstName?.[0]}
                    {lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label htmlFor="photoUrl" className="flex items-center gap-1 text-xs">
                    <Camera className="h-3 w-3" />
                    Photo URL
                  </Label>
                  <Input
                    id="photoUrl"
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="mt-1 h-7 text-xs"
                  />
                </div>
              </div>

              <Separator />

              {/* Very Compact Name Fields */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="firstName" className="text-xs">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="h-7 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName" className="text-xs">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="h-7 text-xs"
                  />
                </div>
              </div>

              {/* Very Compact Age and Gender */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="age" className="flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3" />
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="150"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="25"
                    className="h-7 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-1 text-xs">
                    <Users className="h-3 w-3" />
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Very Compact About Section */}
              <div className="space-y-1">
                <Label htmlFor="about" className="flex items-center gap-1 text-xs">
                  <FileText className="h-3 w-3" />
                  About
                </Label>
                <Textarea
                  id="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell us something about yourself..."
                  rows={2}
                  className="resize-none text-xs"
                />
                <p className="text-xs text-gray-500">{about.length}/500 characters</p>
              </div>

              {/* Compact Error Display */}
              {error && (
                <Alert className="border-red-200 bg-red-50 py-1">
                  <AlertCircle className="h-3 w-3 text-red-600" />
                  <AlertDescription className="text-red-800 text-xs">{error}</AlertDescription>
                </Alert>
              )}

              {/* Compact Success Display */}
              {showToast && (
                <Alert className="border-green-200 bg-green-50 py-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <AlertDescription className="text-green-800 text-xs">Profile updated successfully!</AlertDescription>
                </Alert>
              )}

              {/* Very Compact Save Button */}
              <Button onClick={saveProfile} disabled={isLoading} className="w-full h-8 text-xs">
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </CardContent>
          </Card>

          {/* Very Compact Preview Card */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
             
              
            </div>
            <UserCard user={previewUser} isPreview={true} />
          </div>
        </div>
      </div>

      {/* Compact Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-xs">
            <CheckCircle className="h-3 w-3" />
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  )
}

export default EditProfile
