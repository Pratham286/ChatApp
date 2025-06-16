import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchedUserProfile from "../components/SearchedUserProfile";
import { useMyContext } from "../context/ContextProvider";
import GroupMember from "../components/GroupMember";
import axios from "axios";

const ChatDetails = () => {
  const location = useLocation();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { user } = useMyContext();
  const { chat } = location.state || {};
  console.log(chat);
  const navigate = useNavigate();

  const [chatData, setChatData] = useState(chat);
  const [showForm, setShowForm] = useState(false);

  const [addedUser, setAddedUser] = useState([user._id]);
  //   console.log(user)
  const friends = user.friends;

  const addUser = (userId) => {
    // console.log(addedUser)
    setAddedUser((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const refreshChatDetails = async () => {
    const response = await axios.get(
      `http://localhost:3000/chat/get/${chat._id}`,
      {
        withCredentials: true,
      }
    );
    // console.log(response.data.chatDetails)
    setChatData(response.data.chatDetails);
  };

  const chatAdmins = chatData.chatAdmin;
  // const chatMembers = chat.chatMember.filter(member => !chat.chatAdmin.includes(member._id));
  // // console.log(chatAdmins);
  const adminIds = chatData.chatAdmin.map((admin) => admin._id);
  const chatMembers = chatData.chatMember.filter(
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
  
  // const chatMemberId = 
  const memberIds = chatData.chatMember.map((mem) => mem._id);
  const toAdd = friends.filter(
    (fr) => !memberIds.includes(fr._id)
  );
  const handleAddUser = async (e) => {
    e.preventDefault();
    if(addedUser.length == 0)
    {
        alert("Add atleast 1 user")
    }
    else{
        const groupData = {
            userId: addedUser,
        }
        try {
            const response = await axios.put(`http://localhost:3000/chat/addgroup/${chat._id}`, groupData, {withCredentials: true});

            // console.log("created");
            if(response.status === 200)
            {
                console.log("Added");
                navigate(0)
            }
        } catch (error) {
            console.log(error);
        }
    }
  };
  return (
    <div className="min-h-screen">
      <h4>{chatData.chatName}</h4>
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
                  userId={u._id}
                  chatId={chat._id}
                  handleRefresh={refreshChatDetails}
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
                  userId={u._id}
                  chatId={chat._id}
                  handleRefresh={refreshChatDetails}
                />
              </div>
            ))}
        </div>
        {isUserAdmin && (
          <div>
            <button
              type="button"
              className="bg-blue-700 rounded text-white px-2 py-1 mx-1"
              onClick={() => {
                setShowForm(true);
              }}
            >
              Add member
            </button>
          </div>
        )}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Create Group</h2>
              <form onSubmit={handleAddUser}>
                <div className="bg-blue">
                  {toAdd.length > 0 &&
                    toAdd.map((u, i) => (
                      <SearchedUserProfile
                        key={i}
                        username={u.username}
                        handleClick={() => addUser(u._id)}
                        isSelected={addedUser.includes(u._id)}
                      />
                    ))}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setAddedUser([]);
                    }}
                    className="bg-gray-500 text-white px-3 py-1 rounded mr-2 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDetails;
