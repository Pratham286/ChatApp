import React, { useState } from "react";
import { useMyContext } from "../context/ContextProvider";
import SearchedUserProfile from "./SearchedUserProfile";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Popup = ({ showForm, setShowForm }) => {
  const [groupName, setGroupName] = useState("");
  const { user } = useMyContext();
  const [addedUser, setAddedUser] = useState([user._id]);
  //   console.log(user)
  const friends = user.friends;

  const navigate = useNavigate();

  const addUser = (userId) => {
    // console.log(addedUser)
    setAddedUser((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const createGroup = async (e) => {
    e.preventDefault();
    if(groupName.trim() === "")
    {
        alert("Group Name can not be empty")
    }
    else if(addedUser.length <=2)
    {
        alert("Add atleast 2 users")
    }
    else{
        const groupData = {
            userArr: addedUser,
            chatName: groupName,
        }
        try {
            const response = await axios.post(`http://localhost:3000/chat/create`, groupData, {withCredentials: true});

            // console.log("created");
            if(response.status === 200)
            {
                console.log("created");
                navigate(0)
            }
        } catch (error) {
            console.log(error);
        }
    }
  }
  return (
    showForm && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Create New Group</h2>
            <p className="text-blue-100 text-sm mt-1">Connect with your friends in a new group chat</p>
          </div>
          
          <form onSubmit={createGroup} className="flex flex-col h-full">
            {/* Group Name Input */}
            <div className="p-6 border-b border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Group Name
              </label>
              <input
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                type="text"
                placeholder="Enter group name..."
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
              />
            </div>

            {/* Friends List */}
            <div className="flex-1 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Select Friends ({addedUser.length - 1} selected)
                </h3>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {friends.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {friends.map((u, i) => (
                      <div key={i} className="hover:bg-gray-50 transition-colors duration-150">
                        <SearchedUserProfile
                          username={u.username}
                          handleClick={() => addUser(u._id)}
                          isSelected={addedUser.includes(u._id)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <p className="text-sm">No friends available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setAddedUser([]);
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-3 rounded-lg transition-colors duration-200 border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-4 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Create Group
                </button>
              </div>
              
              {/* Helper Text */}
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">
                  Need at least 2 friends to create a group
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Popup;