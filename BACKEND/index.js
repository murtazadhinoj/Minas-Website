require("dotenv").config();
const express = require("express");
const app = express();
require("./Models/db");

const bodyParser = require("body-parser");
const cors = require("cors");

// ROUTERS
const authRouter = require("./Routers/authRouter");
const productRouter = require("./Routers/productRouter");
const orderRouter = require("./Routers/orderRouter");

const PORT = process.env.PORT || 8080;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.use("/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api", orderRouter);

// HEALTH CHECK
app.get("/ping", (req, res) => {
  res.send("pong");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
