const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductsByCategory,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/Multer");

// ==========================================
// CREATE PRODUCT
// ==========================================

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 10,
    },
  ]),
  createProduct
);

// ==========================================
// GET ALL PRODUCTS
// ==========================================

router.get("/", getProducts);

//GET PRODUCT BY CATEGORY
router.get("/category/:category", getProductsByCategory);

// ==========================================
// GET SINGLE PRODUCT
// ==========================================

router.get("/:id", getSingleProduct);

// ==========================================
// UPDATE PRODUCT
// ==========================================

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 10,
    },
  ]),
  updateProduct
);

// ==========================================
// DELETE PRODUCT
// ==========================================

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteProduct
);

module.exports = router;