//export const BASE_URL = "http://localhost:3000";

// utils/constants.js
// export const BASE_URL = "https://dev-tinder-backend-blue.vercel.app"


export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://devtinder-backend-yhxb.onrender.com";