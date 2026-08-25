const express = require('express');
const router = express.Router();
const { createSlider, getSliders, getSingleSlider, updateSlider,
    deleteSlider } = require('../controller/sliderController');
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


//RUD

//Read
router.get('/', getSliders);

//update
router.put('/:id', authMiddleware, roleMiddleware("admin"), updateSlider);
//delete
router.delete('/:id', authMiddleware, roleMiddleware("admin"), deleteSlider);

module.exports = router;