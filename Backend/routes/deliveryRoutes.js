const express = require('express');
const router = express.Router();
const { getDelivery, updateDelivery } = require("../controller/deliveryController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");



//CRUD


//Read
router.get('/', getDelivery);

//update
router.put('/', authMiddleware, roleMiddleware("admin"), updateDelivery);


module.exports = router;