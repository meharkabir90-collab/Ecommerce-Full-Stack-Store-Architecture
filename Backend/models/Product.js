const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    image: {
      type: String,
      required: true
    },

    gallery: {
      type: [String],
      default: []
    },

    subTitle: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    // Parent/Product SKU
    sku: {
      type: String,
      required: true,
      unique: true
    },

    shortDescription: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    discountPrice: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null
    },

    // Size + Color + Variant SKU + Stock
    variants: [
      {
        sku: {
          type: String,
          required: true
        },

        size: {
          type: String,
          required: true
        },

        color: {
          type: String,
          required: true
        },

        stock: {
          type: Number,
          default: 0,
          min: 0
        }
      }
    ],

    featured: {
      type: Boolean,
      default: false
    }
  },

  {
    timestamps: true,
    collection: "ecommerce-products"
  }
);

module.exports = mongoose.model("Product", productSchema);