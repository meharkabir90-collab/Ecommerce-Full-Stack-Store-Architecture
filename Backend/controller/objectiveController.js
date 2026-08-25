const Objective = require("../models/Objective");

// GET OBJECTIVE
const getObjective = async (req, res) => {
  try {
    const objective = await Objective.findOne();

    res.status(200).json({
      success: true,
      objective
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// UPDATE OBJECTIVE
const updateObjective = async (req, res) => {
  try {
    const objective = await Objective.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!objective) {
      return res.status(404).json({
        success: false,
        message: "Objective not found"
      });
    }

    res.status(200).json({
      success: true,
      objective
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  getObjective,
  updateObjective
};