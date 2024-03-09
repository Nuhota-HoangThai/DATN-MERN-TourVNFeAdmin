import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

import ToursList from "../../TourType/ToursList/ToursList";

function TourTypesList() {
  const [tourTypes, setTourTypes] = useState([]);
  const [selectedTourTypeId, setSelectedTourTypeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTourTypes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/tourType/getAllTourType`);
      if (!response.ok) throw new Error("Đã xảy ra lỗi!");

      const data = await response.json();
      setTourTypes(data.tourTypes);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTourTypes();
  }, []);

  const selectTourType = (id) => {
    setSelectedTourTypeId(id);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-semibold text-center my-4">Loại Tour</h2>
      {isLoading && (
        <div className="text-center text-lg font-medium my-4">Đang tải...</div>
      )}
      {error && (
        <div className="text-red-500 text-center my-4">Lỗi: {error}</div>
      )}
      {!isLoading && !error && (
        <ul className="bg-white shadow overflow-hidden rounded-md divide-y divide-gray-200">
          {tourTypes.map((tourType) => (
            <li
              key={tourType._id}
              onClick={() => selectTourType(tourType._id)}
              className="px-6 py-4 hover:bg-gray-50"
            >
              <div className="font-medium text-indigo-600">
                {tourType.typeName}
              </div>
              <div className="text-sm text-gray-500">
                {tourType.description}
              </div>
            </li>
          ))}
          {selectedTourTypeId && <ToursList tourTypeId={selectedTourTypeId} />}
        </ul>
      )}
    </div>
  );
}

export default TourTypesList;
