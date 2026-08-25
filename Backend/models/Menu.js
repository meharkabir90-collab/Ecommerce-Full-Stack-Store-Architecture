const mongoose = require("mongoose");

const { Schema } = mongoose;

const menuSchema = new Schema
  ({
  title: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, required: true },
  categorySlug: {type: String, default: null},
  parent: {type: mongoose.Schema.Types.ObjectId, ref: "Menu", default: null},
},

  {
    timestamps: true
  }
);

module.exports = mongoose.model("Menu", menuSchema);