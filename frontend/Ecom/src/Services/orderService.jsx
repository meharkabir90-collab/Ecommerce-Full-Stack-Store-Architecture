import api from './API'

// ==========================================
// CREATE ORDER
// ==========================================

export const createOrder = async (orderData) => {
  const response = await api.post(
    "/order",
    orderData
  );

  return response.data;
};


// ==========================================
// GET MY ORDERS
// ==========================================

export const getMyOrders = async () => {
  const response = await api.get(
    "/order/my-orders"
  );

  return response.data;
};


// ==========================================
// GET ALL ORDERS - ADMIN
// ==========================================

export const getAllOrders = async () => {
  const response = await api.get(
    "/order/admin/all"
  );

  return response.data;
};


// ==========================================
// GET ORDER BY ID - ADMIN
// ==========================================

export const getOrderById = async (orderId) => {
  const response = await api.get(
    `/order/admin/${orderId}`
  );

  return response.data;
};


// ==========================================
// UPDATE ORDER STATUS - ADMIN
// ==========================================

export const updateOrderStatus = async (
  orderId,
  orderStatus
) => {
  const response = await api.patch(
    `/order/admin/${orderId}/status`,
    {
      orderStatus
    }
  );

  return response.data;
};


// ==========================================
// UPDATE PAYMENT STATUS - ADMIN
// ==========================================

export const updatePaymentStatus = async (
  orderId,
  paymentStatus
) => {
  const response = await api.patch(
    `/order/admin/${orderId}/payment`,
    {
      paymentStatus
    }
  );

  return response.data;
};