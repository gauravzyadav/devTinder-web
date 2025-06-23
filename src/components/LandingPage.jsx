"use client"

import { useNavigate } from "react-router-dom"
import NavBar from "./NavBar"

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Full Screen */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('/images/indian-architecture-bg.png')`,
        }}
      />

      {/* Dark Overlay for better readability */}
      <div className="fixed inset-0 bg-black/60 z-10" />

      {/* NavBar */}
      <div className="relative z-50">
        <NavBar />
      </div>

      {/* Content Container - Moved Much Further Down */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center p-4 pt-64 pb-20">
        {/* Hero Section - Centered but Much Lower */}
        <div className="text-center w-full max-w-7xl mx-auto px-4">
          {/* Hero Title - Centered, No Subtitle */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-12 leading-none">
            Start something{" "}
            <span className="text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text">epic.</span>
          </h1>

          {/* Single Get Started Button - Centered */}
          <button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[200px] mb-64"
          >
            Get Started
          </button>

          {/* Features - Clean Layout Without Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            <div className="text-center px-4">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Find Your Match</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                Discover people who share your interests and values
              </p>
            </div>

            <div className="text-center px-4">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Start Conversations</h3>
              <p className="text-white/80 text-lg leading-relaxed">Break the ice with meaningful conversations</p>
            </div>

            <div className="text-center px-4">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Create Memories</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                Build lasting relationships and unforgettable experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
