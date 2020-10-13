const mongoose = require("mongoose");

const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const reviewSchema = mongoose.Schema(
  {
    name: requiredString,
    rating: requiredNumber,
    comment: requiredString,
  },
  {
    timestamp: true,
  }
);

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: requiredString,
  image: requiredString,
  brand: requiredString,
  category: requiredString,
  description: requiredString,
  reviews: [reviewSchema],
  rating: {
    ...requiredNumber,
    default: 0,
  },
  numReviews: {
    ...requiredNumber,
    default: 0,
  },
  price: {
    ...requiredNumber,
    default: 0,
  },
  countInStock: {
    ...requiredNumber,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
