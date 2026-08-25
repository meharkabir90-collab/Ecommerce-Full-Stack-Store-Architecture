import API from '../Services/API';
import axios from 'axios';



// GET Introduction
export const getObjective = async () => {
  const response = await API.get("/objective/");
  return response.data;
};


// UPDATE a menu by id
export const updateObjective = async (objData) => {
  const response = await API.put('/objective/', objData);
  return response.data;
};

