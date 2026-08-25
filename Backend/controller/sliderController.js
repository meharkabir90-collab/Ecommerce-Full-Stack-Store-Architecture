const Slider = require ('../models/Slider.js');

// CREATE
const createSlider = async (req, res) => {
  try {
    const slider = await Slider.create(req.body);

    res.status(201).json({
      success: true,
      slider
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL
const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();

    res.status(200).json({
      success: true,
      count: sliders.length,
      sliders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET SINGLE
const getSingleSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Slider not found"
      });
    }

    res.status(200).json({
      success: true,
      slider
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE
const updateSlider = async (req, res) => {
  try {
    const slider = await Slider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Slider not found"
      });
    }

    res.status(200).json({
      success: true,
      slider
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
const deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);

    if (!slider) {
      return res.status(404).json({
        success: false,
        message: "Slider not found"
      });
    }

    await slider.deleteOne();

    res.status(200).json({
      success: true,
      message: "Slider deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { createSlider, getSliders, getSingleSlider, updateSlider,
    deleteSlider
};