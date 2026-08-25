const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");


// =====================================================
// CREATE ORDER
// =====================================================

const createOrder = async (req, res) => {

  try {

    // =================================================
    // AUTHENTICATED USER
    // =================================================

    const userId = req.user._id;


    // =================================================
    // CUSTOMER INFORMATION
    // =================================================

    const {
      customer,
      shippingAddress,
      paymentMethod
    } = req.body;


    // =================================================
    // VALIDATE CUSTOMER
    // =================================================

    if (
      !customer ||
      !customer.name ||
      !customer.email ||
      !customer.phone
    ) {

      return res.status(400).json({
        success: false,
        message: "Customer information is required"
      });

    }


    // =================================================
    // VALIDATE SHIPPING ADDRESS
    // =================================================

    if (
      !shippingAddress ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.province ||
      !shippingAddress.postalCode
    ) {

      return res.status(400).json({
        success: false,
        message: "Complete shipping address is required"
      });

    }


    // =================================================
    // PAYMENT METHOD
    // =================================================

    if (paymentMethod !== "COD") {

      return res.status(400).json({
        success: false,
        message: "Only Cash on Delivery is available"
      });

    }


    // FIND CART

    const cart = await Cart.findOne({
      user: userId
    }).populate("items.product");


    // CART NOT FOUND

    if (!cart) {

      return res.status(400).json({
        success: false,
        message: "Cart not found"
      });

    }


    // EMPTY CART
 

    if (!cart.items || cart.items.length === 0) {

      return res.status(400).json({
        success: false,
        message: "Your cart is empty"
      });

    }


  
    // ORDER ITEMS


    const orderItems = [];

    let subtotal = 0;


    // =================================================
    // PROCESS CART ITEMS
    // =================================================

    for (const cartItem of cart.items) {

      const product = await Product.findById(
        cartItem.product
      );


      // -------------------------------------------------
      // PRODUCT CHECK
      // -------------------------------------------------

      if (!product) {

        return res.status(400).json({
          success: false,
          message: "A product in your cart no longer exists"
        });

      }


      // -------------------------------------------------
      // VARIANT CHECK
      // -------------------------------------------------

      const variant = product.variants.id(
        cartItem.variantId
      );


      if (!variant) {

        return res.status(400).json({
          success: false,
          message:
            `Variant not found for ${product.title}`
        });

      }


      // -------------------------------------------------
      // STOCK CHECK
      // -------------------------------------------------

      if (variant.stock < cartItem.quantity) {

        return res.status(400).json({
          success: false,
          message:
            `${product.title} (${variant.size}, ${variant.color}) has only ${variant.stock} item(s) available`
        });

      }


      // -------------------------------------------------
      // PRICE
      // -------------------------------------------------

      const price =
        Number(product.discountPrice) ||
        Number(product.price) ||
        0;


      // -------------------------------------------------
      // ITEM TOTAL
      // -------------------------------------------------

      const itemTotal =
        price * cartItem.quantity;


      // -------------------------------------------------
      // ADD TO ORDER
      // -------------------------------------------------

      orderItems.push({

        product: product._id,

        variantId: variant._id,

        title: product.title,

        sku: variant.sku,

        size: variant.size,

        color: variant.color,

        price,

        quantity: cartItem.quantity,

        total: itemTotal

      });


      // -------------------------------------------------
      // SUBTOTAL
      // -------------------------------------------------

      subtotal += itemTotal;

    }


    // =================================================
    // SHIPPING
    // =================================================

    const shipping = 0;


    // =================================================
    // TOTAL
    // =================================================

    const total =
      subtotal + shipping;


    // =================================================
    // CREATE ORDER
    // =================================================

    const order = await Order.create({

      user: userId,

      customer: {

        name: customer.name,

        email: customer.email,

        phone: customer.phone

      },

      shippingAddress: {

        address: shippingAddress.address,

        city: shippingAddress.city,

        province: shippingAddress.province,

        postalCode: shippingAddress.postalCode

      },

      items: orderItems,

      subtotal,

      shipping,

      total,

      paymentMethod: "COD",

      paymentStatus: "Pending",

      orderStatus: "Pending"

    });


    // =================================================
    // REDUCE VARIANT STOCK
    // =================================================

    for (const cartItem of cart.items) {

      const product =
        await Product.findById(
          cartItem.product._id
        );


      if (!product) {
        continue;
      }


      const variant =
        product.variants.id(
          cartItem.variantId
        );


      if (!variant) {
        continue;
      }


      variant.stock -=
        cartItem.quantity;


      await product.save();

    }


    // =================================================
    // CLEAR CART
    // =================================================

    cart.items = [];

    await cart.save();


    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({

      success: true,

      message:
        "Order placed successfully",

      order

    });


  } catch (error) {

    console.error(
      "CREATE ORDER ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};


// =====================================================
// GET MY ORDERS
// =====================================================

const getMyOrders = async (req, res) => {

  try {

    const orders =
      await Order.find({
        user: req.user._id
      })
      .sort({
        createdAt: -1
      });


    return res.status(200).json({

      success: true,

      count: orders.length,

      orders

    });

  } catch (error) {

    console.error(
      "GET MY ORDERS ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};

// GET ALL ORDERS - ADMIN

const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {

    console.error("GET ALL ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// GET ORDER BY ID - ADMIN

const getOrderById = async (req, res) => {
  try {

    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {

    console.error("GET ORDER BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// UPDATE ORDER STATUS - ADMIN
// =====================================================

const updateOrderStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { orderStatus } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status"
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order
    });

  } catch (error) {

    console.error("UPDATE ORDER STATUS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// =====================================================
// UPDATE PAYMENT STATUS - ADMIN
// =====================================================

const updatePaymentStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { paymentStatus } = req.body;

    const allowedStatuses = [
      "Pending",
      "Paid"
    ];

    if (!allowedStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status"
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    order.paymentStatus = paymentStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment status updated",
      order
    });

  } catch (error) {

    console.error("UPDATE PAYMENT STATUS ERROR:", error);

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

  createOrder,
  getMyOrders,

  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,

};