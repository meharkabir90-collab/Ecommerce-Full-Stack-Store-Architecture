const express = require('express');
const router = express.Router();
const { createMenu, getMenu, updateMenu,
    deleteMenu } = require("../controller/menuController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");



//CRUD

//create
router.post('/', authMiddleware, roleMiddleware("admin"), createMenu);

//Read
//search,filter
router.get('/', getMenu);

//update
router.put('/:id', authMiddleware, roleMiddleware("admin"), updateMenu);
//delete 
router.delete('/:id', authMiddleware, roleMiddleware("admin"), deleteMenu);


module.exports = router;