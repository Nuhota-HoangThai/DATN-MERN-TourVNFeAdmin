import { tourApi } from "../api/tourApi";

const addTourService = async (formData, token) => {
  return tourApi.addTour(formData, token);
};

export const tourService = {
  addTour: addTourService,
};
