import API from './API';
import axios from 'axios';



// GET Admin
export const getDashboard = async () => {
  const token = localStorage.getItem("token");
  const response = await API.get("/admin/dashboard/");
  return response.data;
};
