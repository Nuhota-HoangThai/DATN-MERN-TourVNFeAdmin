import axios from "axios";
import { BASE_URL } from "../utils/config";

const addTour = async (formData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/tour/addTour`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding tour", error);
    throw error;
  }
};

export const tourApi = {
  addTour,
};
