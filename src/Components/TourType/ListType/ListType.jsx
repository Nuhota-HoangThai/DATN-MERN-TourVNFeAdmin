import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

import ToursList from "../../TourType/ToursList/ToursList";
import { Link } from "react-router-dom";

import { ImProfile } from "react-icons/im";

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
      <h2 className="text-2xl font-semibold text-center my-3">Loại Tour</h2>
      <Link to={"/addTourType"} className="no-underline flex justify-end">
        <div className="flex items-center justify-center my-3 w-48 py-2 rounded-lg bg-blue-950 text-white">
          <ImProfile />
          <p className="pl-2">Thêm loại tour</p>
        </div>
      </Link>
      {isLoading && (
        <div className="text-center text-lg font-medium my-4">Đang tải...</div>
      )}
      {error && (
        <div className="text-red-500 text-center my-4">Lỗi: {error}</div>
      )}
      {!isLoading && !error && (
        <table className="min-w-full  shadow overflow-hidden rounded-md">
          <thead className="bg-blue-950 text-white font-bold">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs  uppercase tracking-wider"
              >
                Tên Loại Tour
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs  uppercase tracking-wider"
              >
                Mô tả
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tourTypes.map((tourType) => (
              <tr
                key={tourType._id}
                onClick={() => selectTourType(tourType._id)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {tourType.typeName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tourType.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedTourTypeId && <ToursList tourTypeId={selectedTourTypeId} />}
    </div>
  );
}

export default TourTypesList;
