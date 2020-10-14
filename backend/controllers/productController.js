const Products = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({});
  res.json(products);
});

// @desc    Fetch single product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Không Thể Tìm Thấy Sản Phẩm");
  }
});

module.exports = {
  getProducts,
  getProductById,
};
