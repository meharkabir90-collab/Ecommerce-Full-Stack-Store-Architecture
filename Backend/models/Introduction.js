const mongoose = require("mongoose");

const { Schema } = mongoose;

const introSchema = new Schema(
  {

      title: String,
      shortDescription: String,
      image: {
      type: String,
      required: true
      }
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Introduction", introSchema);