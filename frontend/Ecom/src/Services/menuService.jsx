import API from '../Services/API';
import axios from 'axios';



// GET all menus
export const getMenu = async () => {
  const response = await API.get("/menu/");
  return response.data;
};

// CREATE a new menu
export const createMenu = async (menuData) => {
  const response = await API.post("/menu/", menuData);
  return response.data;
};

// UPDATE a menu by id
export const updateMenu = async (id, menuData) => {
  const response = await API.put(`/menu/${id}`, menuData);
  return response.data;
};

// DELETE a menu by id
export const deleteMenu = async (id) => {
  const response = await API.delete(`/menu/${id}`);
  return response.data;
};