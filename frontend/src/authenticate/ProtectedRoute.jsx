import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {Navigate , Outlet} from "react-router-dom"
import { useMyContext } from "../context/ContextProvider";
const ProtectedRoute = () => {
  const [isValid, setIsValid] = useState(null);
  const {url, isLogin, setIsLogin, user, setUser} = useMyContext();
  // console.log(url)
  useEffect(() => {
    const handle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/dashboard/verify`,
          {
            withCredentials: true,
          }
        );

        // console.log(response.data);
        if (response.data.authenticated === true) {
          setIsValid(true);
          setIsLogin(true)
          // console.log(response.data.userDetails);
          setUser(response.data.userDetails);
        }
      } catch (error) {
        setIsValid(false);
        setIsLogin(false)
        console.log("Error: ", error);
      }
    };
    handle();
  }, []);
  if (isValid === null) {
    return <div>Loading...</div>;
  }
  return isValid ? <Outlet /> : <Navigate to="/login"/>
};

export default ProtectedRoute;
