//checked
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
        <div className="flex justify-center text-center mb-16">
          <h1 className="text-5xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome back{user?.firstname ? `, ${user.firstname}` : ''}!
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Search Users Card */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all  duration-100 transform hover:-translate-y-1 border border-stone-300">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Discover People
            </h3>

            <button
              onClick={() => {
                navigate("/searchuser");
              }}
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center group"
            >
              Search Users
              <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-100 transform hover:-translate-y-1 border border-stone-300">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-6">
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Message Friends
            </h3>

            <button
              onClick={() => {
                navigate("/chats");
              }}
              type="button"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center group"
            >
              Chat With Friends
              <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-stone-300">
          <h3 className="text-xl font-bold text-gray-800 mb-8 text-center">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Connect</h4>
              <p className="text-sm text-gray-600">
                Find and add friends to build your network
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-5 w-5 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Chat</h4>
              <p className="text-sm text-gray-600">
                Real-time messaging with instant delivery
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-5 w-5 text-blue-600" />
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