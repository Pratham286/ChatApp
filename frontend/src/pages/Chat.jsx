import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Users, Search, Plus, ArrowLeft, MessageSquarePlus } from "lucide-react";
import axios from "axios";
import ChatBar from "../components/ChatBar";
import Popup from "../components/PopupForm";

const Chat = () => {
  const { user } = useMyContext();
  const [userChats, setUserChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getUserChat = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/chat/userchat`,
          { withCredentials: true }
        );
        // console.log(response.data.chatDetails);
        setUserChats(response.data.chatDetails);
        setError(null);
      } catch (error) {
        console.log("Error: ", error);
        setError("Failed to load chats. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getUserChat();
  }, []);

  const userChat = (chatId) => {
    navigate("/fullchat", {
      state: {
        chatId: chatId,
      },
    });
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };
  
  const handleCreateChat = () => {
    setShowForm(true);
  };
  const handleSearchUsers = () => {
    // setShowForm(true);
    navigate("/searchuser");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToDashboard}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-md transition-all duration-200 hover:bg-gray-50"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Your Conversations
              </h1>
              <p className="text-gray-600 mt-1">
                {userChats.length} {userChats.length === 1 ? 'chat' : 'chats'} available
              </p>
            </div>
          </div>
          <button
            onClick={handleCreateChat}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-xl flex items-center space-x-2"
          >
            <MessageSquarePlus className="h-5 w-5" />
            <span className="hidden sm:inline">Create Group Chat</span>
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Chat List */}
        <div className="space-y-3">
          {userChats.length > 0 ? (
            userChats.map((ch) => (
              <div
                key={ch._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
              >
                <ChatBar
                  chatName={
                    ch.isGroupChat
                      ? ch.chatName
                      : ch.chatMember.find((member) => member._id !== user._id)
                          ?.username || "Unknown User"
                  }
                  chatLastmsg={
                    ch.chatMessage.length > 0
                      ? (ch.chatMessage[0].sender._id === user._id
                          ? "You"
                          : ch.chatMessage[0].sender.username) +
                        ": " +
                        ch.chatMessage[0].content
                      : "Start your conversation"
                  }
                  handleClick={() => {
                    userChat(ch._id);
                  }}
                  isGroupChat={ch.isGroupChat}
                />
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No conversations yet
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Start connecting with friends and begin your first conversation. 
                  Search for users to send your first message.
                </p>
                <button
                  onClick={handleSearchUsers}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-md hover:shadow-xl flex items-center justify-center mx-auto group"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Find People to Chat With
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {userChats.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={handleSearchUsers}
                className="flex items-center justify-center space-x-3 bg-blue-50 hover:bg-blue-100 text-blue-700 px-6 py-4 rounded-xl font-semibold transition-all duration-200"
              >
                <Search className="h-5 w-5" />
                <span>Find More Friends</span>
              </button>
              <button
                onClick={handleBackToDashboard}
                className="flex items-center justify-center space-x-3 bg-purple-50 hover:bg-purple-100 text-purple-700 px-6 py-4 rounded-xl font-semibold transition-all duration-200"
              >
                <Users className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <Popup showForm={showForm} setShowForm={setShowForm}/>
    </div>
  );
};

export default Chat;