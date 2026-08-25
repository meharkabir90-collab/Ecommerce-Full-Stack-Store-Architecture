const Introduction = require("../models/Introduction");

// GET INTRODUCTION
const getIntroduction = async (req, res) => {
  try {
    const introduction = await Introduction.findOne();

    res.status(200).json({
      success: true,
      introduction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// UPDATE INTRODUCTION
const updateIntroduction = async (req, res) => {
  try {
    const introduction = await Introduction.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!introduction) {
      return res.status(404).json({
        success: false,
        message: "Introduction not found"
      });
    }

    res.status(200).json({
      success: true,
      introduction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getIntroduction,
  updateIntroduction
};