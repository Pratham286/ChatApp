import React from "react";
import { useMyContext } from "../context/ContextProvider";

const FriendBox = ({ username, fullname, handleClick }) => {
  const { friendState, setFriendState } = useMyContext();
  return (
    <div className="flex justify-center items-center">
      <div onClick={handleClick} className="m-3 border w-[350px] p-2 rounded">
        <h3>{username}</h3>
        <h2>{fullname}</h2>
        {/* <div>
          {friendState.areTheyFriend && (
            <div>
              <h3>Message</h3>
            </div>
          ) }
        </div> */}
      </div>
    </div>
  );
};

export default FriendBox;
