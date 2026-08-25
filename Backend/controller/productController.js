const Product = require("../models/Product");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");


// =====================================================
// CLOUDINARY UPLOAD
// =====================================================

const uploadProductImageToCloudinary = (buffer, folder = "products") =>
  new Promise((resolve, reject) => {

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {

        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    streamifier
      .createReadStream(buffer)
      .pipe(uploadStream);
  });


// =====================================================
// CREATE PRODUCT
// =====================================================

const createProduct = async (req, res) => {

  try {

    console.log("=================================");
    console.log("CREATE PRODUCT HIT");
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);
    console.log("=================================");


    // =================================================
    // MAIN IMAGE
    // =================================================

    const mainImage = req.files?.image?.[0];

    if (!mainImage) {

      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });

    }


    // =================================================
    // PARSE VARIANTS
    // =================================================

    let variants = [];

    if (req.body.variants) {

      try {

        variants = JSON.parse(req.body.variants);

      } catch (error) {

        return res.status(400).json({
          success: false,
          message: "Invalid variants data",
        });

      }

    }


    // =================================================
    // VALIDATE VARIANTS
    // =================================================

    if (!Array.isArray(variants)) {

      return res.status(400).json({
        success: false,
        message: "Variants must be an array",
      });

    }


    // =================================================
    // UPLOAD MAIN IMAGE
    // =================================================

    const mainImageResult =
      await uploadProductImageToCloudinary(
        mainImage.buffer,
        "products"
      );


    // =================================================
    // GALLERY
    // =================================================

    const galleryFiles =
      req.files?.gallery || [];

    const gallery = [];


    for (const file of galleryFiles) {

      const result =
        await uploadProductImageToCloudinary(
          file.buffer,
          "products/gallery"
        );

      gallery.push(result.secure_url);

    }


    // =================================================
    // PRODUCT DATA
    // =================================================

    const productData = {

      image:
        mainImageResult.secure_url,

      gallery,

      title:
        req.body.title,

      subTitle:
        req.body.subTitle,

      sku:
        req.body.sku,

      shortDescription:
        req.body.shortDescription,

      description:
        req.body.description,

      price:
        Number(req.body.price),

      discountPrice:
        Number(req.body.discountPrice),

      category:
        req.body.category,

      variants,

      featured:
        req.body.featured === "true",

    };


    console.log(
      "PRODUCT DATA:",
      productData
    );


    // =================================================
    // CREATE
    // =================================================

    const product =
      await Product.create(productData);


    console.log(
      "SAVED PRODUCT:",
      product
    );


    // =================================================
    // RESPONSE
    // =================================================

    res.status(201).json({

      success: true,

      message:
        "Product created successfully",

      product,

    });


  } catch (error) {

    console.error(
      "CREATE PRODUCT ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};



// =====================================================
// GET ALL PRODUCTS
// =====================================================

const getProducts = async (req, res) => {

  try {

    const { search } = req.query;

    let query = {};


    // =================================================
    // SEARCH
    // =================================================

    if (search) {

      query = {

        $or: [

          {
            title: {
              $regex: search,
              $options: "i",
            },
          },

          {
            subTitle: {
              $regex: search,
              $options: "i",
            },
          },

          {
            description: {
              $regex: search,
              $options: "i",
            },
          },

          {
            category: {
              $regex: search,
              $options: "i",
            },
          },

        ],

      };

    }


    // =================================================
    // GET PRODUCTS
    // =================================================

    const products =
      await Product.find(query)
        .sort({ createdAt: -1 });


    res.status(200).json({

      success: true,

      count:
        products.length,

      products,

    });


  } catch (error) {

    console.error(
      "GET PRODUCTS ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};



// =====================================================
// GET SINGLE PRODUCT
// =====================================================

const getSingleProduct = async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );


    if (!product) {

      return res.status(404).json({

        success: false,

        message:
          "Product not found",

      });

    }


    res.status(200).json({

      success: true,

      product,

    });


  } catch (error) {

    console.error(
      "GET SINGLE PRODUCT ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};



// =====================================================
// UPDATE PRODUCT
// =====================================================

const updateProduct = async (req, res) => {

  try {

    console.log("=================================");
    console.log("UPDATE PRODUCT HIT");
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);
    console.log("=================================");


    // =================================================
    // FIND EXISTING PRODUCT
    // =================================================

    const product =
      await Product.findById(
        req.params.id
      );


    if (!product) {

      return res.status(404).json({

        success: false,

        message:
          "Product not found",

      });

    }


    // =================================================
    // PARSE VARIANTS
    // =================================================

    let variants =
      product.variants;


    if (req.body.variants) {

      try {

        variants =
          JSON.parse(
            req.body.variants
          );

      } catch (error) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid variants data",

        });

      }

    }


    // =================================================
    // EXISTING GALLERY
    // =================================================

    let existingGallery =
      product.gallery || [];


    if (req.body.existingGallery) {

      try {

        existingGallery =
          JSON.parse(
            req.body.existingGallery
          );

      } catch (error) {

        existingGallery =
          product.gallery || [];

      }

    }


    // =================================================
    // MAIN IMAGE
    // =================================================

    let image =
      product.image;


    const mainImage =
      req.files?.image?.[0];


    if (mainImage) {

      const result =
        await uploadProductImageToCloudinary(
          mainImage.buffer,
          "products"
        );

      image =
        result.secure_url;

    }


    // =================================================
    // NEW GALLERY
    // =================================================

    const galleryFiles =
      req.files?.gallery || [];

    const newGallery = [];


    for (const file of galleryFiles) {

      const result =
        await uploadProductImageToCloudinary(
          file.buffer,
          "products/gallery"
        );

      newGallery.push(
        result.secure_url
      );

    }


    // =================================================
    // FINAL GALLERY
    // =================================================

    const finalGallery = [

      ...existingGallery,

      ...newGallery,

    ];


    // =================================================
    // UPDATE DATA
    // =================================================

    const updates = {

      image,

      gallery:
        finalGallery,

      title:
        req.body.title,

      subTitle:
        req.body.subTitle,

      sku:
        req.body.sku,

      shortDescription:
        req.body.shortDescription,

      description:
        req.body.description,

      price:
        Number(req.body.price),

      discountPrice:
        Number(req.body.discountPrice),

      category:
        req.body.category,

      variants,

      featured:
        req.body.featured === "true",

    };


    console.log(
      "UPDATE DATA:",
      updates
    );


    // =================================================
    // SAVE
    // =================================================

    const updatedProduct =
      await Product.findByIdAndUpdate(

        req.params.id,

        updates,

        {
          new: true,
          runValidators: true,
        }

      );


    // =================================================
    // RESPONSE
    // =================================================

    res.status(200).json({

      success: true,

      message:
        "Product updated successfully",

      product:
        updatedProduct,

    });


  } catch (error) {

    console.error(
      "UPDATE PRODUCT ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};



// =====================================================
// DELETE PRODUCT
// =====================================================

const deleteProduct = async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );


    if (!product) {

      return res.status(404).json({

        success: false,

        message:
          "Product not found",

      });

    }


    await product.deleteOne();


    res.status(200).json({

      success: true,

      message:
        "Product deleted successfully",

    });


  } catch (error) {

    console.error(
      "DELETE PRODUCT ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};



// =====================================================
// EXPORT
// =====================================================

module.exports = {

  createProduct,

  getProducts,

  getSingleProduct,

  updateProduct,

  deleteProduct,

};