import axios from "axios";
// import { Socket } from "net";
import { io, Socket } from "socket.io-client";
import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/ContextProvider";

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
    socketRef.current.on("userTyping", () => setIsOtherTyping(true));
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

    return () => {
      socketRef.current.off("receive");
    };
  }, [chatId]);

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

    socketRef.current.emit("typing", chatId);

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("stopTyping", chatId);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl border border-gray-300 p-4 bg-white rounded-lg shadow">
        <div
          onClick={() => {
            navigate("/chatdetails", { state: { chat: chat} });
          }}
        >
          <h2 className="text-xl font-semibold mb-4">{chat?.chatName}</h2>
        </div>

        <div className="h-96 overflow-y-auto border border-gray-200 p-3 rounded mb-4 bg-gray-100">
          {chat?.chatMessage?.length ? (
            chat.chatMessage.map((msg, i) => {
              const isMyMessage = String(msg.sender?._id) === String(user._id);
              return (
                <div
                  key={i}
                  className={`mb-2 p-2 rounded max-w-[75%] ${
                    isMyMessage
                      ? "bg-blue-500 text-white self-end ml-auto text-right"
                      : "bg-gray-300 text-black self-start mr-auto text-left"
                  }`}
                >
                  <p className="text-sm break-words">{msg.content}</p>
                  <p className="text-xs text-gray-100 mt-1">
                    {isMyMessage ? "You" : msg.sender?.name || "Unknown"}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">No messages yet.</p>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div>
          {isOtherTyping && (
            <p className="text-sm text-gray-500 italic mb-2">
              Someone is typing...
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={handleTyping}
            className="flex-grow px-3 py-2 border border-gray-300 rounded"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullChat;
