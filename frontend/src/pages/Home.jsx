import React from 'react'
import { io } from "socket.io-client";

const Home = () => {
  
// const socket = io("http://localhost:3000", {
//   withCredentials: true,
// });

// socket.on("connect", () => {
//   console.log("Connected to socket server:", socket.id);
// });
  
  return (
    <div className="min-h-screen">
      Home
    </div>
  )
}

export default Home
