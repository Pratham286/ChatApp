import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/ContextProvider";
import axios from "axios";
import { 
  Crown, 
  MoreVertical, 
  Shield, 
  UserMinus, 
  X, 
  User,
  UserCheck,
  AlertTriangle 
} from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [isSameUser, setIsSameUser] = useState(false);
  const { user } = useMyContext();

  useEffect(() => {
    if (userId === user._id) {
      setIsSameUser(true);
    }
  }, []);

  const toggleMenu = () => {
    setShowAction(!showAction);
  };

  const handleAddAdmin = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/chat/makegroupadmin/${chatId}`,
        { userId: userId },
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        console.log("Success");
        handleRefresh();
        setShowAction(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAdmin = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/chat/removegroupadmin/${chatId}`,
        { userId: userId },
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        handleRefresh();
        console.log("Success");
        setShowAction(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/chat/removeuser/${chatId}`,
        { userId: userId },
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        handleRefresh();
        console.log("Success");
        setShowAction(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between group">
        {/* User Info Card */}
        <div
          onClick={handleClick}
          className="flex-1 cursor-pointer bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-200 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {username.charAt(0).toUpperCase()}
              </div>
              
              {/* User Details */}
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {username}
                  {isSameUser && (
                    <span className="ml-2 text-sm text-blue-600 font-medium">
                      (You)
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-500">{fullname}</p>
              </div>
            </div>
            
            {/* Admin Badge */}
            {isAdmin && (
              <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                Admin
              </div>
            )}
            
            {!isAdmin && (
              <div className="flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">

                Member
              </div>
            )}
          </div>
        </div>

        {/* Action Menu */}
        {isUserAdmin && !isSameUser && (
          <div className="ml-4 relative">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
            >
              <MoreVertical className="h-5 w-5" />
            </button>

            {/* Dropdown Menu */}
            {showAction && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-10 overflow-hidden">
                <div className="py-2">
                  {isAdmin ? (
                    <button
                      onClick={handleRemoveAdmin}
                      disabled={loading}
                      className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors flex items-center text-orange-600 hover:text-orange-700 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600 mr-3"></div>
                      ) : (
                        <Shield className="h-4 w-4 mr-3" />
                      )}
                      Remove Admin
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleAddAdmin}
                        disabled={loading}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center text-blue-600 hover:text-blue-700 disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
                        ) : (
                          <UserCheck className="h-4 w-4 mr-3" />
                        )}
                        Make Admin
                      </button>
                      <button
                        onClick={handleRemoveUser}
                        disabled={loading}
                        className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center text-red-600 hover:text-red-700 disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-3"></div>
                        ) : (
                          <UserMinus className="h-4 w-4 mr-3" />
                        )}
                        Remove User
                      </button>
                    </>
                  )}
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={toggleMenu}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center text-gray-600 hover:text-gray-700"
                    >
                      <X className="h-4 w-4 mr-3" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close menu */}
      {showAction && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowAction(false)}
        />
      )}
    </div>
  );
};

export default GroupMember;