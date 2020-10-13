const mongoose = require("mongoose");

const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: requiredString,
        qty: requiredNumber,
        image: requiredString,
        price: requiredNumber,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: requiredString,
      city: requiredString,
      postalCode: requiredString,
      country: requiredString,
    },
    paymentMethod: requiredString,
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    taxPrice: {
      ...requiredNumber,
      default: 0.0,
    },
    shippingPrice: {
      ...requiredNumber,
      default: 0.0,
    },
    totalPrice: {
      ...requiredNumber,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("ORder", orderSchema);

module.exports = Order;
