import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-white/10 text-white py-4">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Left - Brand Name */}
          <div>
            <h3 className="text-lg font-bold text-white">DevTinder</h3>
          </div>

          {/* Center - Developer Credit */}
          <div className="flex-1 text-center">
            <p className="text-black text-sm">
              Designed and Developed by{" "}
              <span className="text-pink-500 font-semibold">Gaurav </span>
            </p>
          </div>

          {/* Right - Empty space */}
          <div className="w-20" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
