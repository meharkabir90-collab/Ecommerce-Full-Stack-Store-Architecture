const Delivery = require("../models/Delivery");

// GET INTRODUCTION
const getDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findOne();

    res.status(200).json({
      success: true,
      delivery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// UPDATE INTRODUCTION
const updateDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found"
      });
    }

    res.status(200).json({
      success: true,
      delivery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDelivery,
  updateDelivery
};