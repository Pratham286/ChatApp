import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// export const signupMany = async (req, res) => {
//   try {
//     const { userArray } = req.body;

//     const failedUsers = [];
//     const registeredUsers = [];

//     for (let i = 0; i < userArray.length; i++) {
//       const { username, firstname, lastname, email, password } = userArray[i];

//       const existingEmail = await User.findOne({ email });
//       if (existingEmail) {
//         failedUsers.push({ email, reason: "Email already exists" });
//         continue;
//       }

//       const existingUsername = await User.findOne({ username });
//       if (existingUsername) {
//         failedUsers.push({ username, reason: "Username already exists" });
//         continue;
//       }

//       const hashPassword = await bcrypt.hash(password, 10);

//       const newUser = new User({
//         username,
//         firstname,
//         lastname,
//         email,
//         password: hashPassword,
//       });

//       await newUser.save();
//       registeredUsers.push({ username, email });
//     }

//     return res.status(201).json({
//       message: "User registration completed.",
//       registeredUsers,
//       failedUsers,
//     });
//   } catch (error) {
//     console.log("Error in registering: ", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


export const signupFuntion = async (req, res) => {
  try {
    const {username, firstname, lastname, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ Message: "User with the email already exists." });
    }
    const user1 = await User.findOne({ username: username });
    if (user1) {
      return res
        .status(400)
        .json({ Message: "Username already exists." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    console.log("Error in registering: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginFunction = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate({
      path: "friends",
      select: "firstname lastname email friends",
    });
    if (!user) {
      return res.status(404).json({ message: "Email is not registered!" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
        const payload ={
            id : user._id,
            firstname: user.firstname,
            lastname: user.lastname,
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1h"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite : "Lax",
            maxAge: 60 * 60 * 1000,
        })
        return res.status(200).json({ message: "Login Successful", token, userDetails : user});
    } else {
      return res.status(401).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log("Error in Login: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutFunction = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false, // make sure this matches how the cookie was originally set
  });
  return res.status(200).json({ message: "Logged out successfully" });
};