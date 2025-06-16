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
  const [typingUser, setTypingUser] = useState("Someone");

  const [messageAction, setMessageAction] = useState(false);
  const [msgId, setMsgId] =useState("")

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
      console.log(username);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl border border-gray-300 p-4 bg-white rounded-lg shadow">
        <div
          onClick={() => {
            navigate("/chatdetails", { state: { chat: chat } });
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
                  className={`mb-2 p-2 rounded max-w-[75%] relative ${
                    isMyMessage
                      ? "bg-blue-500 text-white self-end ml-auto text-right"
                      : "bg-gray-300 text-black self-start mr-auto text-left"
                  }`}
                >
                  {msg.deleted ? <p className="text-sm break-words h-10">This message this deleted</p> : <div>
                     <p className="text-sm break-words">{msg.content}
                    {msg.edited && <>  (edited)</>}
                  </p>
                  <p className="text-xs text-gray-100 mt-1">
                    {isMyMessage ? "You" : msg.sender?.username || "Unknown"}
                    
                  </p>
                    </div>} 
                 
                  <div>
                    {isMyMessage && (
                      <button
                        onClick={() => {
                          setMsgId(msg._id)
                          setMessageAction(true);
                        }}
                        className="absolute left-2 bottom-2.25 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        ⋮
                      </button>
                    )}
                    {messageAction && (
                      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="flex items-center m-3">
                          <button
                            type="button"
                            className="bg-blue-700 rounded text-white px-2 py-1 mx-1"
                            onClick={() => {
                              setIsEdit(true);
                            }}
                          >
                            Edit Message
                          </button>
                          <button
                            type="button"
                            className="bg-blue-700 rounded text-white px-2 py-1 mx-1"
                            onClick={() => {setIsDelete(true)}}
                          >
                            Delete Message
                          </button>
                          <button
                            onClick={() => setMessageAction(false)}
                            type="button"
                            className="bg-red-700 rounded text-white px-2 py-1 mx-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    {isEdit && (
                      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-black p-6 rounded shadow-lg w-96">
                          <h2 className="text-xl font-semibold mb-4">
                            Edit Message
                          </h2>
                          <form
                            onSubmit={(e) => handleEdit({e, msgId: msgId})}
                            className=""
                          >
                            <div className="mb-3">
                              <label className="block mb-1">Message</label>
                              <input
                                value={editMessage}
                                onChange={(e) => setEditMessage(e.target.value)}
                                type="text"
                                className="w-full border px-3 py-2 rounded"
                              />
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => {setIsEdit(false)
                                  setEditMessage("");
                                }}
                                className="bg-gray-500 text-white px-3 py-1 rounded mr-2 hover:bg-gray-600"
                                >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                // onClick={() => {handleEdit}}
                              >
                                Edit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                    {isDelete && (
                      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-black p-6 rounded shadow-lg w-96">
                          <h2 className="text-xl font-semibold mb-4">
                            Delete Message
                          </h2>
                          <button
                            type="button"
                            onClick={() => setIsDelete(false)}
                            className="bg-gray-500 text-white px-3 py-1 rounded mr-2 hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            onClick={(e) => handleDelete({e, msgId: msgId})}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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
              {typingUser} is typing...
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
