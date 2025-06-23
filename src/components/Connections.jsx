"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Chat state
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = user?._id;

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChatMessages = async (targetUserId) => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
      setMessages(chatMessages || []);
    } catch (err) {
      console.error(err);
      setMessages([]);
    }
  };

  const handleChatClick = (connection) => {
    setSelectedUserId(connection._id);
    setSelectedUser(connection);
    fetchChatMessages(connection._id);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId: selectedUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  // Socket effect for real-time messaging
  useEffect(() => {
    if (!userId || !selectedUserId) {
      return;
    }

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId: selectedUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, selectedUserId]);

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length == 0)
    return (
      <div className="min-h-screen grid grid-cols-[1fr_2fr] pt-20">
        <div className="border-r border-gray-300 p-4">
          <h1 className="text-bold text-2xl mb-4">Messages</h1>
          <p className="text-gray-600">No Connection Found</p>
        </div>
        <div className="p-6">{/* Right side - blank for now */}</div>
      </div>
    );

  return (
    <div className="min-h-screen grid grid-cols-[1fr_2fr] pt-20">
      {/* Left side - Connections (Narrower) */}
      <div className="border-r border-gray-300 p-4 overflow-y-auto">
        <h1 className="text-black font-bold  text-2xl mb-6">Messages</h1>

        <div className="space-y-3">
          {connections.map((connection) => {
            const { _id, firstName, lastName, gender, photoUrl, age, about } =
              connection;

            return (
              <div
                key={_id}
                className={`flex p-3 rounded-lg border border-gray-200 transition-colors ${
                  selectedUserId === _id
                    ? "bg-blue-50 border-blue-300"
                    : "bg-base-300"
                }`}
              >
                <div className="flex-shrink-0">
                  <img
                    alt="photo"
                    className="w-12 h-12 rounded-full object-cover"
                    src={photoUrl || "/placeholder.svg"}
                  />
                </div>
                <div className="flex-1 mx-3 min-w-0">
                  <h2 className="font-bold text-base truncate">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-xs text-gray-600">
                      {age + ", " + gender}
                    </p>
                  )}
                  <p className="text-xs text-gray-700 mt-1 line-clamp-2">
                    {about}
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <button
                    onClick={() => handleChatClick(connection)}
                    className="btn btn-primary btn-xs"
                  >
                    Chat
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side - Chat (Wider) */}
      <div className="p-6 bg-gray-50 flex flex-col">
        {selectedUser ? (
          // Chat Interface in a Box
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 h-full flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <img
                alt="chat user"
                className="w-10 h-10 rounded-full object-cover"
                src={selectedUser.photoUrl || "/placeholder.svg"}
              />
              <div>
                <h2 className="font-bold text-lg">
                  {selectedUser.firstName + " " + selectedUser.lastName}
                </h2>
              </div>
            </div>

            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ maxHeight: "calc(100vh - 300px)" }}
            >
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-300 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isCurrentUser = user.firstName === msg.firstName;
                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isCurrentUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-sm lg:max-w-md px-4 py-2 rounded-lg break-words ${
                          isCurrentUser
                            ? "bg-blue-500 text-white rounded-br-sm"
                            : "bg-gray-200 text-gray-800 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isCurrentUser ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {msg.firstName} {msg.lastName}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex items-center gap-3">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                />
                <button
                  onClick={sendMessage}
                  className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={!newMessage.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg
                className="mx-auto h-16 w-16 text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-lg">Select a connection to start chatting</p>
              <p className="text-sm mt-2">
                Choose someone from your connections to begin a conversation
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
