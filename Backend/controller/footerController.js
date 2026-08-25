const Footer = require('../models/Footer');



// GET FOOTER
const getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();

    res.status(200).json({
      success: true,
      footer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE FOOTER
const updateFooter = async (req, res) => {
  try {
    const footer = await Footer.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!footer) {
      return res.status(404).json({
        success: false,
        message: "Footer not found"
      });
    }

    res.status(200).json({
      success: true,
      footer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getFooter,
  updateFooter
};