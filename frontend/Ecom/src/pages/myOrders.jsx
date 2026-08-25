import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../Services/orderService";

function MyOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyOrders = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getMyOrders();

      console.log("MY ORDERS:", data);

      setOrders(data.orders || []);

    } catch (error) {

      console.error("GET MY ORDERS ERROR:", error);

      setError(
        error?.response?.data?.message ||
        "Failed to load your orders"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);


  // ==============================
  // LOADING
  // ==============================

  if (loading) {

    return (
      <section className="min-h-screen pt-32 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-500">
            Loading your orders...
          </p>

        </div>

      </section>
    );
  }


  // ==============================
  // ERROR
  // ==============================

  if (error) {

    return (
      <section className="min-h-screen pt-32 px-6">

        <div className="max-w-6xl mx-auto">

          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-5">
            {error}
          </div>

        </div>

      </section>
    );
  }


  // ==============================
  // EMPTY
  // ==============================

  if (orders.length === 0) {

    return (
      <section className="min-h-screen pt-32 px-6 pb-20">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            Order Completion Successfull
          </h1>

          <div className="border border-gray-200 rounded-2xl p-12 text-center">

            <div className="text-5xl mb-5">
              📦
            </div>

            <h2 className="text-2xl font-bold mb-3">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mb-6">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg"
            >
              Start Shopping
            </Link>

          </div>

        </div>

      </section>
    );
  }


  // ==============================
  // ORDERS
  // ==============================

  return (

    <section className="min-h-screen pt-32 px-6 pb-20 bg-gray-50">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              My Orders
            </h1>

            <p className="text-gray-500 mt-2">
              Track your orders and their current status.
            </p>

          </div>

          <button
            onClick={fetchMyOrders}
            className="px-5 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
          >
            Refresh
          </button>

        </div>


        {/* ORDER LIST */}

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-2xl p-6"
            >

              {/* ORDER HEADER */}

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                <div>

                  <p className="font-bold text-lg">
                    Order #{order._id.slice(-6)}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                </div>


                {/* STATUS */}

                <div className="flex flex-wrap gap-3">

                  <div className="border rounded-lg px-4 py-2">

                    <p className="text-xs text-gray-500">
                      Order Status
                    </p>

                    <p className="font-semibold">
                      {order.orderStatus}
                    </p>

                  </div>


                  <div className="border rounded-lg px-4 py-2">

                    <p className="text-xs text-gray-500">
                      Payment
                    </p>

                    <p className="font-semibold">
                      {order.paymentStatus}
                    </p>

                  </div>

                </div>

              </div>


              {/* ITEMS */}

              <div className="border-t border-gray-200 pt-5">

                <h3 className="font-semibold mb-4">
                  Items
                </h3>

                <div className="space-y-4">

                  {order.items?.map((item, index) => (

                    <div
                      key={item._id || index}
                      className="flex justify-between items-center border-b last:border-b-0 pb-4 last:pb-0"
                    >

                      <div>

                        <p className="font-medium">
                          {item.title}
                        </p>

                        <p className="text-sm text-gray-500">
                          SKU: {item.sku}
                        </p>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        {(item.size || item.color) && (

                          <p className="text-sm text-gray-500">

                            {item.size && `Size: ${item.size}`}

                            {item.size && item.color && " • "}

                            {item.color && `Color: ${item.color}`}

                          </p>

                        )}

                      </div>


                      <div className="text-right">

                        <p className="font-semibold">
                          Rs.{" "}
                          {Number(
                            item.total || 0
                          ).toLocaleString()}
                        </p>

                        <p className="text-sm text-gray-500">
                          Rs.{" "}
                          {Number(
                            item.price || 0
                          ).toLocaleString()}{" "}
                          × {item.quantity}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>


              {/* SHIPPING */}

              <div className="border-t border-gray-200 mt-6 pt-5">

                <h3 className="font-semibold mb-3">
                  Shipping Address
                </h3>

                <p>
                  {order.shippingAddress?.address}
                </p>

                <p className="text-gray-500">
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.province}
                </p>

                <p className="text-gray-500">
                  {order.shippingAddress?.postalCode}
                </p>

              </div>


              {/* TOTAL */}

              <div className="border-t border-gray-200 mt-6 pt-5">

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span>
                    Rs.{" "}
                    {Number(
                      order.subtotal || 0
                    ).toLocaleString()}
                  </span>

                </div>


                <div className="flex justify-between text-sm mb-3">

                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span>
                    Rs.{" "}
                    {Number(
                      order.shipping || 0
                    ).toLocaleString()}
                  </span>

                </div>


                <div className="flex justify-between text-xl font-bold">

                  <span>
                    Total
                  </span>

                  <span>
                    Rs.{" "}
                    {Number(
                      order.total || 0
                    ).toLocaleString()}
                  </span>

                </div>

              </div>


              {/* PAYMENT METHOD */}

              <div className="mt-5 text-sm text-gray-500">

                Payment Method:{" "}
                <span className="font-medium text-black">
                  {order.paymentMethod}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default MyOrders;