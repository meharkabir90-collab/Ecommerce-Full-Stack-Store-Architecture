const mongoose = require("mongoose");

const { Schema } = mongoose;

const deliverySchema = new Schema(
   {
    

    image1: {
      type: String,
      required: true
      },

    image2: {
      type: String,
      required: true
      }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Delivery", deliverySchema);