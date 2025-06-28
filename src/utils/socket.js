import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    // Local development - connect to local backend
    return io(BASE_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true
    });
  } else {
    // 🔧 PRODUCTION - Connect to your deployed backend URL
    return io("https://devtinder-backend-yhxb.onrender.com", { 
      transports: ['websocket', 'polling'],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
  }
};