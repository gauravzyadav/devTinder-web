"use client"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    if (userData) return;
    try {
      // 🔧 Get token from localStorage
      const token = localStorage.getItem("authToken");
      
      const res = await axios.get(BASE_URL + "/profile/view", {
        headers: {
          Authorization: `Bearer ${token}`, // 🔧 Add Authorization header
        },
        withCredentials: true, // Keep this for cookie fallback
      });
      
      dispatch(addUser(res.data));
    } catch (err) {
      // 🔧 Better error status checking
      if (err.response?.status === 401) {
        // 🔧 Clear token if unauthorized (token might be expired/invalid)
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser()
  }, [])

  // Check if we're on login or signup page to apply background styling
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup"

  return (
    <div className={isAuthPage ? "min-h-screen relative" : ""}>
      {/* Background for login and signup pages */}
      {isAuthPage && (
        <>
          <div
            className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: `url('/images/indian-architecture-bg.png')`,
            }}
          />
          <div className="fixed inset-0 bg-black/50 z-10" />
        </>
      )}

      <div className={isAuthPage ? "relative z-20" : ""}>
        <NavBar />
        <Outlet />
       
      </div>
    </div>
  )
}

export default Body
