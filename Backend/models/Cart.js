const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    // One cart belongs to one user
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    items: [
      {
        // Product reference
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        // Selected variant inside Product.variants
        variantId: {
          type: Schema.Types.ObjectId,
          required: true
        },

        // Quantity selected by customer
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Cart", cartSchema);