const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

// router.get(
//   "/",
//   asyncHandler(async (req, res) => {})
// );

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {})
// );

module.exports = router;
