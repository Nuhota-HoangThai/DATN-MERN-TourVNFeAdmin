import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

const ToursList = ({ tourTypeId }) => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${BASE_URL}/tour/getTourType/${tourTypeId}`
        );
        if (!response.ok) throw new Error("Failed to fetch tours");

        const data = await response.json();
        setTours(data.tours);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (tourTypeId) {
      fetchTours();
    }
  }, [tourTypeId]);

  return (
    <div className="tours-list">
      <h3 className="text-xl font-semibold my-4">Danh sách Tour</h3>
      {isLoading && <div>Đang tải...</div>}
      {error && <div className="text-red-500">Lỗi: {error}</div>}
      {!isLoading && !error && tours.length === 0 && (
        <div>Không tìm thấy tour nào.</div>
      )}
      {!isLoading && !error && (
        <ul className="space-y-4">
          {tours.map((tour) => (
            <li
              key={tour._id}
              className="bg-white shadow overflow-hidden rounded-md px-6 py-4"
            >
              <div className="font-medium text-indigo-600">{tour.nameTour}</div>
              <div className="text-sm text-gray-500">{tour.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToursList;
