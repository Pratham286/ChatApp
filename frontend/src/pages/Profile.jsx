import React, { useState } from "react";
import { useMyContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import Popup from "../components/PopupForm";

const Profile = () => {
  const { user } = useMyContext();
  const userId = user._id;
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  // const handleOpenForm = () => setShowForm(true);
  // const handleCloseForm = () => setShowForm(false);

  const handleShowFriends = () => {
    navigate("/friends", {
      state: {
        userId,
      },
    });
  };
  const createChat = () => {
    setShowForm(true)
  };
  return (
    <div className="min-h-screen">
      <h3>{user.username}</h3>
      <h2>{user.firstname + " " + user.lastname}</h2>
      <h2>{user.friends.length}</h2>
      <button
        onClick={handleShowFriends}
        type="button"
        className="bg-blue-700 rounded text-white px-2.5 py-1"
      >
        Show Friends
      </button>
      <button
        onClick={createChat}
        type="button"
        className="bg-blue-700 rounded text-white px-2.5 py-1"
      >
        Create A Chat Group
      </button>
      <Popup showForm={showForm} setShowForm={setShowForm}/>
    </div>
  );
};

export default Profile;
