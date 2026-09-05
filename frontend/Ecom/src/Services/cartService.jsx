import api from "./API";


// ==========================================
// GET CART
// ==========================================

export const getCart = async () => {
  const response = await api.get("/cart");

  return response.data;
};


// ==========================================
// ADD TO CART
// ==========================================

export const addToCart = async (
  productId,
  variantId,
  quantity = 1
) => {

  const response = await api.post("/cart/add", {
    productId,
    variantId,
    quantity,
  });

  return response.data;
};


// ==========================================
// UPDATE CART ITEM
// ==========================================

export const updateCartItem = async (
  productId,
  variantId,
  quantity
) => {

  const response = await api.put(
    `/cart/item/${productId}/${variantId}`,
    {
      quantity,
    }
  );

  return response.data;
};


// ==========================================
// REMOVE FROM CART
// ==========================================

export const removeFromCart = async (
  productId,
  variantId
) => {

  const response = await api.delete(
    `/cart/item/${productId}/${variantId}`
  );

  return response.data;
};


// ==========================================
// CLEAR CART
// ==========================================

export const clearCart = async () => {

  const response = await api.delete("/cart/clear");

  return response.data;
};