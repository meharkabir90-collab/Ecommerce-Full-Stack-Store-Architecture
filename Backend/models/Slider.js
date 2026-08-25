const mongoose = require('mongoose');

const { Schema } = mongoose;

const sliderSchema = new Schema(
  {
    image: {
      type: String,
      required: true
    }

  
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model('Slider', sliderSchema);