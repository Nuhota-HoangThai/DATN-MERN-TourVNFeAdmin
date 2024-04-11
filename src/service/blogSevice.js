import { createBlog, getAllBlogs, deleteBlog } from "../api/blogApi";

export const addNewBlog = async (formData, token) => {
  try {
    // Gửi formData như JSON
    const response = await createBlog(formData, token);
    return response;
  } catch (error) {
    console.error(
      "Error creating blog:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const fetchAllBlogs = async () => {
  try {
    const response = await getAllBlogs();
    //console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const deleteBlogService = async (id, token) => {
  try {
    const response = await deleteBlog(id, token);

    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};
