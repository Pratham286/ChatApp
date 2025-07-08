import React from 'react';
import { MessageCircle, Users, ChevronRight } from 'lucide-react';

const ChatBar = ({ chatName, chatLastmsg, handleClick, isGroupChat = false }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to truncate long messages
  const truncateMessage = (message, maxLength = 60) => {
    if (!message) return '';
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <div 
      onClick={handleClick}
      className="w-full p-6 cursor-pointer hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0 group"
    >
        <div className="flex items-center space-x-2">
          {isGroupChat && (
            <div className="flex items-center space-x-1 text-xs text-gray-500  pl-2 pb-3">
              <Users className="h-3 w-3" />
              <span>Group Chat</span>
            </div>
          )}
        </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {/* Avatar */}
          <div className={`
            relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm
            ${isGroupChat 
              ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
              : 'bg-gradient-to-br from-blue-500 to-blue-600'
            }
          `}>
            {getInitials(chatName)}
            {isGroupChat && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <Users className="h-3 w-3 text-purple-600" />
              </div>
            )}
          </div>

          {/* Chat Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900 truncate text-lg">
                {chatName || 'Unknown User'}
              </h3>
            </div>
            <p className="text-gray-600 text-sm truncate leading-relaxed">
              {truncateMessage(chatLastmsg) || 'No messages yet'}
            </p>
          </div>
        </div>

        {/* Arrow Icon */}
        <div className="flex-shrink-0 ml-4">
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
        </div>
      </div>

      {/* Optional: Online indicator or unread badge */}
        
        
    </div>
  );
};

export default ChatBar;