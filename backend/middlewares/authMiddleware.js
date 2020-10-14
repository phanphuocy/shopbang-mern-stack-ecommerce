const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Users.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Token không chính xác.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Bạn chưa đăng nhập vào hệ thống.");
  }
});

module.exports = protect;
