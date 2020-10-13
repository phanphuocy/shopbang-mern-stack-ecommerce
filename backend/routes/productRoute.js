const express = require("express");
const router = express.Router();
const Products = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Products.find({});
    res.json(products);
  })
);

// @desc    Fetch single product by id
// @route   GET /api/products/:id
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Không Thể Tìm Thấy Sản Phẩm");
    }
  })
);

module.exports = router;
