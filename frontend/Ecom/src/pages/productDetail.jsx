import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProductById } from "../Services/productService";
import { addToCart } from "../Services/cartService";

``
function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();


  // ==========================================
  // STATE
  // ==========================================

  const [product, setProduct] = useState(null);

  const [selectedSize, setSelectedSize] = useState("");

  const [selectedColor, setSelectedColor] = useState("");

  const [selectedImage, setSelectedImage] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [addingToCart, setAddingToCart] = useState(false);

  const [cartError, setCartError] = useState("");


  // ==========================================
  // GET PRODUCT
  // ==========================================

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const data = await getProductById(id);

        setProduct(data.product);

        setSelectedImage(
          data.product.image
        );

      } catch (error) {

        console.error(
          "FAILED TO LOAD PRODUCT:",
          error
        );

      }

    };


    fetchProduct();

  }, [id]);


  // ==========================================
  // LOADING
  // ==========================================

  if (!product) {

    return (
      <div className="pt-32 text-center">
        Loading...
      </div>
    );

  }


  // ==========================================
  // UNIQUE SIZES
  // ==========================================

  const sizes = [
    ...new Set(
      product.variants?.map(
        (variant) => variant.size
      ) || []
    )
  ];


  // ==========================================
  // UNIQUE COLORS
  // ==========================================

  const colors = [
    ...new Set(
      product.variants?.map(
        (variant) => variant.color
      ) || []
    )
  ];


  // ==========================================
  // FIND SELECTED VARIANT
  // ==========================================

  const selectedVariant =
    product.variants?.find(
      (variant) =>
        variant.size === selectedSize &&
        variant.color === selectedColor
    );


  // ==========================================
  // VARIANT DATA
  // ==========================================

  const selectedVariantSku =
    selectedVariant?.sku || "";


  const selectedStock =
    selectedVariant?.stock || 0;


  // ==========================================
  // GALLERY
  // ==========================================

  const galleryImages = [
    product.image,
    ...(product.gallery || [])
  ];


  const uniqueGalleryImages = [
    ...new Set(galleryImages)
  ];


  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = async () => {

    setCartError("");


    // ------------------------------
    // CHECK SIZE
    // ------------------------------

    if (!selectedSize) {

      setCartError(
        "Please select a size."
      );

      return;
    }


    // ------------------------------
    // CHECK COLOR
    // ------------------------------

    if (!selectedColor) {

      setCartError(
        "Please select a color."
      );

      return;
    }


    // ------------------------------
    // CHECK VARIANT
    // ------------------------------

    if (!selectedVariant) {

      setCartError(
        "This size and color combination is unavailable."
      );

      return;
    }


    // ------------------------------
    // CHECK STOCK
    // ------------------------------

    if (selectedStock <= 0) {

      setCartError(
        "This variant is out of stock."
      );

      return;
    }


    try {

      setAddingToCart(true);


      console.log(
        "ADDING TO CART:",
        {
          productId: product._id,
          variantId: selectedVariant._id,
          quantity,
          size: selectedVariant.size,
          color: selectedVariant.color,
          sku: selectedVariant.sku,
        }
      );


      // ==================================
      // API CALL
      // ==================================

      const data = await addToCart(
        product._id,
        selectedVariant._id,
        quantity
      );


      console.log(
        "ADD TO CART RESPONSE:",
        data
      );


      // ==================================
      // GO TO CART
      // ==================================

      navigate("/cart");


    } catch (error) {

      console.error(
        "ADD TO CART ERROR:",
        error
      );

      console.error(
        "STATUS:",
        error?.response?.status
      );

      console.error(
        "RESPONSE:",
        error?.response?.data
      );


      setCartError(
        error?.response?.data?.message ||
        "Failed to add product to cart."
      );

    } finally {

      setAddingToCart(false);

    }

  };


  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = () => {

    if (!selectedVariant) {
      return;
    }

    if (quantity >= selectedStock) {
      return;
    }

    setQuantity(
      (previous) => previous + 1
    );

  };


  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = () => {

    if (quantity <= 1) {
      return;
    }

    setQuantity(
      (previous) => previous - 1
    );

  };


  // ==========================================
  // HANDLE SIZE CHANGE
  // ==========================================

  const handleSizeChange = (size) => {

    setSelectedSize(size);

    setCartError("");

    setQuantity(1);

  };


  // ==========================================
  // HANDLE COLOR CHANGE
  // ==========================================

  const handleColorChange = (color) => {

    setSelectedColor(color);

    setCartError("");

    setQuantity(1);

  };


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <section className="pt-32 px-16 pb-16">

      <div className="grid grid-cols-2 gap-16">


        {/* ======================================
            LEFT - PRODUCT GALLERY
        ====================================== */}

        <div className="flex gap-5">


          {/* THUMBNAILS */}

          <div className="flex flex-col gap-3">

            {uniqueGalleryImages.map(
              (image, index) => (

                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setSelectedImage(image)
                  }
                  className={`border ${
                    selectedImage === image
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                >

                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />

                </button>

              )
            )}

          </div>


          {/* MAIN IMAGE */}

          <div className="flex-1 flex justify-center">

            <img
              src={
                selectedImage ||
                product.image
              }
              alt={product.title}
              className="w-[500px] h-[550px] object-contain"
            />

          </div>

        </div>


        {/* ======================================
            RIGHT - PRODUCT DETAILS
        ====================================== */}

        <div className="flex flex-col gap-5">

          {product.category && (
           <p className="text-sm uppercase tracking-widest text-gray-400">
               {product.category}
           </p>
         )}



          {/* SUBTITLE */}

          <p className="text-gray-500">
            {product.subTitle}
          </p>


          {/* TITLE */}

          <h1 className="text-4xl font-bold">
            {product.title}
          </h1>


          {/* PARENT SKU */}

          <p className="text-sm text-gray-500">

            Product SKU:

            <span className="text-black ml-2 font-medium">
              {product.sku}
            </span>

          </p>


          {/* VARIANT SKU */}

          {selectedVariant && (

            <p className="text-sm text-gray-500">

              Variant SKU:

              <span className="text-black ml-2 font-medium">
                {selectedVariant.sku}
              </span>

            </p>

          )}


          {/* PRICE */}

          <div className="flex items-center gap-4">

            <span className="text-gray-400 line-through text-lg">
              Rs. {product.price}
            </span>

            <span className="text-[#dab37a] text-2xl font-bold">
              Rs. {product.discountPrice}
            </span>

          </div>


          {/* SHORT DESCRIPTION */}

          <p className="text-gray-600 leading-7">
            {product.shortDescription}
          </p>


          <hr />


          {/* ======================================
              SIZE
          ====================================== */}

          <div>

            <h3 className="font-semibold mb-3">
              Select Size
            </h3>


            <div className="flex gap-3 flex-wrap">

              {sizes.map((size) => (

                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    handleSizeChange(size)
                  }
                  className={`border px-5 py-2 ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {size}
                </button>

              ))}

            </div>

          </div>


          {/* ======================================
              COLOR
          ====================================== */}

          <div>

            <h3 className="font-semibold mb-3">
              Select Color
            </h3>


            <div className="flex gap-3 flex-wrap">

              {colors.map((color) => (

                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    handleColorChange(color)
                  }
                  className={`border px-5 py-2 ${
                    selectedColor === color
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {color}
                </button>

              ))}

            </div>

          </div>


          {/* ======================================
              SELECTED VARIANT
          ====================================== */}

          {selectedSize &&
            selectedColor && (

              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">

                {selectedVariant ? (

                  <div className="space-y-3">


                    {/* VARIANT SKU */}

                    <div className="flex justify-between items-center">

                      <span className="text-sm text-gray-500">
                        Variant SKU
                      </span>

                      <span className="text-sm font-semibold text-gray-900">
                        {selectedVariantSku}
                      </span>

                    </div>


                    {/* SIZE */}

                    <div className="flex justify-between items-center">

                      <span className="text-sm text-gray-500">
                        Size
                      </span>

                      <span className="text-sm font-medium text-gray-900">
                        {selectedVariant.size}
                      </span>

                    </div>


                    {/* COLOR */}

                    <div className="flex justify-between items-center">

                      <span className="text-sm text-gray-500">
                        Color
                      </span>

                      <span className="text-sm font-medium text-gray-900">
                        {selectedVariant.color}
                      </span>

                    </div>


                    {/* STOCK */}

                    <div className="flex justify-between items-center">

                      <span className="text-sm text-gray-500">
                        Stock
                      </span>

                      {selectedStock > 0 ? (

                        <span className="text-sm font-medium text-green-600">
                          {selectedStock} available
                        </span>

                      ) : (

                        <span className="text-sm font-medium text-red-600">
                          Out of Stock
                        </span>

                      )}

                    </div>


                  </div>

                ) : (

                  <p className="text-red-600">
                    This size and color combination is unavailable.
                  </p>

                )}

              </div>

            )}


          {/* ======================================
              QUANTITY
          ====================================== */}

          {selectedVariant &&
            selectedStock > 0 && (

              <div>

                <h3 className="font-semibold mb-3">
                  Quantity
                </h3>


                <div className="flex items-center gap-4">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 border border-gray-300 rounded disabled:opacity-40"
                  >
                    −
                  </button>


                  <span className="w-8 text-center font-semibold">
                    {quantity}
                  </span>


                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={
                      quantity >= selectedStock
                    }
                    className="w-10 h-10 border border-gray-300 rounded disabled:opacity-40"
                  >
                    +
                  </button>

                </div>

              </div>

            )}


          {/* ======================================
              ERROR
          ====================================== */}

          {cartError && (

            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {cartError}
            </div>

          )}


          {/* ======================================
              ADD TO CART
          ====================================== */}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={
              addingToCart ||
              !selectedVariant ||
              selectedStock <= 0
            }
            className={`py-4 px-8 w-full mt-4 font-semibold transition ${
              addingToCart ||
              !selectedVariant ||
              selectedStock <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >

            {addingToCart
              ? "ADDING..."
              : "ADD TO CART"}

          </button>

        </div>

      </div>


      {/* ======================================
          PRODUCT DESCRIPTION
      ====================================== */}

      <div className="mt-20 border-t pt-10">

        <h2 className="text-2xl font-bold mb-5">
          Product Description
        </h2>

        <p className="text-gray-600 leading-8 max-w-4xl">
          {product.description}
        </p>

      </div>

    </section>

  );

}


export default ProductDetail;