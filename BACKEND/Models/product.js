const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
{
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Rings", "Pendants", "Earrings"],
    },

    designedYear: {
      type: Number,
    },

    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],

    price: {
      currency: { type: String, default: "EUR" },
      amount: { type: Number, required: true },
    },

    variants: {
      colors: [
        {
          name: String,
          code: String,
          metal: String,
          finish: String,
        },
      ],
      sizes: [Number],
    },

    description: {
      type: [String],
    },

    specifications: {
      metal: String,
      finish: String,
      dimensions: {
        height_mm: Number,
        width_mm: Number,
      },
    },

    inventory: {
      inStock: { type: Boolean, default: true },
      quantity: { type: Number, default: 0 },
    },

    shipping: {
      dispatchTime: String,
      origin: String,
    },

     collectionName: { type: String, index: true } 
  },
  {timestamps: true,}
);

productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('product', productSchema);