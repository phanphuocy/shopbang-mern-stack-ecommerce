const Orders = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

// @desc    Create new order
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("Không có sản phẩm trong đơn hàng.");
    return;
  }

  const order = new Orders({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getOrders = asyncHandler(async (req, res) => {
  const products = await Orders.find({});
  res.json(products);
});

// @desc    Fetch single product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Orders.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Không Thể Tìm Thấy Sản Phẩm");
  }
});

module.exports = {
  addOrderItems,
  getOrders,
  getProductById,
};
