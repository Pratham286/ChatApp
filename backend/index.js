import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import dashRoutes from "./routes/dashboard.js";
import cookieParser from "cookie-parser";
import updateUsersWithFriendRequest from "./config/dbupdate.js";
import { Server } from "socket.io";
import http from "http";
import chatRoutes from "./routes/chatRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import { Message } from "./model/Message.js";
import { Chat } from "./model/chat.js";
import { decodeTokenFromString } from "./utils/jwtUtils.js";
import { parse } from "cookie";


const app = express();
dotenv.config();

const port = process.env.PORT;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


io.use((socket, next) => {
  try {
    // 1. Parse cookies from the handshake headers
    const rawCookies = socket.handshake.headers.cookie || "";
    //    (you may need to npm install cookie-parser if not already)
    // const { token } = require("cookie").parse(rawCookies);
    // Parse into an object
    const { token } = parse(rawCookies);

    // Verify it’s there
    if (!token) throw new Error("No token");

    // 2. Decode & verify:
    const payload = decodeTokenFromString(token);

    // 3. Attach user info to socket and allow connection
    socket.user = payload;   // e.g. { userId: "...", name: "..." }
    next();
  } catch (err) {
    // Reject the connection
    console.log(err)
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("join", async (chatId) => {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return socket.emit("error", "Cannot join this chat");
    }

    socket.join(chatId);
  });

  socket.on("send", async (data) => {
    try {

      const { message, sender, chatId } = data;

      const newMessage = new Message({
        content: message,
        sender: sender,
        chat: chatId,
      });
      await newMessage.save();
      await Chat.findByIdAndUpdate(chatId, {
        $push: { chatMessage: newMessage._id },
      });

      const populatedMsg = await newMessage.populate("sender", "name");

      io.to(chatId).emit("receive", populatedMsg);
    } catch (error) {
      console.log(error)
    }
  });
  socket.on("typing", ({chatId, username}) =>{
    socket.to(chatId).emit("userTyping", {username});
  })
  socket.on("stopTyping", ({chatId}) =>{
    socket.to(chatId).emit("userStoppedTyping");
  })

  socket.on("editmsg", async ({chatId, msgId, editMsg}) => {
    try {
      const updatedMsg = await Message.findByIdAndUpdate(
      msgId,
      {
        content: editMsg,
        edited: true,
      },
      { new: true }
    ).populate("sender", "username");

    io.to(chatId).emit("editedMsg", updatedMsg);
    } catch (error) {
      console.log(error)
    }
  })
  socket.on("deletemsg", async ({chatId, msgId}) => {
    try {
      const deletedMsg = await Message.findByIdAndUpdate(
      msgId,
      {
        deleted: true,
      },
      { new: true }
    ).populate("sender", "username");
    console.log("deleted")
    io.to(chatId).emit("deletedMsg", deletedMsg);
    } catch (error) {
      console.log(error)
    }
    
  })
  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

connectToDB();
// updateUsersWithFriendRequest();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/dashboard", dashRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
