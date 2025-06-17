import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/ContextProvider";
import { 
  User, 
  Users, 
  UserPlus, 
  UserMinus, 
  UserCheck, 
  UserX, 
  ArrowRight, 
  UserCircle, 
  Mail, 
  Calendar,
  Heart,
  MessageCircle,
  Shield
} from "lucide-react";

const UserProfile = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [otherUser, setOtherUser] = useState();
  const { user, setUser, friendState, setFriendState } = useMyContext();
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch other user data
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/dashboard/getuser/${userId}`,
          { withCredentials: true }
        );
        console.log(response.data.userDetails);
        setOtherUser(response.data.userDetails);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      getUser();
    }
  }, [userId, trigger]);

  useEffect(() => {
    const handle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/dashboard/verify`,
          {
            withCredentials: true,
          }
        );
        if (response.data.authenticated === true) {
          setUser(response.data.userDetails);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    handle();
  }, [trigger, setUser]);

  useEffect(() => {
    if (user && otherUser) {
      if (user._id === otherUser._id) {
        setFriendState({
          areTheyFriend: true,
          isReqSent: false,
          isReqRec: false,
        });
      } else {
        setFriendState({
          areTheyFriend: false,
          isReqSent: false,
          isReqRec: false,
        });

        const isFriend = user.friends?.some(
          (friend) => friend._id === otherUser._id
        );
        setFriendState((prev) => ({
          ...prev,
          areTheyFriend: isFriend,
        }));
        
        for (let i = 0; i < user.friendrequest.length; i++) {
          if (otherUser._id === user.friendrequest[i]._id) {
            setFriendState((prev) => ({
              ...prev,
              isReqSent: true,
            }));
            break;
          }
        }
        
        const reqReceived = otherUser.friendrequest?.includes(user._id);
        setFriendState((prev) => ({
          ...prev,
          isReqRec: reqReceived,
        }));
      }
    }
  }, [user, otherUser]);

  const handleRequest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/sendfriendreq/${otherUser._id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/cancelfriendreq/${otherUser._id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/acceptfriendreq/${otherUser._id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfriend = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/unfriendreq/${otherUser._id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/declinefriendreq/${otherUser._id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowFriends = () => {
    if (userId === user._id || friendState.areTheyFriend) {
      navigate("/friends", {
        state: {
          userId,
        },
      });
    } else {
      alert("The user is not your friend");
    }
  };

  const renderFriendshipStatus = () => {
    if (user._id === otherUser._id) {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <Shield className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <span className="text-blue-700 font-medium">This is your profile</span>
        </div>
      );
    }

    if (friendState.areTheyFriend) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <Heart className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <span className="text-green-700 font-medium">Friends</span>
        </div>
      );
    }

    if (friendState.isReqRec) {
      return (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
          <UserPlus className="h-6 w-6 text-orange-600 mx-auto mb-2" />
          <span className="text-orange-700 font-medium">Friend Request Received</span>
        </div>
      );
    }

    if (friendState.isReqSent) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <UserCheck className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
          <span className="text-yellow-700 font-medium">Friend Request Sent</span>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
        <User className="h-6 w-6 text-gray-600 mx-auto mb-2" />
        <span className="text-gray-700 font-medium">Not Connected</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!otherUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <UserX className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <UserCircle className="h-20 w-20 text-white" />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {otherUser.firstname + " " + otherUser.lastname}
              </h1>
              <p className="text-xl text-gray-600 mb-4 flex items-center justify-center md:justify-start">
                <User className="h-5 w-5 mr-2" />
                @{otherUser.username}
              </p>
              
              {/* Friendship Status */}
              <div className="mb-6">
                {renderFriendshipStatus()}
              </div>
              
              {/* Stats */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {otherUser.friends.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    {otherUser.friends.length === 1 ? 'Friend' : 'Friends'}
                  </div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    Active
                  </div>
                  <div className="text-sm text-gray-600">
                    Status
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Friends Actions Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Friends
            </h3>
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              {friendState.areTheyFriend || user._id === otherUser._id
                ? "View this user's friend connections and network."
                : "You need to be friends to view their friend list."}
            </p>
            <div className="text-center mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                {otherUser.friends.length} {otherUser.friends.length === 1 ? 'Friend' : 'Friends'}
              </span>
            </div>
            <button
              onClick={handleShowFriends}
              type="button"
              className={`w-full px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group ${
                friendState.areTheyFriend || user._id === otherUser._id
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!(friendState.areTheyFriend || user._id === otherUser._id)}
            >
              Show Friends
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Friendship Actions Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-6">
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Connection
            </h3>
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              {user._id === otherUser._id
                ? "This is your own profile page."
                : friendState.areTheyFriend
                ? "You and this user are connected as friends."
                : "Manage your friendship status with this user."}
            </p>
            
            <div className="space-y-4">
              {user._id === otherUser._id ? (
                <div className="text-center">
                  <span className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    Your Profile
                  </span>
                </div>
              ) : friendState.areTheyFriend ? (
                <button
                  onClick={handleUnfriend}
                  type="button"
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  <UserMinus className="mr-2 h-5 w-5" />
                  Unfriend
                </button>
              ) : friendState.isReqRec ? (
                <div className="space-y-3">
                  <button
                    onClick={handleAccept}
                    type="button"
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    <UserCheck className="mr-2 h-5 w-5" />
                    Accept Request
                  </button>
                  <button
                    onClick={handleDecline}
                    type="button"
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    <UserX className="mr-2 h-5 w-5" />
                    Decline Request
                  </button>
                </div>
              ) : friendState.isReqSent ? (
                <button
                  onClick={handleCancel}
                  type="button"
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  <UserX className="mr-2 h-5 w-5" />
                  Cancel Request
                </button>
              ) : (
                <button
                  onClick={handleRequest}
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Send Friend Request
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-900">
                    {otherUser.firstname + " " + otherUser.lastname}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <UserCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Username</p>
                  <p className="font-semibold text-gray-900">@{otherUser.username}</p>
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
                    {otherUser.friends.length} {otherUser.friends.length === 1 ? 'Friend' : 'Friends'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-semibold text-gray-900">ChatApp User</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;