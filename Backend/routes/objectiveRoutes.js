const express = require('express');
const router = express.Router();
const {  getObjective,
  updateObjective } = require("../controller/objectiveController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");




//CRUD

//Read
router.get('/', getObjective);

//update
router.put('/', authMiddleware, roleMiddleware("admin"), updateObjective);

module.exports = router;