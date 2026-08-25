const Cart = require("../models/Cart");
const Product = require("../models/Product");


// =====================================================
// GET CART
// =====================================================

const getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    // User doesn't have a cart yet
    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: []
        }
      });
    }

    res.status(200).json({
      success: true,
      cart
    });

  } catch (error) {

    console.error("GET CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// =====================================================
// ADD TO CART
// =====================================================

const addToCart = async (req, res) => {
  try {

    const {
      productId,
      variantId,
      quantity = 1
    } = req.body;


    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    if (!variantId) {
      return res.status(400).json({
        success: false,
        message: "Variant ID is required"
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });
    }


    // -------------------------------------------------
    // FIND PRODUCT
    // -------------------------------------------------

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }


    // -------------------------------------------------
    // FIND VARIANT
    // -------------------------------------------------

    const variant = product.variants.id(variantId);

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Product variant not found"
      });
    }


    // -------------------------------------------------
    // CHECK STOCK
    // -------------------------------------------------

    if (variant.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${variant.stock} item(s) available`
      });
    }


    // -------------------------------------------------
    // FIND USER CART
    // -------------------------------------------------

    let cart = await Cart.findOne({
      user: req.user._id
    });


    // -------------------------------------------------
    // CREATE CART
    // -------------------------------------------------

    if (!cart) {

      cart = await Cart.create({
        user: req.user._id,

        items: [
          {
            product: productId,
            variantId: variantId,
            quantity: quantity
          }
        ]
      });

    }

    // -------------------------------------------------
    // EXISTING CART
    // -------------------------------------------------

    else {

      const existingItem = cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.variantId.toString() === variantId
      );


      // ------------------------------------------------
      // VARIANT ALREADY IN CART
      // ------------------------------------------------

      if (existingItem) {

        const newQuantity =
          existingItem.quantity + quantity;


        if (newQuantity > variant.stock) {

          return res.status(400).json({
            success: false,
            message: `Only ${variant.stock} item(s) available`
          });

        }


        existingItem.quantity = newQuantity;

      }


      // ------------------------------------------------
      // NEW VARIANT
      // ------------------------------------------------

      else {

        cart.items.push({
          product: productId,
          variantId: variantId,
          quantity: quantity
        });

      }


      await cart.save();

    }


    // -------------------------------------------------
    // POPULATE PRODUCT
    // -------------------------------------------------

    await cart.populate("items.product");


    res.status(200).json({

      success: true,

      message: "Product added to cart",

      cart

    });


  } catch (error) {

    console.error("ADD TO CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// =====================================================
// UPDATE CART ITEM QUANTITY
// =====================================================

const updateCartItem = async (req, res) => {

  try {

    const {
      productId,
      variantId
    } = req.params;

    const {
      quantity
    } = req.body;


    // -------------------------------------------------
    // VALIDATE QUANTITY
    // -------------------------------------------------

    if (!quantity || quantity < 1) {

      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });

    }


    // -------------------------------------------------
    // FIND CART
    // -------------------------------------------------

    const cart = await Cart.findOne({
      user: req.user._id
    });


    if (!cart) {

      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });

    }


    // -------------------------------------------------
    // FIND CART ITEM
    // -------------------------------------------------

    const item = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variantId.toString() === variantId
    );


    if (!item) {

      return res.status(404).json({
        success: false,
        message: "Product variant not found in cart"
      });

    }


    // -------------------------------------------------
    // FIND PRODUCT
    // -------------------------------------------------

    const product = await Product.findById(productId);


    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });

    }


    // -------------------------------------------------
    // FIND VARIANT
    // -------------------------------------------------

    const variant = product.variants.id(variantId);


    if (!variant) {

      return res.status(404).json({
        success: false,
        message: "Product variant not found"
      });

    }


    // -------------------------------------------------
    // CHECK STOCK
    // -------------------------------------------------

    if (quantity > variant.stock) {

      return res.status(400).json({
        success: false,
        message: `Only ${variant.stock} item(s) available`
      });

    }


    // -------------------------------------------------
    // UPDATE
    // -------------------------------------------------

    item.quantity = quantity;


    await cart.save();

    await cart.populate("items.product");


    res.status(200).json({

      success: true,

      message: "Cart updated",

      cart

    });


  } catch (error) {

    console.error("UPDATE CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// =====================================================
// REMOVE ITEM
// =====================================================

const removeFromCart = async (req, res) => {

  try {

    const {
      productId,
      variantId
    } = req.params;


    const cart = await Cart.findOne({
      user: req.user._id
    });


    if (!cart) {

      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });

    }


    // -------------------------------------------------
    // REMOVE ONLY SELECTED VARIANT
    // -------------------------------------------------

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.product.toString() === productId &&
          item.variantId.toString() === variantId
        )
    );


    await cart.save();

    await cart.populate("items.product");


    res.status(200).json({

      success: true,

      message: "Product removed from cart",

      cart

    });


  } catch (error) {

    console.error("REMOVE CART ITEM ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// =====================================================
// CLEAR CART
// =====================================================

const clearCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      user: req.user._id
    });


    if (!cart) {

      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });

    }


    cart.items = [];


    await cart.save();


    res.status(200).json({

      success: true,

      message: "Cart cleared",

      cart

    });


  } catch (error) {

    console.error("CLEAR CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

  getCart,

  addToCart,

  updateCartItem,

  removeFromCart,

  clearCart

};
