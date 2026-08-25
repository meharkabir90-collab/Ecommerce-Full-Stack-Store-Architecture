const Menu = require('../models/Menu');



// CREATE
const createMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);

    res.status(201).json({
      success: true,
      menu
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL
const getMenu = async (req, res) => {

  try{
      const menu = await Menu.find();

    res.status(200).json({
      success: true,
      count: menu.length,
      menu
    });
  

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// UPDATE
const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    res.status(200).json({
      success: true,
      menu
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// DELETE
const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = { createMenu, getMenu, updateMenu,
    deleteMenu
};