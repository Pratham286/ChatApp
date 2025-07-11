//checked
import React, { useState } from "react";
import { useMyContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import Popup from "../components/PopupForm";
import { User, Users, MessageSquarePlus, ArrowRight, UserCircle, Mail, Calendar, UserPlus } from "lucide-react";

const Profile = () => {
  const { user } = useMyContext();
  // console.log(user)
  const userId = user._id;
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const handleShowFriends = () => {
    navigate("/friends", {
      state: {
        userId,
      },
    });
  };
  const handleShowReq = () => {
    navigate("/myreq");
  };
  
  const createChat = () => {
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <UserCircle className="h-20 w-20 text-white" />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {user.firstname + " " + user.lastname}
              </h1>
              <p className="text-xl text-gray-600 mb-4 flex items-center justify-center md:justify-start">
                <User className="h-5 w-5 mr-2" />
                @{user.username}
              </p>
              
              {/* Stats */}
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {user.friends.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    {user.friends.length === 1 ? 'Friend' : 'Friends'}
                  </div>
                </div>
                {/* <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    Active
                  </div>
                  <div className="text-sm text-gray-600">
                    Status
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-900">
                    {user.firstname + " " + user.lastname}
                  </p>
                </div>
              </div>
            </div>
              <div className="space-y-6">

              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <UserCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Username</p>
                  <p className="font-semibold text-gray-900">@{user.username}</p>
                </div>
              </div>
              </div>
            
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Friends</p>
                  <p className="font-semibold text-gray-900">
                    {user.friends.length} {user.friends.length === 1 ? 'Friend' : 'Friends'}
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Friends Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-6">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex justify-center">

            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center mx-3">
              My Friends
            </h3>
            <div className="text-center mb-4">
              <span className="inline-flex items-center px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                {user.friends.length} {user.friends.length === 1 ? 'Friend' : 'Friends'}
              </span>
            </div>
            </div>
            <button
              onClick={handleShowFriends}
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-md font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
            >
              Show Friends
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Create Chat Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-6">
              <MessageSquarePlus className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Create Group Chat
            </h3>
            <button
              onClick={createChat}
              type="button"
              className="w-full bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-md font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
            >
              Create Chat Group
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-6">
              <UserPlus className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Friend Requests
            </h3>
            <button
              onClick={handleShowReq}
              type="button"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl text-md font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
            >
              Show Friend Request
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
      
      <Popup showForm={showForm} setShowForm={setShowForm}/>
    </div>
  );
};

export default Profile;