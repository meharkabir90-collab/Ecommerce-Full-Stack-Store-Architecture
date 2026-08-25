import API from '../Services/API';
import axios from 'axios';



// GET all menus
export const getProducts = async () => {
  const response = await API.get("/product");
  return response.data;
};

export const getProductById = async (id, productData) => {
  const response = await API.get(`/product/${id}`, productData);
  return response.data;
};

// CREATE a new menu
export const createProduct = async (productData) => {
  const response = await API.post("/product", productData);
  return response.data;
};

// UPDATE a menu by id
export const updateProduct = async (id, productData) => {
  const response = await API.put(`/product/${id}`, productData);
  return response.data;
};

// DELETE a menu by id
export const deleteProduct = async (id) => {
  const response = await API.delete(`/product/${id}`);
  return response.data;
};