//checked
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
        <div className="bg-white rounded-xl shadow-md w-full max-w-md max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white text-center">Create New Group</h2>
          </div>
          
          <form onSubmit={createGroup} className="flex flex-col h-full">
            {/* Group Name Input */}
            <div className="flex px-3 py-6 border-b border-gray-100">
              <label className="text-sm font-semibold text-gray-700 mr-2">
                Group Name
              </label>
              <input
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                type="text"
                placeholder="Enter group name..."
                className="w-full border-2 border-gray-200 px-2 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
              />
            </div>

            {/* Friends List */}
            <div className="flex-1 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Select Friends ({addedUser.length -1} selected)
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
                    setAddedUser([user._id]);
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