const express = require("express");
const dotenv = require("dotenv");
const products = require("./data/products");

// Initialize
const app = express();
dotenv.config();

// Routing
app.get("/", (req, res) => {
  res.send("API is ready.");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode, on port ${port}.`
  )
);
