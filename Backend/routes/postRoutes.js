const express = require('express');
const router = express.Router();
const { getPost, updatePost } = require("../controller/postController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


//CRUD


//Read
router.get('/', getPost);

//update
router.put('/', authMiddleware, roleMiddleware("admin"), updatePost);


module.exports = router;