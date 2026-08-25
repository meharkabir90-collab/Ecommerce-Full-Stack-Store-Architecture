const mongoose = require("mongoose");

const { Schema } = mongoose;

const objectiveSchema = new Schema(
   {
    whyChooseUs: {
      title1: String,
      title2: String,

      points: [
        {
          description: String
        }
      ]
    },

    mission: {
      title: String,
      description: String
    
    },

    vision: {
      title: String,
      description: String,
        points: [
        {
          description: String
        }
      ]
    },

    image1: {
      type: String,
      required: true
      },

    image2: {
      type: String,
      required: true
      },
      
    image3: {
      type: String,
      required: true
      }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Objective", objectiveSchema);