import React from "react";
import { useMyContext } from "../context/ContextProvider";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ChatBar from "../components/ChatBar";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { user } = useMyContext();
  const [userChats, setUserChats] = useState([]);
  const [chatName, setChatName] = useState("DM");
  const navigate = useNavigate();
  // console.log(user._id)

  useEffect(() => {
    const getUserChat = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/chat/userchat`,
          { withCredentials: true }
        );
        console.log(response.data.chatDetails);
        setUserChats(response.data.chatDetails);
      } catch (error) {
        console.log("Error: ", error);
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

  return (
    <div className="min-h-screen">
      <div className="">
        {userChats.length > 0 &&
          userChats.map((ch, i) => (
            // <div></div>
            <ChatBar
              chatName={
                ch.isGroupChat
                  ? ch.chatName
                  : ch.chatMember.find((member) => member._id !== user._id)
                      ?.username || "Unknown"
              }
              chatLastmsg={
                ch.chatMessage.length > 0
                  ? (ch.chatMessage[0].sender._id === user._id
                      ? "Me"
                      : ch.chatMessage[0].sender.username) +
                    ": " +
                    ch.chatMessage[0].content
                  : "Start messaging"
              }
              handleClick={() => {
                userChat(ch._id);
              }}
              key={ch._id}
            />
          ))}
      </div>
    </div>
  );
};

export default Chat;
