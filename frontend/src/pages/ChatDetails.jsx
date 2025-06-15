import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchedUserProfile from "../components/SearchedUserProfile";
import { useMyContext } from "../context/ContextProvider";
import GroupMember from "../components/GroupMember";

const ChatDetails = () => {
  const location = useLocation();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { user } = useMyContext();
  const { chat } = location.state || {};
  console.log(chat);
  const navigate = useNavigate();

  const chatAdmins = chat.chatAdmin;
  // const chatMembers = chat.chatMember.filter(member => !chat.chatAdmin.includes(member._id));
  // // console.log(chatAdmins);
  const adminIds = chat.chatAdmin.map((admin) => admin._id);
  const chatMembers = chat.chatMember.filter(
    (member) => !adminIds.includes(member._id)
  );
  useEffect(() => {
    if (adminIds.includes(user._id)) {
      // console.log("Yes");
      setIsUserAdmin(true);
    }
  }, []);
  //   console.log(chatMembers);
  const handleProfile = (u) => {
    const userId = u._id;
    navigate("/userprofile", {
      state: {
        userId: userId,
      },
    });
  };
  return (
    <div className="min-h-screen">
      <h4>{chat.chatName}</h4>
      <div>
        <h3> Group Members</h3>
        <div>
          {chatAdmins.length > 0 &&
            chatAdmins.map((u, i) => (
              <div key={i} className="flex">
                <GroupMember
                  isAdmin={true}
                  key={i}
                  username={u.username}
                  fullname={u.firstname + " " + u.lastname}
                  handleClick={() => handleProfile(u)}
                  isUserAdmin={isUserAdmin}
                />
              </div>
            ))}
          {chatMembers.length > 0 &&
            chatMembers.map((u, i) => (
              <div key={i} className="flex">
                <GroupMember
                  isAdmin={false}
                  key={i}
                  username={u.username}
                  fullname={u.firstname + " " + u.lastname}
                  handleClick={() => handleProfile(u)}
                  isUserAdmin={isUserAdmin}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
