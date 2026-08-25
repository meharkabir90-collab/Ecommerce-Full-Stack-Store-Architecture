const express = require('express');
const router = express.Router();
const { getSettings, updateSettings} = require("../controller/settingsController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require('../middleware/Multer');


//CRUD
//Read
router.get('/', getSettings);

//update
router.put('/', authMiddleware, roleMiddleware("admin"),upload.single("logo"), updateSettings);


module.exports = router;