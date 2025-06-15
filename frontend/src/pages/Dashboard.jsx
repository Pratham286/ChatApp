import React from "react";
import { useMyContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useMyContext();
  const navigate = useNavigate();
  // console.log(user);
  return (
    <div className="min-h-screen m-3">
      <div className="flex gap-2 flex-column">
        {/* <div className="inline-block"> */}
        <button
          onClick={() => {
            navigate("/searchuser");
          }}
          type="button"
          className="bg-blue-700 rounded text-white px-2.5 py-1"
        >
          Search Users
        </button>
        <button
          onClick={() => {
            navigate("/chats");
          }}
          type="button"
          className="bg-blue-700 rounded text-white px-2.5 py-1"
        >
          Chat With friends
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
