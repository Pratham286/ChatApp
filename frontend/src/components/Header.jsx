import React from "react";
import {
  MessageCircle,
  Search,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMyContext } from "../context/ContextProvider";

const Header = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useMyContext();
  const handleLogout = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/auth/logout`, {
        withCredentials: true,
      });
      // console.log(response);
      setIsLogin(false);
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <header className="flex justify-between items-center px-4 py-2 border-2 border-solid">
      <div
        onClick={() => {
          if(isLogin)
          {
            navigate("/dashboard")
          }
          else{
            navigate("/");
          }
        }}
        className="flex"
      >
        Header
      </div>
      {isLogin===false ? (
        <div className="flex gap-4">
          <button
            onClick={() => {
              navigate("/signup");
            }}
            type="button"
            className="bg-blue-700 rounded text-white px-2.5 py-1"
          >
            Sign up
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            type="button"
            className="bg-blue-700 rounded text-white px-2.5 py-1"
          >
            Sign in
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => {navigate("/chats")}}
            type="button"
            className="bg-blue-700 rounded text-white px-2.5 py-1"
          >
            Chats
          </button>
          <button
            onClick={() => {navigate("/myreq")}}
            type="button"
            className="bg-blue-700 rounded text-white px-2.5 py-1"
          >
            Friend Requests
          </button>
          <button
            onClick={handleLogout}
            type="button"
            className="bg-blue-700 rounded text-white px-2.5 py-1"
          >
            Logout
          </button>
          <button
            onClick={()=> {navigate("/profile")}}
            type="button"
            className="bg-blue-700 rounded text-white px-2.5 py-1"
          >
            My Profile
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
