import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/ContextProvider";
import axios from "axios";

const GroupMember = ({
  username,
  fullname,
  handleClick,
  isAdmin,
  isUserAdmin,
  userId,
  chatId,
  handleRefresh,
}) => {
  const [showAction, setShowAction] = useState(false);
  const toggleMenu = () => {
    setShowAction(!showAction);
  };
  const [isSameUser, setIsSameUser] = useState(false);
  const { user } = useMyContext();
//   console.log(chatId)
  useEffect(() => {
    if (userId === user._id) {
      setIsSameUser(true);
    }
  }, []);
  const handleAddAdmin = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/chat/makegroupadmin/${chatId}`, {userId: userId} ,{
        withCredentials: true,
      });
    //   console.log("") 
    if(response.status === 200)
    {
        console.log("Success")
        handleRefresh();
    }
} catch (error) {
    console.log(error)
}
};
const handleRemoveAdmin = async () => {
    try {
        const response = await axios.put(`http://localhost:3000/chat/removegroupadmin/${chatId}`, {userId: userId} ,{
            withCredentials: true,
        });
        //   console.log("") 
        if(response.status === 200)
            {
                handleRefresh();
                console.log("Success")
    }
    } catch (error) {
        console.log(error)
    }
  };
  const handleRemoveUser = async () => {
    try {
        const response = await axios.put(`http://localhost:3000/chat/removeuser/${chatId}`, {userId: userId} ,{
            withCredentials: true,
        });
        //   console.log("") 
        if(response.status === 200)
            {
                handleRefresh();
                console.log("Success")
    }
    } catch (error) {
        console.log(error)
    }
    
  };
  return (
    <div>
      <div className="flex items-center ">
        <div
          onClick={handleClick}
          className={`relative m-3 border w-[350px] p-2 rounded cursor-pointer transition duration-200 bg-white hover:bg-blue-100 flex`}
        >
          <h3 className="text-lg font-semibold">{username}</h3>
          {isAdmin && <h2 className="text-lg absolute right-2">Admin</h2>}
        </div>
        {isUserAdmin && !isSameUser && (
          <div className="flex items-center">
            <button className="border px-1" onClick={toggleMenu}>
              ⋮
            </button>
            {showAction && isAdmin && (
              <div className="flex items-center m-3">
                <button
                  type="button"
                  className="bg-blue-700 rounded text-white px-2 py-1 mx-1"
                  onClick={handleRemoveAdmin}
                >
                  Remove Admin
                </button>
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="bg-red-700 rounded text-white px-2 py-1 mx-1"
                >
                  Cancel
                </button>
              </div>
            )}
            {showAction && !isAdmin && (
              <div className="flex items-center m-3">
                <button
                  type="button"
                  className="bg-blue-700 rounded text-white px-2 py-1 mx-1"
                  onClick={handleAddAdmin}
                >
                  Make Admin
                </button>
                <button
                  type="button"
                  className="bg-blue-700 rounded text-white px-2 py-1 mx-1"
                  onClick={handleRemoveUser}
                >
                  Remove
                </button>
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="bg-red-700 rounded text-white px-2 py-1 mx-1"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupMember;
