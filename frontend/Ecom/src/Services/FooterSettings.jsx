import API from '../Services/API';
import axios from 'axios';



// GET Footer 
export const getFooter = async () => {
  const response = await API.get("/footer/");
  return response.data;
};


// UPDATE a Footer 
export const updateFooter  = async (footerData) => {
  const response = await API.put('/footer/', footerData);
  return response.data;
};

