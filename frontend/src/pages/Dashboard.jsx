import React from "react";
import { useMyContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { Search, MessageCircle, Users, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const { user } = useMyContext();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome back{user?.firstname ? `, ${user.firstname}` : ''}!
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your messaging dashboard is ready. Connect with friends, start conversations, 
            and discover new connections.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Search Users Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Discover People
            </h3>
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              Find new friends and connections by searching through our community. 
              Expand your network and start meaningful conversations.
            </p>
            <button
              onClick={() => {
                navigate("/searchuser");
              }}
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
            >
              Search Users
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Chat Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-6">
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Message Friends
            </h3>
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              Continue your conversations with friends. Access all your chats, 
              share moments, and stay connected with the people who matter most.
            </p>
            <button
              onClick={() => {
                navigate("/chats");
              }}
              type="button"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
            >
              Chat With Friends
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Quick Stats or Features */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Your ChatApp Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Connect</h4>
              <p className="text-sm text-gray-600">
                Find and add friends to build your network
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Chat</h4>
              <p className="text-sm text-gray-600">
                Real-time messaging with instant delivery
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Discover</h4>
              <p className="text-sm text-gray-600">
                Explore new connections and conversations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;