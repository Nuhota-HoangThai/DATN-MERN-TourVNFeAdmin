import axios from "axios";
import { BASE_URL } from "../utils/config";

export const createBlog = async (formData, token) => {
  const response = await axios.post(`${BASE_URL}/blog/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllBlogs = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/blog/getAll?page=${page}&limit=8`,
  );
  return response.data;
};

export const deleteBlog = async (id, token) => {
  const response = await axios.delete(`${BASE_URL}/blog/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
