import API from '../Services/API';
import axios from 'axios';



// GET Introduction
export const getSetting = async () => {
  const response = await API.get("/settings/");
  return response.data;
};


// UPDATE a menu by id
export const updateSetting = async (setData) => {
  const response = await API.put('/settings/', setData);
  return response.data;
};

