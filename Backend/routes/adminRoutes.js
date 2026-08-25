const express = require("express");
const router = express.Router();

const {
  getDashboard
} = require("../controller/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getDashboard
);

module.exports = router;