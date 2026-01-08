import React, { useEffect, useRef, useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import socket from "../socket";

const NotificationsChat = ({ role = "donor" }) => {
  const { backendUrl, token } = useContext(UserContext);
  const { conversationId } = useParams();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const theme =
    role === "ngo"
      ? {
        bg: "#F1F8E9",
        primary: "#43A047",
        bubble: "#C8E6C9",
        text: "#1B5E20",
      }
      : {
        bg: "#FFF8F1",
        primary: "#FB8C00",
        bubble: "#FFE0B2",
        text: "#E65100",
      };

  // Load existing messages
  useEffect(() => {
    axios
      .get(`${backendUrl}/messages/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data));
  }, [conversationId]);

  // Socket listeners
  useEffect(() => {
    socket.emit("joinRoom", conversationId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [conversationId]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const payload = { conversationId, text: input };

    const { data } = await axios.post(`${backendUrl}/messages/`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setInput("");
  };

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen w-full flex flex-col font-pop">
      {/* HEADER */}
      <div
        className="px-6 py-4 text-white font-semibold shadow-md border-b"
        style={{ backgroundColor: theme.primary }}
      >
        Notifications & Messages
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 ">
        {messages.map((msg) => {
          const isMe = msg.sender.role === role;

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <FaUserCircle
                  size={28}
                  className="mr-2 text-gray-400 shrink-0"
                />
              )}

              <div
                className="max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm"
                style={{
                  backgroundColor: isMe ? theme.primary : theme.bubble,
                  color: isMe ? "#ffffff" : theme.text,
                }}
              >
                <p
                  className={`text-[0.75rem] ${isMe ? "text-right pl-4" : "text-left pr-4"
                    }`}
                >
                  {msg.sender.name}
                </p>
                <p
                  className={`w-full h-[0.1px] ${isMe ? "bg-gray-300" : "bg-gray-400"
                    } mb-2 px-2`}
                ></p>
                <p className="break-words text-sm">{msg.text}</p>
                <p className="text-[10px] mt-1 opacity-70 text-right">
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : ""}
                </p>
              </div>

              {isMe && (
                <FaUserCircle
                  size={28}
                  className="ml-2 text-gray-400 shrink-0"
                />
              )}
            </div>
          );
        })}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT BAR */}
      <div className="border-t px-2 sm:px-4 py-3 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 sm:px-4 py-2 border rounded-full outline-none focus:ring-2"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 sm:px-6 py-2 rounded-full text-white font-medium transition"
          style={{ backgroundColor: theme.primary }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default NotificationsChat;