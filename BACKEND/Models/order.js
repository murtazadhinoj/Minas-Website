const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    billingData: {
      firstName: String,
      lastName: String,
      country: String,
      town: String,
      state: String,
      address: String,
      apartment: String,
      postcode: String,
      email: String,
      phone: String,
    },

    cart: {
      type: Array,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    // 🔥 NEW PAYMENT OBJECT (IMPORTANT)
    payment: {
      method: {
        type: String, // CARD / GPAY / PAYPAL / COD
        required: true,
      },
      paymentId: {
        type: String, // Stripe paymentIntent.id
      },
      status: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED"],
        default: "PENDING",
      },
    },

    invoice: {
      type: Boolean,
      default: false,
    },

    newsletter: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
