import API from '../Services/API';
import axios from 'axios';



// GET Introduction
export const getIntroduction = async () => {
  const response = await API.get("/intro/");
  return response.data;
};


// UPDATE a menu by id
export const updateIntroduction = async (introData) => {
  const response = await API.put('/intro/', introData);
  return response.data;
};

