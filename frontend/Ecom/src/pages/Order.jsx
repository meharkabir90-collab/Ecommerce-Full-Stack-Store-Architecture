import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getCart } from "../Services/cartService";
import { createOrder } from "../Services/orderService";


function Order() {

const navigate = useNavigate();

  // ==========================================
  // CART
  // ==========================================

  const [cart, setCart] = useState({
    items: [],
  });

  const [loading, setLoading] = useState(true);

  const [placingOrder, setPlacingOrder] = useState(false);

  const [error, setError] = useState("");

  const [orderError, setOrderError] = useState("");


  // ==========================================
  // CUSTOMER / SHIPPING FORM
  // ==========================================

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",

    address: "",
    city: "",
    province: "",
    postalCode: "",

  });


  // ==========================================
  // PAYMENT
  // ==========================================

  const [paymentMethod, setPaymentMethod] = useState("COD");


  // ==========================================
  // GET CART
  // ==========================================

  const fetchCart = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getCart();

      console.log("CHECKOUT CART RESPONSE:", data);

      setCart(
        data.cart || {
          items: [],
        }
      );

    } catch (error) {

      console.error(
        "CHECKOUT CART ERROR:",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Failed to load cart."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD CART
  // ==========================================

  useEffect(() => {

    fetchCart();

  }, []);


  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // ==========================================
  // CART ITEMS
  // ==========================================

  const items = cart?.items || [];


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

      return total + Number(item.quantity || 0);

    },
    0
  );


  // ==========================================
  // SHIPPING
  // ==========================================

  const shipping = 0;


  // ==========================================
  // TOTAL
  // ==========================================

  const total = subtotal + shipping;


  // ==========================================
  // PLACE ORDER
  // ==========================================

   const handlePlaceOrder = async (e) => {

  e.preventDefault();

  setPlacingOrder(true);
  setOrderError("");

  try {

    const orderData = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },

      shippingAddress: {
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
      },

      paymentMethod: "COD",
    };

    console.log(
      "ORDER DATA:",
      JSON.stringify(orderData, null, 2)
    );

    const data = await createOrder(orderData);

    console.log(
      "FULL CREATE ORDER RESPONSE:",
      data
    );

    alert("Order created successfully!");

    navigate('/my-order');

  } catch (error) {

    console.error(
      "PLACE ORDER ERROR:",
      error
    );

    console.error(
      "ERROR RESPONSE:",
      error.response?.data
    );

    setOrderError(
      error?.response?.data?.message ||
      "Failed to place order"
    );

  } finally {

    setPlacingOrder(false);

  }
};


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <section className="min-h-screen pt-32 flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-500">
            Loading checkout...
          </p>

        </div>

      </section>

    );

  }


  // ==========================================
  // CART ERROR
  // ==========================================

  if (error) {

    return (

      <section className="min-h-screen pt-32 px-6">

        <div className="max-w-xl mx-auto text-center">

          <h1 className="text-3xl font-bold mb-4">
            Checkout
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

      <section className="min-h-screen pt-32 px-6 pb-20">

        <div className="max-w-5xl mx-auto">

          <div className="border border-gray-200 rounded-2xl p-12 text-center">

            <div className="text-6xl mb-6">
              🛒
            </div>

            <h1 className="text-3xl font-bold mb-3">
              Your cart is empty
            </h1>

            <p className="text-gray-500 mb-8">
              Add some products before proceeding to checkout.
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
  // CHECKOUT PAGE
  // ==========================================

  return (

    <section className="min-h-screen pt-32 px-6 pb-20 bg-gray-50">

      <div className="max-w-7xl mx-auto">


        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mb-10">

          <p className="text-sm text-gray-500 mb-2">
            Secure Checkout
          </p>

          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your information to place your order.
          </p>

        </div>


        {/* ======================================
            MAIN GRID
        ====================================== */}

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >


          {/* ====================================
              LEFT
          ==================================== */}

          <div className="lg:col-span-2 space-y-8">


            {/* ==================================
                CUSTOMER INFORMATION
            ================================== */}

            <div className="bg-white border border-gray-200 rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-6">
                Customer Information
              </h2>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                {/* NAME */}

                <div className="md:col-span-2">

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                  />

                </div>


                {/* PHONE */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="03XXXXXXXXX"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                  />

                </div>

              </div>

            </div>


            {/* ==================================
                SHIPPING ADDRESS
            ================================== */}

            <div className="bg-white border border-gray-200 rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-6">
                Shipping Address
              </h2>


              <div className="space-y-5">


                {/* ADDRESS */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="House / Street / Area"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:border-black"
                  />

                </div>


                {/* CITY / PROVINCE */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="Sialkot"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                    />

                  </div>


                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province
                    </label>

                    <input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      required
                      placeholder="Punjab"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                    />

                  </div>

                </div>


                {/* POSTAL CODE */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    placeholder="51310"
                    className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                  />

                </div>

              </div>

            </div>


            {/* ==================================
                PAYMENT METHOD
            ================================== */}

            <div className="bg-white border border-gray-200 rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-6">
                Payment Method
              </h2>


              <label className="flex items-center gap-4 border border-black rounded-xl p-5 cursor-pointer bg-gray-50">

                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() =>
                    setPaymentMethod("COD")
                  }
                  className="w-5 h-5"
                />


                <div className="flex-1">

                  <p className="font-semibold">
                    Cash on Delivery
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Pay when your order is delivered.
                  </p>

                </div>


                <span className="text-sm font-medium">
                  COD
                </span>

              </label>

            </div>


            {/* ==================================
                ERROR
            ================================== */}

            {orderError && (

              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">

                {orderError}

              </div>

            )}

          </div>


          {/* ====================================
              RIGHT - ORDER SUMMARY
          ==================================== */}

          <div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-28">

              <h2 className="text-xl font-bold mb-6">
                Your Order
              </h2>


              {/* =================================
                  CART ITEMS
              ================================= */}

              <div className="space-y-5 max-h-[500px] overflow-y-auto pr-1">

                {items.map((item) => {

                  const product = item.product;

                  if (!product) {
                    return null;
                  }


                  const price =
                    Number(product.discountPrice) ||
                    Number(product.price) ||
                    0;


                  const itemTotal =
                    price * item.quantity;


                  // Find selected variant
                  const variant =
                    product.variants?.find(
                      (variant) =>
                        variant._id === item.variantId
                    );


                  return (

                    <div
                      key={item._id}
                      className="flex gap-4"
                    >


                      {/* IMAGE */}

                      <div className="relative flex-shrink-0">

                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        />


                        {/* QUANTITY BADGE */}

                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">

                          {item.quantity}

                        </span>

                      </div>


                      {/* DETAILS */}

                      <div className="flex-1 min-w-0">

                        <h3 className="font-semibold text-sm truncate">
                          {product.title}
                        </h3>


                        <p className="text-xs text-gray-500 mt-1">
                          SKU:{" "}
                          {variant?.sku || product.sku}
                        </p>


                        {variant && (

                          <div className="text-xs text-gray-500 mt-1">

                            {variant.size && (
                              <span>
                                Size: {variant.size}
                              </span>
                            )}

                            {variant.color && (
                              <span className="ml-3">
                                Color: {variant.color}
                              </span>
                            )}

                          </div>

                        )}


                        <p className="text-sm font-semibold mt-2">
                          Rs. {itemTotal.toLocaleString()}
                        </p>

                      </div>

                    </div>

                  );

                })}

              </div>


              <hr className="my-6" />


              {/* =================================
                  SUMMARY
              ================================= */}

              <div className="space-y-4">


                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Items
                  </span>

                  <span>
                    {totalItems}
                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span>
                    Rs. {subtotal.toLocaleString()}
                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="text-green-600 font-medium">
                    Free
                  </span>

                </div>

              </div>


              <hr className="my-6" />


              {/* TOTAL */}

              <div className="flex justify-between text-xl font-bold">

                <span>
                  Total
                </span>

                <span>
                  Rs. {total.toLocaleString()}
                </span>

              </div>


              {/* =================================
                  PLACE ORDER
              ================================= */}

              <button
                type="submit"
               disabled={placingOrder}
              className="flex justify-center w-full mt-6 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
               {placingOrder
               ? "PLACING ORDER..."
               : "PLACE ORDER"
            }
            </button>


              {/* BACK TO CART */}

              <Link
                to="/cart"
                className="block text-center mt-4 text-sm text-gray-500 hover:text-black"
              >
                ← Return to Cart
              </Link>

            </div>

          </div>

        </form>

      </div>

    </section>

  );
}

export default Order;