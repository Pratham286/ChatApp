import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchedUserProfile from "../components/SearchedUserProfile";
import { useMyContext } from "../context/ContextProvider";
import GroupMember from "../components/GroupMember";
import axios from "axios";
import { 
  Users, 
  UserPlus, 
  Shield, 
  User, 
  ArrowLeft, 
  X,
  Plus,
  Crown
} from "lucide-react";

const ChatDetails = () => {
  const location = useLocation();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { user } = useMyContext();
  const { chat } = location.state || {};
  console.log(chat);
  const navigate = useNavigate();

  const [chatData, setChatData] = useState(chat);
  const [showForm, setShowForm] = useState(false);
  const [addedUser, setAddedUser] = useState([user._id]);
  const [loading, setLoading] = useState(false);

  const friends = user.friends;

  const addUser = (userId) => {
    setAddedUser((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const refreshChatDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/chat/get/${chat._id}`,
        {
          withCredentials: true,
        }
      );
      setChatData(response.data.chatDetails);
    } catch (error) {
      console.error("Error refreshing chat details:", error);
    } finally {
      setLoading(false);
    }
  };

  const chatAdmins = chatData.chatAdmin;
  const adminIds = chatData.chatAdmin.map((admin) => admin._id);
  const chatMembers = chatData.chatMember.filter(
    (member) => !adminIds.includes(member._id)
  );

  useEffect(() => {
    if (adminIds.includes(user._id)) {
      setIsUserAdmin(true);
    }
  }, []);

  const handleProfile = (u) => {
    const userId = u._id;
    if (userId === user._id) {
      navigate("/profile");
    } else {
      navigate("/userprofile", {
        state: {
          userId: userId,
        },
      });
    }
  };

  const memberIds = chatData.chatMember.map((mem) => mem._id);
  const toAdd = friends.filter((fr) => !memberIds.includes(fr._id));

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (addedUser.length === 0) {
      alert("Add at least 1 user");
      return;
    }

    try {
      setLoading(true);
      const groupData = {
        userId: addedUser,
      };
      
      const response = await axios.put(
        `http://localhost:3000/chat/addgroup/${chat._id}`,
        groupData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Added");
        setShowForm(false);
        setAddedUser([]);
        await refreshChatDetails();
      }
    } catch (error) {
      console.error("Error adding users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBackClick}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-sm text-gray-500">
                {chatData.chatMember.length} members
              </span>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {chatData.chatName}
            </h1>
          </div>
        </div>

        {/* Group Members Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Users className="h-6 w-6 mr-3 text-blue-600" />
              Group Members
            </h3>
            
            {isUserAdmin && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center group"
              >
                <UserPlus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Add Member
              </button>
            )}
          </div>

          {/* Admins Section */}
          {chatAdmins.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Crown className="h-5 w-5 mr-2 text-yellow-500" />
                Administrators
              </h4>
              <div className="space-y-3">
                {chatAdmins.map((u, i) => (
                  <div key={i} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                    <GroupMember
                      isAdmin={true}
                      username={u.username}
                      fullname={u.firstname + " " + u.lastname}
                      handleClick={() => handleProfile(u)}
                      isUserAdmin={isUserAdmin}
                      userId={u._id}
                      chatId={chat._id}
                      handleRefresh={refreshChatDetails}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Members Section */}
          {chatMembers.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-500" />
                Members
              </h4>
              <div className="space-y-3">
                {chatMembers.map((u, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                    <GroupMember
                      isAdmin={false}
                      username={u.username}
                      fullname={u.firstname + " " + u.lastname}
                      handleClick={() => handleProfile(u)}
                      isUserAdmin={isUserAdmin}
                      userId={u._id}
                      chatId={chat._id}
                      handleRefresh={refreshChatDetails}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {chatMembers.length === 0 && chatAdmins.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No members found</p>
            </div>
          )}
        </div>

        {/* Add Member Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center">
                    <UserPlus className="h-6 w-6 mr-3" />
                    Add Members
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setAddedUser([]);
                    }}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-blue-100 mt-2">
                  Select friends to add to the group
                </p>
              </div>

              {/* Modal Content */}
              <form onSubmit={handleAddUser}>
                <div className="p-6 max-h-96 overflow-y-auto">
                  {toAdd.length > 0 ? (
                    <div className="space-y-3">
                      {toAdd.map((u, i) => (
                        <div key={i} className="transform transition-all hover:scale-105">
                          <SearchedUserProfile
                            username={u.username}
                            handleClick={() => addUser(u._id)}
                            isSelected={addedUser.includes(u._id)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No friends available to add</p>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setAddedUser([]);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || addedUser.length === 0}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Members
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDetails;