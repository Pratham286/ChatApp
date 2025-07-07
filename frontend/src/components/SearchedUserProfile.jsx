//checked
import React from "react";
import { User, ArrowRight } from "lucide-react";

const SearchedUserProfile = ({ username, fullname, handleClick}) => {
  return (
    <div
      onClick={handleClick}
      className={`flex items-center p-6 cursor-pointer transition-all duration-200 group hover:bg-gray-50`}
    >
      {/* Avatar Section */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors duration-200 bg-gray-100 group-hover:bg-blue-100`}>
        <User className={`h-6 w-6 text-gray-500 group-hover:text-blue-600`} />
      </div>

      {/* User Info Section */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {username}
        </h3>
        <p className="text-sm text-gray-600">
          {fullname}
        </p>
      </div>
      <div className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200">
                <ArrowRight className="h-5 w-5" />
              </div>

    </div>
  );
};

export default SearchedUserProfile;