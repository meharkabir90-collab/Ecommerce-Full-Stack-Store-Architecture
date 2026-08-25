const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const Settings = require('../models/websiteSettings');

// GET ALL
const getSettings= async (req, res) => {
  try {
    const settings = await Settings.findOne();

    res.status(200).json({
      success: true,
      settings
    });

  } catch (error) {
     console.error("UPDATE SETTINGS ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const uploadLogoToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'website-settings' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
 
// UPDATE
const updateSettings = async (req, res) => {
  try {
     console.log("req.file:", req.file);
    console.log("req.body:", req.body)
    const updates = { ...req.body };
 
    if (req.file) {
      const result = await uploadLogoToCloudinary(req.file.buffer);
      updates.logo = result.secure_url;
    } else {
      delete updates.logo;
    }
 
    const settings = await Settings.findOneAndUpdate(
      {},
      updates,
      { new: true, runValidators: true }
    );
 
    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Website Settings not found"
      });
    }
 
    res.status(200).json({
      success: true,
      settings
    });
 
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { getSettings, updateSettings };