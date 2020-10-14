const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
// Initialize
const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// Routing
app.get("/", (req, res) => {
  res.send("API is ready.");
});

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode, on port ${port}.`.yellow
      .bold
  )
);
