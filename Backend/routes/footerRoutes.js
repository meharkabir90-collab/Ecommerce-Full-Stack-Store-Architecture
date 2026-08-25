const express = require('express');
const router = express.Router();
const { getFooter, updateFooter } = require("../controller/footerController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");



//CRUD


//Read
router.get('/', getFooter);

//update
router.put('/', authMiddleware, roleMiddleware("admin"), updateFooter);


module.exports = router;