import { useEffect, useState } from "react";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus
} from "../Services/orderService";


function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const [filteredOrders, setFilteredOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [updating, setUpdating] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState("");

  const [filterStatus, setFilterStatus] = useState("");


  // ==========================================
  // GET ALL ORDERS
  // ==========================================

  const fetchOrders = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getAllOrders();

      console.log("ALL ORDERS:", data);

      const orderData = data.orders || [];

      setOrders(orderData);

      setFilteredOrders(orderData);

    } catch (error) {

      console.error("GET ORDERS ERROR:", error);

      setError(
        error?.response?.data?.message ||
        "Failed to load orders"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD ORDERS
  // ==========================================

  useEffect(() => {

    fetchOrders();

  }, []);


  // ==========================================
  // SEARCH ORDERS
  // Customer Name + Order ID
  // ==========================================

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearchTerm(value);

    const search = value.trim().toLowerCase();

    if (!search) {

      setFilteredOrders(orders);

      return;

    }

    const filteredOrders = orders.filter((order) => {

      const customerName =
        order.customer?.name?.toLowerCase() || "";

      const orderId =
        order._id?.toLowerCase() || "";

      return (
        customerName.includes(search) ||
        orderId.includes(search)
      );

    });

    setFilteredOrders(filteredOrders);

  };


  // ==========================================
  // SORT ORDERS
  // ==========================================

  const handleSort = (e) => {

    const sort = e.target.value;

    setSortBy(sort);

    const sortedOrders = [...filteredOrders];


    if (sort === "customer-asc") {

      sortedOrders.sort((a, b) =>
        (a.customer?.name || "").localeCompare(
          b.customer?.name || ""
        )
      );

    }


    if (sort === "customer-desc") {

      sortedOrders.sort((a, b) =>
        (b.customer?.name || "").localeCompare(
          a.customer?.name || ""
        )
      );

    }


    if (sort === "id-asc") {

      sortedOrders.sort((a, b) =>
        a._id.localeCompare(b._id)
      );

    }


    if (sort === "id-desc") {

      sortedOrders.sort((a, b) =>
        b._id.localeCompare(a._id)
      );

    }


    setFilteredOrders(sortedOrders);

  };


  // ==========================================
  // FILTER ORDERS
  // ==========================================

  const handleFilter = (e) => {

    const status = e.target.value;

    setFilterStatus(status);

    if (!status) {

      setFilteredOrders(orders);

      return;

    }

    const filteredOrders = orders.filter(
      (order) => order.orderStatus === status
    );

    setFilteredOrders(filteredOrders);

  };


  // ==========================================
  // GET SINGLE ORDER
  // ==========================================

  const handleViewOrder = async (orderId) => {

    try {

      const data = await getOrderById(orderId);

      console.log("ORDER DETAILS:", data);

      setSelectedOrder(data.order);

    } catch (error) {

      console.error("GET ORDER ERROR:", error);

      alert(
        error?.response?.data?.message ||
        "Failed to load order"
      );

    }

  };


  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const handleOrderStatus = async (
    orderId,
    status
  ) => {

    try {

      setUpdating(true);

      const data = await updateOrderStatus(
        orderId,
        status
      );

      console.log("UPDATED ORDER:", data);


      // Update list

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? data.order
            : order
        )
      );


      // Update filtered list

      setFilteredOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? data.order
            : order
        )
      );


      // Update selected order

      if (
        selectedOrder &&
        selectedOrder._id === orderId
      ) {

        setSelectedOrder(data.order);

      }

    } catch (error) {

      console.error(
        "UPDATE ORDER STATUS ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
        "Failed to update order status"
      );

    } finally {

      setUpdating(false);

    }

  };


  // ==========================================
  // UPDATE PAYMENT STATUS
  // ==========================================

  const handlePaymentStatus = async (
    orderId,
    status
  ) => {

    try {

      setUpdating(true);

      const data = await updatePaymentStatus(
        orderId,
        status
      );

      console.log(
        "UPDATED PAYMENT:",
        data
      );


      // Update list

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? data.order
            : order
        )
      );


      // Update filtered list

      setFilteredOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? data.order
            : order
        )
      );


      // Update selected order

      if (
        selectedOrder &&
        selectedOrder._id === orderId
      ) {

        setSelectedOrder(data.order);

      }

    } catch (error) {

      console.error(
        "UPDATE PAYMENT ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
        "Failed to update payment status"
      );

    } finally {

      setUpdating(false);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="p-8">

        <p className="text-gray-500">
          Loading orders...
        </p>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="p-8">

        <div className="bg-red-50 text-red-600 p-4 rounded-lg">

          {error}

        </div>

      </div>

    );

  }


  return (

    <div className="p-6">


      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex justify-between items-center mt-24 mb-6">

        <div>

          <h1 className="text-2xl font-bold">
            Orders
          </h1>

          <p className="text-gray-500 mt-1">
            Manage customer orders
          </p>

        </div>


        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Refresh
        </button>

      </div>


      {/* ======================================
          SEARCH / SORT / FILTER
      ====================================== */}

      <div className="flex flex-wrap items-center gap-3 mb-6">


        {/* SEARCH */}

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search customer or order ID..."
          className="px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-black"
        />


        {/* SORT */}

        <select
          value={sortBy}
          onChange={handleSort}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white outline-none"
        >

          <option value="">
            Sort
          </option>

          <option value="customer-asc">
            Customer A-Z
          </option>

          <option value="customer-desc">
            Customer Z-A
          </option>

          <option value="id-asc">
            Order ID A-Z
          </option>

          <option value="id-desc">
            Order ID Z-A
          </option>

        </select>


        {/* FILTER */}

        <select
          value={filterStatus}
          onChange={handleFilter}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white outline-none"
        >

          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Confirmed">
            Confirmed
          </option>

          <option value="Processing">
            Processing
          </option>

          <option value="Shipped">
            Shipped
          </option>

          <option value="Delivered">
            Delivered
          </option>

          <option value="Cancelled">
            Cancelled
          </option>

        </select>

      </div>


      {/* ======================================
          ORDERS TABLE
      ====================================== */}

      <div className="bg-white rounded-xl border overflow-x-auto">

        {filteredOrders.length === 0 ? (

          <div className="p-8 text-center">

            <p className="text-gray-500">
              No orders found.
            </p>

          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-50 border-b">

              <tr>

                <th className="text-left px-5 py-4">
                  Order
                </th>

                <th className="text-left px-5 py-4">
                  Customer
                </th>

                <th className="text-left px-5 py-4">
                  Total
                </th>

                <th className="text-left px-5 py-4">
                  Payment
                </th>

                <th className="text-left px-5 py-4">
                  Order Status
                </th>

                <th className="text-left px-5 py-4">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredOrders.map((order) => (

                <tr
                  key={order._id}
                  className="border-b last:border-b-0"
                >


                  {/* ORDER */}

                  <td className="px-5 py-4">

                    <p className="font-medium">
                      #{order._id.slice(-6)}
                    </p>

                    <p className="text-xs text-gray-500">

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}

                    </p>

                  </td>


                  {/* CUSTOMER */}

                  <td className="px-5 py-4">

                    <p className="font-medium">
                      {order.customer?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.customer?.email}
                    </p>

                  </td>


                  {/* TOTAL */}

                  <td className="px-5 py-4">

                    Rs.{" "}

                    {Number(
                      order.total || 0
                    ).toLocaleString()}

                  </td>


                  {/* PAYMENT */}

                  <td className="px-5 py-4">

                    <select
                      value={
                        order.paymentStatus
                      }
                      disabled={updating}
                      onChange={(e) =>
                        handlePaymentStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-3 py-2 text-sm"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Paid">
                        Paid
                      </option>

                    </select>

                  </td>


                  {/* ORDER STATUS */}

                  <td className="px-5 py-4">

                    <select
                      value={
                        order.orderStatus
                      }
                      disabled={updating}
                      onChange={(e) =>
                        handleOrderStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-3 py-2 text-sm"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </td>


                  {/* VIEW */}

                  <td className="px-5 py-4">

                    <button
                      onClick={() =>
                        handleViewOrder(
                          order._id
                        )
                      }
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>


      {/* ======================================
          ORDER DETAILS
      ====================================== */}

      {selectedOrder && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

         <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">

          <div className="flex justify-between mb-6">

            <h2 className="text-xl font-bold">
              Order Details
            </h2>

            <button
              onClick={() =>
                setSelectedOrder(null)
              }
              className="text-gray-500"
            >
              Close
            </button>

          </div>


          {/* CUSTOMER */}

          <div className="mb-6">

            <h3 className="font-semibold mb-2">
              Customer
            </h3>

            <p>
              {selectedOrder.customer?.name}
            </p>

            <p className="text-gray-500">
              {selectedOrder.customer?.email}
            </p>

            <p className="text-gray-500">
              {selectedOrder.customer?.phone}
            </p>

          </div>


          {/* ADDRESS */}

          <div className="mb-6">

            <h3 className="font-semibold mb-2">
              Shipping Address
            </h3>

            <p>
              {selectedOrder.shippingAddress?.address}
            </p>

            <p>
              {selectedOrder.shippingAddress?.city},{" "}
              {selectedOrder.shippingAddress?.province}
            </p>

            <p>
              {selectedOrder.shippingAddress?.postalCode}
            </p>

          </div>


          {/* ITEMS */}

          <div className="mb-6">

            <h3 className="font-semibold mb-3">
              Items
            </h3>

            <div className="space-y-3">

              {selectedOrder.items?.map(
                (item, index) => (

                  <div
                    key={item._id || index}
                    className="flex justify-between border-b pb-3"
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

                    </div>

                    <p className="font-medium">

                      Rs.{" "}

                      {Number(
                        item.total || 0
                      ).toLocaleString()}

                    </p>

                  </div>

                )
              )}

            </div>

          </div>


          {/* TOTAL */}

          <div className="border-t pt-5">

            <div className="flex justify-between">

              <span>
                Subtotal
              </span>

              <span>

                Rs.{" "}

                {Number(
                  selectedOrder.subtotal || 0
                ).toLocaleString()}

              </span>

            </div>


            <div className="flex justify-between mt-2">

              <span>
                Shipping
              </span>

              <span>

                Rs.{" "}

                {Number(
                  selectedOrder.shipping || 0
                ).toLocaleString()}

              </span>

            </div>


            {/* STATUS */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-6">


              {/* ORDER STATUS */}

              <div className="border rounded-lg p-4">

                <p className="text-sm text-gray-500">
                  Order Status
                </p>

                <p className="font-semibold mt-1">
                  {selectedOrder.orderStatus}
                </p>

              </div>


              {/* PAYMENT STATUS */}

              <div className="border rounded-lg p-4">

                <p className="text-sm text-gray-500">
                  Payment Status
                </p>

                <p className="font-semibold mt-1">
                  {selectedOrder.paymentStatus}
                </p>

              </div>

            </div>


            <div className="flex justify-between mt-4 text-xl font-bold">

              <span>
                Total
              </span>

              <span>

                Rs.{" "}

                {Number(
                  selectedOrder.total || 0
                ).toLocaleString()}

              </span>

            </div>


          </div>

        </div>
      </div>

      )}

    </div>

  );

}

export default AdminOrders;