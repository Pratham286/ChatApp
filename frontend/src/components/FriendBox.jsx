import React from "react";
import { useMyContext } from "../context/ContextProvider";
import { User, MessageCircle, ArrowRight } from "lucide-react";

const FriendBox = ({ username, fullname, handleClick }) => {
  const { friendState, setFriendState } = useMyContext();
  
  return (
    <div
      onClick={handleClick}
      className="flex items-center p-6 cursor-pointer transition-all duration-200 group hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
    >
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 transition-colors duration-200 group-hover:bg-green-200">
        <User className="h-6 w-6 text-green-600" />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {username}
        </h3>
        <p className="text-sm text-gray-600">
          {fullname}
        </p>
      </div>
      <div className="flex items-center space-x-3">
        {friendState?.areTheyFriend && (
          <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
            <MessageCircle className="h-4 w-4 mr-1" />
            Friend
          </div>
        )}
        
        {/* Action Indicator */}
        <div className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200">
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default FriendBox;