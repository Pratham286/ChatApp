import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  Search,
  MoreVertical,
  Phone,
  Video,
  User,
  UserPlus,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMyContext } from "../context/ContextProvider";

const Header = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useMyContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useMyContext();
  // const [req, setReq] = useState(0);
  // console.log(user.friendrequestreceived);
  // console.log(user?.friendrequestrecieved)
  const handleLogout = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/auth/logout`, {
        withCredentials: true,
      });
      setIsLogin(false);
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleNavigation = () => {
    if (isLogin) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };
  return (
    <header className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div
            onClick={handleNavigation}
            className="flex items-center cursor-pointer hover:opacity-70 transition-opacity"
          >
            <MessageCircle className="h-8 w-8 text-green-600 mr-2" />
            <span className="text-xl font-black text-gray-900 hidden sm:block">
              ChatApp
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            {!isLogin ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-md font-medium transition-colors shadow-sm"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-md font-medium transition-colors shadow-sm"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/chats")}
                  className="flex items-center text-gray-700 hover:text-green-600 px-2 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chats
                </button>
                <button
                  onClick={() => navigate("/myreq")}
                  className="flex items-center text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Requests
                  <span className="ml-1 bg-gray-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                    {user?.friendrequestrecieved.length}
                  </span>
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-600 px-2 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2 rounded-md transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                // <></>
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
      </div>
      {isMobileMenuOpen && (
        // <div className="sm:hidden py-3 bg-white w-48 absolute right-2">
        <div className="sm:hidden py-3 bg-gradient-to-br from-blue-50 via-white to-purple-50 w-auto absolute right-0">
          <div className="space-y-2 flex flex-col items-end">
            {!isLogin ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-auto text-center bg-gray-500 hover:bg-gray-700 text-white px-4 mx-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-4 mx-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/chats");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-auto text-gray-700 hover:text-green-600 px-4 mx-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chats
                </button>
                <button
                  onClick={() => {
                    navigate("/myreq");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-auto text-gray-700 hover:text-blue-600 px-4 mx-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Friend Requests
                  <span className="ml-1 bg-gray-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                    {user?.friendrequestrecieved.length}
                  </span>
                </button>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-auto text-gray-700 hover:text-blue-600 px-4 mx-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-auto text-gray-700 hover:text-red-600 px-4 mx-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
