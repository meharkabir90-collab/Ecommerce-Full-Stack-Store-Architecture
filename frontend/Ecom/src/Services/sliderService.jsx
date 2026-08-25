import API from '../Services/API';
import axios from 'axios';


// GET all slider
export const getSlider = async () => {
  const response = await API.get("/slider/");
  return response.data;
};

// CREATE a new slider
export const createSlider = async (sliderData) => {
  const response = await API.post('/slider/', sliderData);
  return response.data;
};

// CREATE a new slider
export const getSliderById = async (sliderData) => {
  const response = await API.get('/slider/${id}', sliderData);
  return response.data;
};

// UPDATE a slider by id
export const updateSlider = async (id, sliderData) => {
  const response = await API.put(`/slider/${id}`, sliderData);
  return response.data;
};

// DELETE a slider by id
export const deleteSlider = async (id) => {
  const response = await API.delete(`/slider/${id}`);
  return response.data;
};