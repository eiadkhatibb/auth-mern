import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../utils/generateToken.js";

//desc: auth user/set token
//route POST/api/users/auth
//access Public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth User" });
});

//desc: register new user
//route POST/api/users
//access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }

  // res.status(200).json({ message: "register user" });  // user at the start of the app
});

//desc: logout user
//route POST/api/users/logout
//access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout user" });
});

//desc: get user profile
//route POST/api/users/profile
//access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "user profile" });
});

//desc: update user profile
//route PUT/api/users/profile
//access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "update user profile" });
});

export {
  authUser,
  registerUser,
  updateUserProfile,
  getUserProfile,
  logoutUser,
};
