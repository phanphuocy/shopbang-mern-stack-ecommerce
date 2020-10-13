const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const users = require("./data/users");
const products = require("./data/products");
const Users = require("./models/userModel");
const Products = require("./models/productModel");
const Order = require("./models/orderModel");
const connectDB = require("./config/db");
const User = require("./models/userModel");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Users.deleteMany();
    await Products.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Products.insertMany(sampleProducts);
    console.log("Data imported!".green.inverse);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Users.deleteMany();
    await Product.deleteMany();

    console.log("Data destroyed!".red.inverse);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
