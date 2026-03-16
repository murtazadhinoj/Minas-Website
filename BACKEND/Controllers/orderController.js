const Order = require("../Models/order");

const createOrder = async (req, res) => {
  try {
    const {
      billingData,
      cart,
      subtotal,
      paymentMethod,
      paymentId,
      invoice,
      newsletter,
    } = req.body;

    // ❌ cart empty check
    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // ❌ payment not completed (for Stripe/Card)
    if (
      paymentMethod !== "COD" &&
      (!paymentId || paymentId.length === 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    const order = new Order({
      billingData,
      cart,
      subtotal,

      payment: {
        method: paymentMethod,
        paymentId: paymentId || null,
        status: paymentMethod === "COD" ? "PENDING" : "PAID",
      },

      invoice,
      newsletter,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      orderId: savedOrder._id,
      order: savedOrder,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

module.exports = { createOrder };
