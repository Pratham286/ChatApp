import axios from "axios";
import { io, Socket } from "socket.io-client";
import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/ContextProvider";
import { ArrowLeft, Send, MoreVertical, Edit3, Trash2, X, Check } from "lucide-react";

const FullChat = () => {
  const location = useLocation();
  const { chatId } = location.state || {};
  const [chat, setChat] = useState();
  const [messageText, setMessageText] = useState("");
  const { user } = useMyContext();

  const socketRef = useRef();
  const messagesEndRef = useRef();
  const typingTimeoutRef = useRef(null);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("Someone");

  const [messageAction, setMessageAction] = useState(false);
  const [msgId, setMsgId] = useState("")
  const [hoveredMessage, setHoveredMessage] = useState(null);

  const [editMessage, setEditMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();

  // console.log(chatId);
  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      withCredentials: true,
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  useEffect(() => {
    socketRef.current.on("userTyping", ({ username }) => {
      setIsOtherTyping(true);
      setTypingUser(username);
      // console.log(username);
    });
    socketRef.current.on("userStoppedTyping", () => setIsOtherTyping(false));

    return () => {
      socketRef.current.off("userTyping");
      socketRef.current.off("userStoppedTyping");
    };
  }, []);

  useEffect(() => {
    if (!chatId || !socketRef.current) return;

    socketRef.current.emit("join", chatId);

    socketRef.current.on("receive", (message) => {
      setChat((prev) => ({
        ...prev,
        chatMessage: [...(prev?.chatMessage || []), message],
      }));
    });
    socketRef.current.on("editedMsg", (updatedMsg) => {
      setChat((prev) => ({
        ...prev,
        chatMessage: prev.chatMessage.map((msg) => 
        msg._id === updatedMsg._id ? updatedMsg : msg),
      }));
    });
    socketRef.current.on("deletedMsg", (deletedMsg) => {
      setChat((prev) => ({
        ...prev,
        chatMessage: prev.chatMessage.map((msg) => 
        msg._id === deletedMsg._id ? deletedMsg : msg),
      }));
    });

    return () => {
      socketRef.current.off("receive");
      socketRef.current.off("editedMsg");
      socketRef.current.off("deletedMsg");
    };
  }, [chatId]);
  // console.log(chat);
  useEffect(() => {
    const getChat = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/chat/get/${chatId}`,
          { withCredentials: true }
        );
        console.log(response.data.chatDetails);
        setChat(response.data.chatDetails);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getChat();
  }, []);

  const sendMessage = () => {
    // send message logic
    if (!messageText?.trim()) {
      return;
    }
    socketRef.current.emit("send", {
      chatId,
      message: messageText,
      sender: user._id,
    });

    setMessageText("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.chatMessage]);

  const handleTyping = (e) => {
    setMessageText(e.target.value);

    socketRef.current.emit("typing", { chatId, username: user.username });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("stopTyping", { chatId });
    }, 1000);
  };

  const handleDelete = async ({e, msgId}) =>{
    socketRef.current.emit("deletemsg", {
        chatId, 
        msgId: msgId,
      });
  }
  const handleEdit = async ({e, msgId}) =>{
    e.preventDefault();
    if(editMessage.trim() === "")
    {
      alert("It can not be Empty")
    }
    else{
      // console.log(msgId)
      socketRef.current.emit("editmsg", {
        chatId, 
        msgId: msgId,
        editMsg: editMessage,
      });
      setEditMessage("");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="max-w-4xl px-4 mx-6 bg-emerald-100 shadow-sm border-b border-gray-200 rounded-xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/chats")}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div
                onClick={() => {
                  navigate("/chatdetails", { state: { chat: chat } });
                }}
                className="cursor-pointer"
              >
                <h2 className="text-xl font-bold text-gray-900">
                  {chat?.chatName || 'Loading...'}
                </h2>
                {chat?.isGroupChat && <p className="text-sm text-gray-500">
                  {chat?.chatMember?.length || 0} members
                </p>}
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 pb-6 pt-1">
        <div className="bg-white rounded-2xl shadow-lg h-full flex flex-col">
          {/* Messages Area */}
          <div className="bg-emerald-50 flex-1 overflow-y-auto p-6 space-y-4 rounded-2xl">
            {chat?.chatMessage?.length ? (
              chat.chatMessage.map((msg, i) => {
                const isMyMessage = String(msg.sender?._id) === String(user._id);
                return (
                  <div
                    key={i}
                    className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                    onMouseEnter={() => setHoveredMessage(i)}
                    onMouseLeave={() => setHoveredMessage(null)}
                  >
                    <div className="flex items-center space-x-2">
                      {/* Action Button - Show on left for my messages */}
                      {isMyMessage && !msg.deleted && (
                        <button
                          onClick={() => {
                            setMsgId(msg._id);
                            setMessageAction(true);
                          }}
                          className={`p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all duration-200 ${
                            hoveredMessage === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                          }`}
                        >
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>
                      )}

                      <div
                        className={`relative rounded-2xl px-5 py-2 shadow-sm ${
                          isMyMessage
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {msg.deleted ? (
                          <div>
                            <p className="text-sm italic opacity-70 break-words leading-relaxed">
                              This message was deleted
                            </p>
                            <p className={`text-xs mt-1 ${
                              isMyMessage ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {!isMyMessage && msg.sender?.username}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm break-words leading-relaxed">
                              {msg.content}
                              {msg.edited && (
                                <span className="text-xs opacity-70 ml-2">
                                  (edited)
                                </span>
                              )}
                            </p>
                            <p className={`text-xs mt-1 ${
                              isMyMessage ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {!isMyMessage && msg.sender?.username}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No messages yet.</p>
                <p className="text-gray-400 text-sm mt-2">
                  Start the conversation by sending a message!
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Typing Indicator */}
          {isOtherTyping && (
            <div className="px-6 py-2 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-sm text-gray-500">
                  {typingUser} is typing...
                </p>
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={messageText}
                  onChange={handleTyping}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Type your message..."
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!messageText.trim()}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  messageText.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Action Modal */}
      {messageAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Message Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsEdit(true);
                    setMessageAction(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                >
                  <Edit3 className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Edit Message</span>
                </button>
                <button
                  onClick={() => {
                    setIsDelete(true);
                    setMessageAction(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors duration-200"
                >
                  <Trash2 className="h-5 w-5 text-red-600" />
                  <span className="text-gray-700">Delete Message</span>
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 p-4">
              <button
                onClick={() => setMessageAction(false)}
                className="w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Message Modal */}
      {isEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Edit Message</h3>
                <button
                  onClick={() => {
                    setIsEdit(false);
                    setEditMessage("");
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <form onSubmit={(e) => handleEdit({e, msgId: msgId})}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows="3"
                    placeholder="Enter your message..."
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEdit(false);
                      setEditMessage("");
                    }}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Check className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Message Modal */}
      {isDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Delete Message</h3>
                <button
                  onClick={() => setIsDelete(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this message? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDelete(false)}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    handleDelete({e, msgId: msgId});
                    setIsDelete(false);
                  }}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullChat;