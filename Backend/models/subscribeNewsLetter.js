const mongoose = require("mongoose");

const { Schema } = mongoose;

const newsletterSubscriberSchema = new Schema(
   {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address"
      ]
    },

    subscribed: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("NewsletterSubscriber",newsletterSubscriberSchema);