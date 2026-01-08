import { useState, useEffect, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const ConversationsPage = ({ role = "donor" }) => {
  const { backendUrl, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);

  const theme = role === "ngo"
    ? { bg: "bg-green-50", primary: "bg-green-600", accent: "text-green-600" }
    : { bg: "bg-[#fffdf7]", primary: "bg-orange-400", accent: "text-orange-500" };

  useEffect(() => {
    axios
      .get(`${backendUrl}/conversations/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setConversations(res.data));
  }, []);

  return (
    <div className={`min-h-screen font-pop ${theme.bg}`}>
      {/* Header */}
      <div
        className={`px-6 py-4 text-white font-bold text-lg shadow-md ${theme.primary} border-b`}
      >
        Conversations
      </div>

      {/* Conversation List */}
      <div className="p-4 space-y-4">
        {conversations.map((conv) => (
          <div
            key={conv._id}
            onClick={() => navigate(`${conv._id}`)}
            className="flex items-center gap-4 bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer p-4 border border-gray-100 hover:border-gray-300"
          >
            {/* Avatar */}
            <div className="relative">
              <FaUserCircle size={44} className="text-gray-400" />
              {/* Status dot (optional) */}
              <span className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${theme.primary.replace("bg-", "bg-")}`}></span>
            </div>

            {/* Conversation Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">
                {role === "ngo" ? conv.donor.name : conv.ngo.name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {conv.lastMessage || "No messages yet"}
              </p>
            </div>

            {/* Timestamp */}
            <div className="text-right text-xs text-gray-400 whitespace-nowrap">
              {conv.lastMessageAt
                ? new Date(conv.lastMessageAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </div>
          </div>
        ))}

        {/* Empty state */}
        {conversations.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            <FaUserCircle size={50} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No conversations yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationsPage;