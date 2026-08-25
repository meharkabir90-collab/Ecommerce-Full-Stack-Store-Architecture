import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import {
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../Services/cartService";


function Cart() {

  const [cart, setCart] = useState({
    items: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==========================================
  // GET CART
  // ==========================================

  const fetchCart = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getCart();

      console.log("FULL CART RESPONSE:", data);
      console.log("CART:", data.cart);
      console.log(
        "CART ITEMS:",
        JSON.stringify(data.cart?.items, null, 2)
      );

      setCart(
        data.cart || {
          items: [],
        }
      );

    } catch (error) {

      console.error("GET CART ERROR:", error);
      console.error("RESPONSE:", error.response?.data);

      setError(
        error?.response?.data?.message ||
        "Failed to load cart."
      );

      setCart({
        items: [],
      });

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD CART WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {
    fetchCart();
  }, []);


  // ==========================================
  // ITEMS
  // ==========================================

  const items = cart?.items || [];


  // ==========================================
  // UPDATE QUANTITY
  // ==========================================

  const handleQuantityChange = async (
    productId,
    variantId,
    quantity
  ) => {

    if (quantity < 1) {
      return;
    }

    console.log("UPDATE REQUEST:", {
      productId,
      variantId,
      quantity,
    });

    if (!variantId) {

      console.error(
        "Missing variantId for cart item."
      );

      alert(
        "This cart item has no variant ID."
      );

      return;
    }

    try {

      const data = await updateCartItem(
        productId,
        variantId,
        quantity
      );

      console.log(
        "UPDATED CART:",
        data
      );

      setCart(
        data.cart || {
          items: [],
        }
      );

    } catch (error) {

      console.error(
        "UPDATE CART ERROR:",
        error
      );

      console.error(
        "RESPONSE:",
        error.response?.data
      );

      alert(
        error?.response?.data?.message ||
        "Failed to update quantity."
      );

    }

  };


  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const handleRemove = async (
    productId,
    variantId
  ) => {

    console.log("REMOVE REQUEST:", {
      productId,
      variantId,
    });

    if (!variantId) {

      console.error(
        "Missing variantId for cart item."
      );

      alert(
        "This cart item has no variant ID."
      );

      return;
    }

    try {

      const data = await removeFromCart(
        productId,
        variantId
      );

      console.log(
        "REMOVED CART:",
        data
      );

      setCart(
        data.cart || {
          items: [],
        }
      );

    } catch (error) {

      console.error(
        "REMOVE CART ERROR:",
        error
      );

      console.error(
        "RESPONSE:",
        error.response?.data
      );

      alert(
        error?.response?.data?.message ||
        "Failed to remove item."
      );

    }

  };


  // ==========================================
  // CLEAR CART
  // ==========================================

  const handleClearCart = async () => {

    try {

      const data = await clearCart();

      console.log(
        "CLEARED CART:",
        data
      );

      setCart(
        data.cart || {
          items: [],
        }
      );

    } catch (error) {

      console.error(
        "CLEAR CART ERROR:",
        error
      );

      console.error(
        "RESPONSE:",
        error.response?.data
      );

      alert(
        error?.response?.data?.message ||
        "Failed to clear cart."
      );

    }

  };


  // ==========================================
  // SUBTOTAL
  // ==========================================

  const subtotal = items.reduce(
    (total, item) => {

      const product = item.product;

      if (!product) {
        return total;
      }

      const price =
        Number(product.discountPrice) ||
        Number(product.price) ||
        0;

      return total + price * item.quantity;

    },
    0
  );


  // ==========================================
  // TOTAL ITEMS
  // ==========================================

  const totalItems = items.reduce(
    (total, item) => {

      return total + item.quantity;

    },
    0
  );


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <section className="min-h-screen pt-32 flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-500">
            Loading cart...
          </p>

        </div>

      </section>
    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (
      <section className="min-h-screen pt-32 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h1 className="text-3xl font-bold mb-4">
            Your Cart
          </h1>

          <p className="text-red-500 mb-6">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchCart}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Try Again
          </button>

        </div>

      </section>
    );

  }


  // ==========================================
  // EMPTY CART
  // ==========================================

  if (items.length === 0) {

    return (
      <section className="min-h-screen pt-32 px-6 pb-16">

        <div className="max-w-5xl mx-auto text-center">

          <div className="border border-gray-200 rounded-2xl p-12">

            <div className="text-6xl mb-6">
              🛒
            </div>

            <h1 className="text-4xl font-bold mb-4">
              Your Cart
            </h1>

            <p className="text-gray-500 mb-8">
              Your cart is currently empty.
            </p>

            <Link
              to="/"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </section>
    );

  }


  // ==========================================
  // CART PAGE
  // ==========================================

  return (

    <section className="min-h-screen pt-32 px-6 pb-20 bg-white">

      <div className="max-w-7xl mx-auto">


        {/* =====================================
            HEADER
        ===================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">

          <div>

            <p className="text-sm text-gray-500 mb-2">
              Shopping Bag
            </p>

            <h1 className="text-4xl font-bold">
              Your Cart
            </h1>

            <p className="text-gray-500 mt-2">

              {totalItems} item
              {totalItems !== 1 ? "s" : ""}

            </p>

          </div>


          <button
            type="button"
            onClick={handleClearCart}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Clear Cart
          </button>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">


          {/* =====================================
              CART ITEMS
          ===================================== */}

          <div className="lg:col-span-2 space-y-5">

            {items.map((item) => {

              const product = item.product;

              if (!product) {
                return null;
              }


              // DEBUG
              console.log("CART ITEM:", {
                itemId: item._id,
                productId: product._id,
                variantId: item.variantId,
                quantity: item.quantity,
              });


              const price =
                Number(product.discountPrice) ||
                Number(product.price) ||
                0;


              const itemTotal =
                price * item.quantity;


              return (

                <div
                  key={item._id}
                  className="border border-gray-200 rounded-2xl p-5 flex gap-5"
                >


                  {/* =================================
                      IMAGE
                  ================================= */}

                  <Link
                    to={`/product/${product._id}`}
                    className="w-32 h-32 flex-shrink-0"
                  >

                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-xl"
                    />

                  </Link>


                  {/* =================================
                      PRODUCT DETAILS
                  ================================= */}

                  <div className="flex-1 min-w-0">

                    <p className="text-sm text-gray-500">
                      {product.subTitle}
                    </p>


                    <Link
                      to={`/product/${product._id}`}
                    >

                      <h2 className="text-lg font-semibold mt-1 hover:underline">
                        {product.title}
                      </h2>

                    </Link>


                    {/* SKU */}

                    {product.sku && (

                      <p className="text-sm text-gray-500 mt-2">

                        SKU:

                        <span className="text-black ml-2">
                          {product.sku}
                        </span>

                      </p>

                    )}


                    {/* PRICE */}

                    <p className="font-semibold mt-3">
                      Rs. {price.toLocaleString()}
                    </p>


                    {/* =================================
                        QUANTITY
                    ================================= */}

                    <div className="flex items-center gap-3 mt-4">


                      {/* DECREASE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(
                            product._id,
                            item.variantId,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        −
                      </button>


                      {/* QUANTITY */}

                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>


                      {/* INCREASE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(
                            product._id,
                            item.variantId,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        +
                      </button>

                    </div>

                  </div>


                  {/* =================================
                      RIGHT SIDE
                  ================================= */}

                  <div className="flex flex-col items-end justify-between">

                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(
                          product._id,
                          item.variantId
                        )
                      }
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>


                    <p className="font-bold whitespace-nowrap">

                      Rs.{" "}
                      {itemTotal.toLocaleString()}

                    </p>

                  </div>

                </div>

              );

            })}

          </div>


          {/* =====================================
              ORDER SUMMARY
          ===================================== */}

          <div>

            <div className="border border-gray-200 rounded-2xl p-6 sticky top-28 flex flex-col
            justify-center text-center">

              <h2 className="text-xl font-bold mb-6">
                Order Summary
              </h2>


              {/* ITEMS */}

              <div className="flex justify-between mb-4">

                <span className="text-gray-500">
                  Items
                </span>

                <span>
                  {totalItems}
                </span>

              </div>


              {/* SUBTOTAL */}

              <div className="flex justify-between mb-4">

                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium">
                  Rs. {subtotal.toLocaleString()}
                </span>

              </div>


              {/* SHIPPING */}

              <div className="flex justify-between mb-4">

                <span className="text-gray-500">
                  Shipping
                </span>

                <span className="text-green-600">
                  Free
                </span>

              </div>


              <hr className="my-5" />


              {/* TOTAL */}

              <div className="flex justify-between text-lg font-bold">

                <span>
                  Total
                </span>

                <span>
                  Rs. {subtotal.toLocaleString()}
                </span>

              </div>


              {/* CHECKOUT */}

              <NavLink to='/order'
                type="button"
                className="w-full mt-12 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                PROCEED TO CHECKOUT
              </NavLink>


              {/* CONTINUE SHOPPING */}

              <Link
                to="/"
                className="block w-full mt-3 border border-gray-300 py-3 rounded-lg text-center hover:bg-gray-50 transition"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}


export default Cart;