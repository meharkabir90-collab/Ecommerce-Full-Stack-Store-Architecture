import API from '../Services/API';
import axios from 'axios';



// GET all posts 
export const getPost = async () => {
  const response = await API.get("/post/");
  return response.data;
};


// UPDATE a post
export const updatePost = async (postData) => {
  const response = await API.put("/post/", postData);
  return response.data;
};

