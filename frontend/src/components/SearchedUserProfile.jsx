import React from "react";
import { User, ArrowRight, Check } from "lucide-react";

const SearchedUserProfile = ({ username, fullname, handleClick, isSelected = false }) => {
  return (
    <div
      onClick={handleClick}
      className={`flex items-center p-6 cursor-pointer transition-all duration-200 group border-l-4 ${
        isSelected 
          ? 'bg-blue-50 border-l-blue-500 shadow-sm' 
          : 'bg-white border-l-transparent hover:bg-gray-50 hover:border-l-gray-200'
      }`}
    >
      {/* Avatar Section */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors duration-200 ${
        isSelected 
          ? 'bg-blue-100' 
          : 'bg-gray-100 group-hover:bg-blue-100'
      }`}>
        <User className={`h-6 w-6 transition-colors duration-200 ${
          isSelected 
            ? 'text-blue-600' 
            : 'text-gray-500 group-hover:text-blue-600'
        }`} />
      </div>

      {/* User Info Section */}
      <div className="flex-1">
        <h3 className={`text-lg font-semibold mb-1 transition-colors duration-200 ${
          isSelected 
            ? 'text-blue-900' 
            : 'text-gray-900'
        }`}>
          {username}
        </h3>
        <p className={`text-sm transition-colors duration-200 ${
          isSelected 
            ? 'text-blue-700' 
            : 'text-gray-600'
        }`}>
          {fullname}
        </p>
      </div>

      {/* Action Icon */}
      <div className={`transition-all duration-200 ${
        isSelected 
          ? 'text-blue-600' 
          : 'text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1'
      }`}>
        {isSelected ? (
          <Check className="h-5 w-5" />
        ) : (
          <ArrowRight className="h-5 w-5" />
        )}
      </div>
    </div>
  );
};

export default SearchedUserProfile;