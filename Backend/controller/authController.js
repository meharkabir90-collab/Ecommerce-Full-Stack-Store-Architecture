const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../models/Auth");
const generateToken = require("../Utils/generateToken");

// =====================================================
// VALIDATION
// =====================================================

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  name: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});


// =====================================================
// REGISTER
// =====================================================

const register = async (req, res, next) => {
  try {

    // ---------------------------------------------
    // Validate request
    // ---------------------------------------------

    const { error } = registerSchema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details
          .map((d) => d.message)
          .join(", "),
      });
    }


    // ---------------------------------------------
    // Check existing email
    // ---------------------------------------------

    const existingUser = await User.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }


    // ---------------------------------------------
    // Hash password
    // ---------------------------------------------

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    );


    // ---------------------------------------------
    // First user = admin
    // ---------------------------------------------

    const userCount = await User.countDocuments();

    const role =
      userCount === 0
        ? "admin"
        : "user";


    // ---------------------------------------------
    // Create user
    // ---------------------------------------------

    const user = await User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role,
    });


    // ---------------------------------------------
    // Generate JWT
    // ---------------------------------------------

    const token = generateToken(
      user._id,
      user.role
    );


    // ---------------------------------------------
    // Response
    // ---------------------------------------------

    res.status(201).json({
      success: true,
      message: "User registered successfully",

      token,

      data: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// LOGIN
// =====================================================

const login = async (req, res, next) => {
  try {

    // ---------------------------------------------
    // Validate request
    // ---------------------------------------------

    const { error } = loginSchema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details
          .map((d) => d.message)
          .join(", "),
      });
    }


    // ---------------------------------------------
    // Find user
    // ---------------------------------------------

    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    // ---------------------------------------------
    // Check password
    // ---------------------------------------------

    const isMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    // ---------------------------------------------
    // Generate JWT
    // ---------------------------------------------

    const token = generateToken(
      user._id,
      user.role
    );


    // ---------------------------------------------
    // Response
    // ---------------------------------------------

    res.status(200).json({
      success: true,
      message: "LoggedIn successfully",

      token,

      data: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// LOGOUT
// =====================================================

const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  register,
  login,
  logout,
};