import { Chat } from "../model/chat.js";
import { User } from "../model/user.js";

export const checkUser = async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).populate([
      {
        path: "friends",
        select: "firstname lastname email friends username",
      },
      {
        path: "friendrequest",
        select: "firstname lastname email friends username",
      },
      {
        path: "friendrequestrecieved",
        select: "firstname lastname email friends username",
      },
    ]);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ authenticated: true, user: req.user, userDetails: userData });
  } catch (error) {
    return res.status(403).json({ message: "Invalid token !!" });
  }
};

export const searchUser = async (req, res) => {
  // console.log("hello")
  try {
    const { word } = req.body;
    // console.log(word)
    const users = await User.find({
      $or: [
        { username: { $regex: word, $options: "i" } },
        { firstname: { $regex: word, $options: "i" } },
        { lastname: { $regex: word, $options: "i" } },
      ],
    })
      .select("-password")
      .limit(5);
    // console.log("hello")
    return res.status(200).json({ message: "Success", userDetails: users });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const searchAllUser = async (req, res) => {
  // console.log("hello")
  try {
    const { word } = req.body;
    // console.log(word)
    const users = await User.find({
      $or: [
        { username: { $regex: word, $options: "i" } },
        { firstname: { $regex: word, $options: "i" } },
        { lastname: { $regex: word, $options: "i" } },
      ],
    }).select("-password");
    // console.log("hello")
    return res.status(200).json({ message: "Success", userDetails: users });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id).populate({
      path: "friends",
      select: "firstname lastname email friends username",
    });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User Found", userDetails: userData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

export const sendFriendReq = async (req, res) => {
  try {
    const friendId = req.params.id;
    const myId = req.user.id;
    if(friendId === myId)
    {

      return res.status(400).json({ message: "Same User" });
    }
    const user = await User.findById(myId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const alreadyReq = user.friendrequest.includes(friendId);
    if (alreadyReq) {
      return res
      .status(400)
      .json({ message: "Friend Request was already send." });
    }
    await User.findByIdAndUpdate(myId, {
      $push: { friendrequest: friendId },
    },{new: true},);
    await User.findByIdAndUpdate(friendId, {
      $push: { friendrequestrecieved: myId },
    },{new: true},);
    return res.status(200).json({ message: "Request was sent" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};
export const cancelFriendReq = async (req, res) => {
  try {
    const friendId = req.params.id;
    const myId = req.user.id;
    if(friendId === myId)
    {
    
      return res.status(400).json({ message: "Same User" });
    }
    
    const user = await User.findById(myId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user1 = await User.findById(friendId);
    if (!user1) {
      return res.status(404).json({ message: "User not found" });
    }
    const alreadyReq = user.friendrequest.includes(friendId);
    if (!alreadyReq) {
      return res
      .status(400)
      .json({ message: "Friend Request was not sent." });
    }
    await User.findByIdAndUpdate(myId, {
      $pull: { friendrequest: friendId },
    },{new: true},);
    await User.findByIdAndUpdate(friendId, {
      $pull: { friendrequestrecieved: myId },
    },{new: true},);
    return res.status(200).json({ message: "Request was cancelled" });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: "Internal Error" });
  }
};
export const acceptFriendReq = async (req, res) => {
  try {
    const friendId = req.params.id;
    const myId = req.user.id;
    
    if(friendId === myId)
    {
      return res.status(400).json({ message: "Same User" });
    }
    const user = await User.findById(friendId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user1 = await User.findById(myId);
    if (!user1) {
      return res.status(404).json({ message: "User not found" });
    }
    const friendRequested = user.friendrequest.includes(myId)
    if (!friendRequested) {
      return res
      .status(400)
      .json({ message: "Request was not there." });
    }

    const alreadyFriend = user.friends.includes(myId);
    if (alreadyFriend) {
      return res
      .status(400)
      .json({ message: "Already Friend." });
    }
    const alreadyFriend1 = user1.friends.includes(myId);
    if (alreadyFriend1) {
      return res
      .status(400)
      .json({ message: "Already Friend." });
    }
    await User.findByIdAndUpdate(friendId, {
      $pull: { friendrequest: myId },
    },{new: true},);
    await User.findByIdAndUpdate(myId, {
      $pull: { friendrequestrecieved: friendId },
    },{new: true},);
    await User.findByIdAndUpdate(friendId, {
      $push: {friends: myId}
    },{new: true},)
    await User.findByIdAndUpdate(myId, {
      $push: {friends: friendId}
    },{new: true},)

    const ch = Chat.find({
      $and: [
        {isGroupChat: false},
        {chatMember: { $all: [myId, friendId] } },
      ]
    })
    if(!ch)
    {
      const newChat = new Chat({
        chatName: "DM",
        isGroupChat: false,
        chatMember: [myId, friendId],
        chatAdmin: [myId, friendId],
      });
      await newChat.save();
    }
    return res.status(200).json({ message: "Friend Request Accepted" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Error" });
  }
};
export const declineFriendReq = async (req, res) => {
  try {
    const friendId = req.params.id;
    const myId = req.user.id;
    if(friendId === myId)
      {
        return res.status(400).json({ message: "Same User" });
      }
      
      const user = await User.findById(friendId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const alreadyFriend = user.friendrequest.includes(myId);
      if (!alreadyFriend) {
        return res
        .status(400)
        .json({ message: "Request Not found." });
      }
      
      await User.findByIdAndUpdate(friendId, {
        $pull: { friendrequest: myId },
      },{new: true},);
      await User.findByIdAndUpdate(myId, {
        $pull: { friendrequestrecieved: friendId },
      },{new: true},);
    return res.status(200).json({ message: "Friend Removed" });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: "Internal Error" });
  }
};
export const unFriendReq = async (req, res) => {
  try {
    const friendId = req.params.id;
    const myId = req.user.id;
    if(friendId === myId)
    {
    
      return res.status(400).json({ message: "Same User" });
    }

    const user = await User.findById(friendId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const alreadyFriend = user.friends.includes(myId);
    if (!alreadyFriend) {
      return res
        .status(400)
        .json({ message: "Already unfriend." });
    }
    await User.findByIdAndUpdate(friendId, {
      $pull: {friends: myId}
    },{new: true},)
    await User.findByIdAndUpdate(myId, {
      $pull: {friends: friendId}
    },{new: true},)
    return res.status(200).json({ message: "Friend Removed" });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: "Internal Error" });
  }
};
