const express = require('express');
const router = express.Router();
const { getIntroduction,
  updateIntroduction } = require("../controller/introductionController");
const upload = require('../middleware/Multer');
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


//CRUD


//Read
router.get('/', getIntroduction);

//update
router.put('/', authMiddleware, roleMiddleware("admin"),upload.single("image"), updateIntroduction);


module.exports = router;