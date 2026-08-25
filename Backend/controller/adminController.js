const Product = require("../models/Product");
const User = require("../models/Auth");
// const Order = require("../models/Order");

const getDashboard = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      dashboard: {
        totalProducts,
        totalUsers,
        // totalOrders,
        // revenue
      }
    });

  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboard
};