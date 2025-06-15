import React, { useState } from "react";

const GroupMember = ({
  username,
  fullname,
  handleClick,
  isAdmin,
  isUserAdmin,
}) => {
  const [showAction, setShowAction] = useState(false);
  const toggleMenu = () => {
    setShowAction(!showAction);
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
        {isUserAdmin && (
          <div className="flex items-center">
            <button className="border px-1" onClick={toggleMenu}>
              ⋮
            </button>
            {showAction && (
              <div className="flex items-center m-3">
                <button
                  type="button"
                  className="bg-blue-700 rounded text-white px-2 py-1 mx-1"
                >
                  Make Admin
                </button>
                <button
                  type="button"
                  className="bg-blue-700 rounded text-white px-2 py-1 mx-1"
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
