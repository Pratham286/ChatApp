import React from "react";

const SearchedUserProfile = ({ username, fullname, handleClick, isSelected }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        onClick={handleClick}
        className={`m-3 border w-[350px] p-2 rounded cursor-pointer transition duration-200 ${
          isSelected ? "bg-blue-200" : "bg-white"
        } hover:bg-blue-100`}
      >
        <h3 className="text-lg font-semibold">{username}</h3>
        <h2 className="text-sm text-gray-600">{fullname}</h2>
      </div>
    </div>
  );
};

export default SearchedUserProfile;
