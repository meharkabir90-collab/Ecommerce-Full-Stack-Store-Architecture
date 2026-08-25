import API from '../Services/API';
import axios from 'axios';



// GET Introduction
export const getDelivery = async () => {
  const response = await API.get("/delivery/");
  return response.data;
};


// UPDATE a menu by id
export const updateDelivery = async (delData) => {
  const response = await API.put('/delivery/', delData);
  return response.data;
};

