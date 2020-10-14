const Users = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//@desc    Auth user and get token
//@route   POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Mật khẩu hoặc email không tồn tại.");
  }
});

//@desc   Register new user
//@route  POST /api/users
const registerNewUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("Email đã có người đăng ký.");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc   Get user profile
//@route  GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Không Tìm Thấy Người Dùng.");
  }
});

module.exports = {
  authUser,
  getUserProfile,
  registerNewUser,
};
