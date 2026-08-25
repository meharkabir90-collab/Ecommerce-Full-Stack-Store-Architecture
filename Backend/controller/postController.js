
const Post = require("../models/Post");

// GET INTRODUCTION
const getPost = async (req, res) => {
  try {
    const post = await Post.findOne();

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE INTRODUCTION
const updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      {}, // match ANY existing document (since there's only one)
      req.body,
      {
        new: true,
        runValidators: true,
        upsert: true, // create it if it doesn't exist yet
      }
    );

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPost,
  updatePost,
};