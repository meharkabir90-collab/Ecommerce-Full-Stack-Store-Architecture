  const mongoose = require("mongoose");
   const { Schema } = mongoose;

   const postSchema = new Schema(
     {
       Images: [{ type: String, required: true }],
     },
     { timestamps: true }
   );

   module.exports = mongoose.model("Post", postSchema);