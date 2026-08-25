const express = require("express");

const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require("../controller/cartController");

const authMiddleware = require("../middleware/authMiddleware");


// GET CART
router.get(
  "/",
  authMiddleware,
  getCart
);


// ADD TO CART
router.post(
  "/add",
  authMiddleware,
  addToCart
);


// UPDATE CART ITEM
router.put(
  "/item/:productId/:variantId",
  authMiddleware,
  updateCartItem
);


// REMOVE CART ITEM
router.delete(
  "/item/:productId/:variantId",
  authMiddleware,
  removeFromCart
);


// CLEAR CART
router.delete(
  "/clear",
  authMiddleware,
  clearCart
);


module.exports = router;