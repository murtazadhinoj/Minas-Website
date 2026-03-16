const express = require("express");
const router = express.Router();

const { createOrder } = require("../Controllers/orderController");

// ✅ CREATE ORDER
router.post("/orders", createOrder);

module.exports = router;
