const mongoose = require("mongoose");

const { Schema } = mongoose;

const footerSchema = new Schema(
  {
    aboutText: String,

    quickLinks: [
      {
        title: String,
        url: String
      }
    ],

    categories: [
      {
        title: String,
        url: String
      }
    ],

    copyright: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Footer", footerSchema);