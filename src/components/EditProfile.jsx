"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Alert, AlertDescription } from "./ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { CheckCircle, User, Calendar, Users, FileText, Camera, AlertCircle, Upload, Link, Loader2 } from "lucide-react"

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

  // New states for photo upload
  const [uploadMethod, setUploadMethod] = useState("url") // "url" or "file"
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [isProcessingImage, setIsProcessingImage] = useState(false)

  const dispatch = useDispatch()

  // Image compression function
  const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(resolve, "image/jpeg", quality)
      }

      img.src = URL.createObjectURL(file)
    })
  }

  // Convert base64 to File object
  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(",")
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  // 🔧 UPDATED: Upload file to server with Authorization header
const uploadFileToServer = async (file) => {
  const formData = new FormData()
  formData.append("photo", file)

  try {
    // 🔧 Get token from localStorage
    const token = localStorage.getItem("authToken")

    const response = await axios.post(BASE_URL + "/upload/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // 🔧 Add Authorization header
      },
      withCredentials: true, // Keep this for cookie fallback
    })
    return response.data.photoUrl // Your backend returns { photoUrl: "cloudinary_url" }
  } catch (error) {
    console.error("Upload error:", error)
    
    // 🔧 Handle 401 errors (token expired/invalid)
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken")
      // Optional: redirect to login or show message
      // window.location.href = "/login" // Uncomment if needed
    }
    
    throw new Error("Failed to upload image")
  }
}

  // Handle file selection with validation and compression
  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // File size validation (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      setError("File size must be less than 5MB. Please choose a smaller image.")
      return
    }

    // File type validation
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.")
      return
    }

    setIsProcessingImage(true)
    setError("")

    try {
      // Compress the image
      const compressedFile = await compressImage(file)

      // Create preview URL from compressed image
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target.result)
        setSelectedFile(compressedFile)
        setIsProcessingImage(false)
      }

      reader.onerror = () => {
        setError("Error processing image. Please try again.")
        setIsProcessingImage(false)
      }

      reader.readAsDataURL(compressedFile)
    } catch (err) {
      setError("Error compressing image. Please try again.")
      setIsProcessingImage(false)
    }
  }

  // Get display photo URL
  const getDisplayPhotoUrl = () => {
    if (uploadMethod === "file" && previewUrl) {
      return previewUrl
    }
    return photoUrl || "/placeholder.svg"
  }

 // 🔧 UPDATED: Enhanced saveProfile function with Authorization header
const saveProfile = async () => {
  setError("")
  setIsLoading(true)

  try {
    let finalPhotoUrl = photoUrl

    // Handle file upload properly
    if (uploadMethod === "file" && selectedFile) {
      try {
        // Option 1: Upload file to your server
        finalPhotoUrl = await uploadFileToServer(selectedFile)

        // Option 2: If you want to send base64 to backend, convert it properly
        // Remove the data URL prefix and send just the base64 string
        // const base64Data = previewUrl.split(',')[1]
        // finalPhotoUrl = base64Data
      } catch (uploadError) {
        setError("Failed to upload image. Please try again.")
        setIsLoading(false)
        return
      }
    }

    // 🔧 Get token from localStorage
    const token = localStorage.getItem("authToken")

    const res = await axios.patch(
      BASE_URL + "/profile/edit",
      {
        firstName,
        lastName,
        photoUrl: finalPhotoUrl,
        age,
        gender,
        about,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 🔧 Add Authorization header
        },
        withCredentials: true, // Keep this for cookie fallback
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
    console.error("Save profile error:", err)

    // 🔧 Handle 401 errors (token expired/invalid)
    if (err.response?.status === 401) {
      localStorage.removeItem("authToken")
      setError("Session expired. Please login again.")
      // Optional: redirect to login
      // window.location.href = "/login"
      return
    }

    // Enhanced error handling
    if (err.response && err.response.data && typeof err.response.data === "string") {
      const msg = err.response.data
      const parts = msg.split(": ")
      setError(parts[parts.length - 1])
    } else if (err.response?.data?.message) {
      setError(err.response.data.message)
    } else {
      setError("An error occurred while saving profile")
    }
  } finally {
    setIsLoading(false)
  }
}

  const previewUser = {
    firstName,
    lastName,
    photoUrl: getDisplayPhotoUrl(),
    age: Number.parseInt(age) || undefined,
    gender,
    about,
  }

  return (
    <>
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-4 ml-20">
          {/* Very Compact Edit Form */}
          <Card className="min-h-[420px] lg:col-span-2">
            <CardHeader className="pb-4 pt-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                Profile Information
              </CardTitle>
              
            </CardHeader>
            <CardContent className="space-y-4 pb-4">
              {/* Photo Upload Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={getDisplayPhotoUrl() || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback className="text-xs">
                      {firstName?.[0]}
                      {lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Label className="flex items-center gap-1 text-xs font-medium">
                      <Camera className="h-3 w-3" />
                      Profile Photo
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">Max 5MB, images will be automatically compressed</p>
                  </div>
                </div>

                {/* Upload Method Toggle - Fixed alignment */}
                <div className="flex gap-2 items-center">
                  <Button
                    type="button"
                    variant={uploadMethod === "file" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUploadMethod("file")}
                    className="cursor-pointer h-8 text-xs px-3"
                    disabled={isProcessingImage}
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload File
                  </Button>
                  <Button
                    type="button"
                    variant={uploadMethod === "url" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUploadMethod("url")}
                    className="cursor-pointer h-8 text-xs px-3"
                    disabled={isProcessingImage}
                  >
                    <Link className=" h-3 w-3 mr-1" />
                    Enter URL
                  </Button>
                </div>

                {/* File Upload - Fixed alignment */}
                {uploadMethod === "file" && (
                  <div className="space-y-2">
                    <Label htmlFor="photoFile" className="text-xs">
                      Choose photo from your computer
                    </Label>
                    <Input
                      id="photoFile"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="cursor-pointer h-8 text-xs"
                      disabled={isProcessingImage}
                    />
                    {isProcessingImage && (
                      <div className="flex items-center gap-2 text-xs text-blue-600">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Processing image...</span>
                      </div>
                    )}
                    {selectedFile && !isProcessingImage && (
                      <p className="text-xs text-green-600 mt-1">
                        Selected: {selectedFile.name || "Compressed image"}
                        {selectedFile.size && ` (${(selectedFile.size / 1024 / 1024).toFixed(2)}MB)`}
                      </p>
                    )}
                  </div>
                )}

                {/* URL Input - Fixed alignment */}
                {uploadMethod === "url" && (
                  <div className="space-y-2">
                    <Label htmlFor="photoUrl" className="text-xs">
                      Photo URL
                    </Label>
                    <Input
                      id="photoUrl"
                      type="url"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="h-8 text-xs"
                    />
                  </div>
                )}
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
                    className="h-8 text-xs"
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
                    className="h-8 text-xs"
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
                    className="h-8 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-1 text-xs">
                    <Users className="h-3 w-3" />
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="h-8 text-xs">
                      <span className={gender ? "text-black" : "text-gray-400"}>
                        {gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "Select gender"}
                      </span>
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
                  rows={3}
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
              <Button onClick={saveProfile} disabled={isLoading || isProcessingImage} className="w-full h-9 text-sm">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Very Compact Preview Card */}
          <div className="space-y-2">
            <div className="flex items-center gap-2"></div>
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
