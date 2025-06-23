"use client"

import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"

const NavBar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // Check if we're on transparent pages (landing, login, or signup)
  const isTransparentPage =
    location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup"

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
      dispatch(removeUser())
      return navigate("/")
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  // Determine where DevTinder logo should link to
  const logoDestination = user ? "/feed" : "/"

  return (
    <div
      className={`navbar shadow-none border-none absolute top-0 left-0 right-0 z-50 ${
        isTransparentPage ? "bg-transparent" : "bg-white/95 backdrop-blur-sm border-b border-gray-200"
      }`}
    >
      <div className="flex-1">
        <Link
          to={logoDestination}
          className={`text-3xl md:text-4xl font-bold transition-opacity hover:opacity-80 ${
            isTransparentPage
              ? "text-white drop-shadow-lg"
              : "text-transparent bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text"
          }`}
        >
          DevTinder
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        {/* Show Login button when user is not logged in - Increased Size */}
        {!user && (
          <Link
            to="/login"
            className={`font-semibold py-3 px-8 rounded-full text-base transition-all duration-200 ${
              isTransparentPage
                ? "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 hover:border-white/50"
                : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            Login
          </Link>
        )}

        {/* Show user menu when logged in */}
        {user && (
          <>
            <div className={`text-sm hidden md:block ${isTransparentPage ? "text-white/90" : "text-gray-600"}`}>
              Welcome,{" "}
              <span className={`font-medium ${isTransparentPage ? "text-white" : "text-gray-800"}`}>
                {user.firstName}
              </span>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className={`btn btn-ghost btn-circle avatar transition-colors ${
                  isTransparentPage ? "hover:bg-white/20" : "hover:bg-pink-50"
                }`}
              >
                <div className="w-10 rounded-full ring-2 ring-pink-200">
                  <img
                    alt="user photo"
                    src={user.photoUrl || "/placeholder.svg?height=40&width=40"}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-xl z-[1] mt-3 w-52 p-2 shadow-lg border border-gray-200"
              >
                <li>
                  <Link to="/profile" className="justify-between hover:bg-pink-50 rounded-lg transition-colors">
                    Profile
                    <span className="badge badge-secondary bg-pink-100 text-pink-700 border-pink-200">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="hover:bg-pink-50 rounded-lg transition-colors">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="hover:bg-pink-50 rounded-lg transition-colors">
                    Requests
                  </Link>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className="text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default NavBar
