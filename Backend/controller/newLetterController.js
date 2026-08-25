const newsLetterSubscriber = require('../models/subscribeNewsLetter');


// CREATE
const subscribeNewsLetter = async (req, res) => {
    try {
    const subscriber = await newsLetterSubscriber.create(req.body);

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
      subscriber
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email is already subscribed"
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { subscribeNewsLetter };