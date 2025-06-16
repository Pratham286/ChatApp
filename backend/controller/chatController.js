import { Chat } from "../model/chat.js";

export const createChat = async (req, res) => {
  try {
    const { userArr, chatName } = req.body;
    const myId = req.user.id;
    let isGroupChat;
    if (userArr && userArr.length > 2) {
      isGroupChat = true;
    } else {
      isGroupChat = false;
    }
    const newChat = new Chat({
      chatName: chatName,
      isGroupChat: isGroupChat,
      chatMember: userArr,
      chatAdmin: [myId],
    });

    await newChat.save();
    return res.status(200).json({ message: "Chat is created" });
  } catch (error) {}
};

export const userChat = async (req, res) => {
  try {
    const myId = req.user.id;

    const userChats = await Chat.find({ chatMember: myId })
      .populate({
        path: "chatMember",
        select: "username",
      })
      .populate({
        path: "chatMessage",
        options: { sort: { createdAt: -1 },  },
        populate: {
          path: "sender",
          select: "username",
        },
      })
      .sort({ updatedAt: -1 });

    return res.status(200).json({ message: "Success", chatDetails: userChats });
  } catch (error) {
    console.error("Error in getUserChat:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const chatFromId = async (req, res) => {
  try {
    const myId = req.user.id;
    const chatId = req.params.id;

    const userChats = await Chat.findById(chatId)
      .populate({
        path: "chatMember",
        select: "username firstname lastname email",
      })
      .populate({
        path: "chatAdmin",
        select: "username firstname lastname email",
      })
      .populate({
        path: "chatMessage",
        options: { sort: { createdAt: 1 } },
        populate: {
          path: "sender",
          select: "username",
        },
      })
      .sort({ updatedAt: -1 });

    // const isValid = userChat.chatMember.some(
    //   (member) => member._id.toString() === myId
    // );
    // if (!isValid) {
    //   return res.status(401).json({ message: "Not authorized" });
    // }

    // See this after some time
    return res.status(200).json({ message: "Success", chatDetails: userChats });
  } catch (error) {
    console.error("Error in getUserChat:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findByIdAndDelete(chatId);
    return res.status(200).json({ message: "Chat Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};
export const exitChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const chatId = req.params.id;
    const chat1 = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { chatMember: userId } },
      { new: true }
    );

    return res.status(200).json({ message: "User Exit" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const addToChat = async (req, res) => {
  try {
    const myId = req.user.id;
    const { userId } = req.body;
    const chatId = req.params.id;
    if (!chatId || !userId) {
      return res
      .status(400)
      .json({ message: "chatId and userId are required." });
    }
    const chat = await Chat.findById(chatId);
    if(!chat.isGroupChat){
      return res.status(400).json({ message: "This is not a group" });
    }
    const admin = chat.chatAdmin.includes(myId);
    if(!admin){
      return res.status(401).json({ message: "You are not Group Admin" });
    }
    
    const newUser = userId.filter(id => !chat.chatMember.includes(id));
    if(newUser.length === 0)
      {
      return res.status(400).json({ message: "All users are already in the group" });
    }
    const chat1 = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: {chatMember: { $each : newUser}} },
      {new: true},

    );
    
    return res.status(200).json({ message: "User Added" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const removeUser = async (req, res) => {
  try {
    const myId = req.user.id;
    const { userId } = req.body;
    const chatId = req.params.id;
    if (!chatId || !userId) {
      return res
      .status(400)
      .json({ message: "chatId and userId are required." });
    }
    const chat = await Chat.findById(chatId);
    if(!chat.isGroupChat){
      return res.status(400).json({ message: "This is not a group" });
    }
    const admin = chat.chatAdmin.includes(myId);
    if(!admin){
      return res.status(401).json({ message: "You are not Group Admin" });
    }
    
    const user = chat.chatMember.includes(userId)
    if(!user)
      {
      return res.status(404).json({ message: "User is not Present" });
    }
    const chat1 = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { chatMember: userId } },
      { new: true }
    );
    
    return res.status(200).json({ message: "User Exit" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const makeAdmin = async (req, res) => {
  try {
    const myId = req.user.id
    const { userId } = req.body; 
    const chatId = req.params.id;
    console.log(userId)
    if (!chatId || !userId) {
      return res
      .status(400)
      .json({ message: "chatId and userId are required." });
    }
    const chat = await Chat.findById(chatId);
    if(!chat.isGroupChat){
      return res.status(400).json({ message: "This is not a group" });
    }
    const admin = chat.chatAdmin.includes(myId);
    if(!admin){
      return res.status(401).json({ message: "You are not Group Admin" });
    }
    const user = chat.chatAdmin.includes(userId);
    if(user){
      return res.status(401).json({ message: "User is Already Admin" });
    }
    const chat1 = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { chatAdmin: userId } },
      { new: true }
    );
    
    return res.status(200).json({ message: "User is promoted to group admin" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.data});
  }
};
export const removeAdmin = async (req, res) => {
  try {
    const myId = req.user.id
    const { userId } = req.body;
    const chatId = req.params.id;
    if (!chatId || !userId) {
      return res
      .status(400)
      .json({ message: "chatId and userId are required." });
    }
    const chat = await Chat.findById(chatId);
    if(!chat.isGroupChat){
      return res.status(400).json({ message: "This is not a group" });
    }
    const admin = chat.chatAdmin.includes(myId);
    if(!admin){
      return res.status(401).json({ message: "You are not Group Admin" });
    }
    const user = chat.chatAdmin.includes(userId);
    if(!user){
      return res.status(401).json({ message: "User is not an Admin" });
    }
    const chat1 = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { chatAdmin: userId } },
      { new: true }
    );
    
    return res.status(200).json({ message: "User Removed as admin" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};