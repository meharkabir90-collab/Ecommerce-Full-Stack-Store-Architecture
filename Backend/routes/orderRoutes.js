const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
} = require("../controller/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// ==========================================
// CUSTOMER
// ==========================================

// CREATE ORDER
// POST /api/order

router.post(
  "/",
  authMiddleware,
  createOrder
);


// GET MY ORDERS
// GET /api/order/my-orders

router.get(
  "/my-orders",
  authMiddleware,
  getMyOrders
);


// ==========================================
// ADMIN
// ==========================================

// GET ALL ORDERS
// GET /api/order/admin/all

router.get(
  "/admin/all",
  authMiddleware,
  roleMiddleware("admin"),
  getAllOrders
);


// GET SINGLE ORDER
// GET /api/order/admin/:id

router.get(
  "/admin/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getOrderById
);


// UPDATE ORDER STATUS
// PATCH /api/order/admin/:id/status

router.patch(
  "/admin/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateOrderStatus
);


// UPDATE PAYMENT STATUS
// PATCH /api/order/admin/:id/payment

router.patch(
  "/admin/:id/payment",
  authMiddleware,
  roleMiddleware("admin"),
  updatePaymentStatus
);


module.exports = router;