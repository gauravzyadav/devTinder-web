"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { addRequests, removeRequest } from "../utils/requestSlice"

const Request = () => {
  const requests = useSelector((store) => store.requests)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

 // ✅ UPDATED: Review connection requests (accept/reject)
const reviewRequest = async (status, _id) => {
  try {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    
    const res = await axios.post(
      BASE_URL + "/request/review/" + status + "/" + _id, 
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    
    dispatch(removeRequest(_id));
  } catch (err) {
    if (err.response?.status === 401) {
      localStorage.removeItem("authToken");
      navigate("/login");
    }
    console.error("Error reviewing request:", err);
  } finally {
    setLoading(false);
  }
};

// ✅ UPDATED: Fetch pending requests
const fetchRequests = async () => {
  try {
    const token = localStorage.getItem("authToken");
    
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    
    dispatch(addRequests(res.data.data));
  } catch (err) {
    if (err.response?.status === 401) {
      localStorage.removeItem("authToken");
      navigate("/login");
    }
    console.error("Error fetching requests:", err);
  }
};

  useEffect(() => {
    fetchRequests()
  }, [])

  if (!requests) return

  if (requests.length === 0)
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="mx-auto h-24 w-24 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Connection Requests</h1>
          <p className="text-gray-600">You don't have any pending connection requests at the moment.</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Connection Requests</h1>
          <p className="text-gray-600">
            {requests.length} {requests.length === 1 ? "person wants" : "people want"} to connect with you
          </p>
        </div>

        {/* Requests Grid */}
        <div className="space-y-4">
          {requests.map((request) => {
            const { _id, firstName, lastName, gender, photoUrl, age, about } = request.fromUserId

            return (
              <div
                key={_id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  {/* User Info */}
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative">
                      <img
                        alt="profile"
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                        src={photoUrl || "/placeholder.svg"}
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {firstName} {lastName}
                      </h3>
                      {age && gender && (
                        <p className="text-sm text-gray-500 mb-1">
                          {age} years old • {gender}
                        </p>
                      )}
                      {about && <p className="text-sm text-gray-700 line-clamp-2 max-w-md">{about}</p>}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 ml-4">
                    <button
                      onClick={() => reviewRequest("rejected", request._id)}
                      disabled={loading}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Decline
                    </button>

                    <button
                      onClick={() => reviewRequest("accepted", request._id)}
                      disabled={loading}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Accept
                    </button>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Wants to connect with you</span>
                    <span>Just now</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Info */}
        {requests.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Review each request carefully. Accepted connections will be able to message you.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Request
