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
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    showForm && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Create Group</h2>
          <form onSubmit={createGroup}>
            <div className="mb-3">
              <label className="block mb-1">Group Name</label>
              <input
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                type="text"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="bg-blue">
              {friends.length > 0 &&
                friends.map((u, i) => (
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
                  setShowForm(false)
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
    )
    // </div>
  );
};

export default Popup;
