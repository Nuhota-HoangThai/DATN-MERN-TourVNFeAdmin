import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

import ToursList from "../../TourType/ToursList/ToursList";
import { Link, useNavigate } from "react-router-dom";

function TourTypesList() {
  const [tourTypes, setTourTypes] = useState([]);
  const [selectedTourTypeId, setSelectedTourTypeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa loại tour này?")) {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/tourType/deleteType/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Xóa thất bại!");

        fetchTourTypes();
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateTourType/${id}`); // Corrected usage
  };

  if (isLoading) {
    return <div className="mt-5 text-center">Đang tải trang...</div>;
  }

  if (error) {
    return <div className="mt-5 text-center text-red-500">Lỗi: {error}</div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-5">
      <h2 className="my-3 text-center text-2xl  font-bold">Loại Tour</h2>
      <Link to={"/addTourType"} className="flex justify-center no-underline">
        <div className="my-3 flex w-48 items-center justify-center rounded-lg bg-blue-950 py-2 text-white">
          <p className="pl-2">Thêm loại tour</p>
        </div>
      </Link>
      {tourTypes.length > 0 ? (
        <div>
          <table className="  min-w-full overflow-hidden rounded-md  shadow">
            <thead className=" bg-blue-950 font-bold text-white ">
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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs uppercase tracking-wider"
                >
                  Cập nhật
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs uppercase tracking-wider"
                >
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200 bg-white">
              {tourTypes.map((tourType) => (
                <tr
                  key={tourType._id}
                  className="cursor-pointer hover:bg-gray-50 "
                >
                  <td
                    onClick={() => selectTourType(tourType._id)}
                    className="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900"
                  >
                    {tourType.typeName}
                  </td>
                  <td
                    className="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "200px",
                    }}
                  >
                    {tourType.description}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-sm font-medium ">
                    <button
                      onClick={() => handleUpdate(tourType._id)}
                      className=""
                    >
                      Cập nhật
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleDelete(tourType._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedTourTypeId && <ToursList tourTypeId={selectedTourTypeId} />}
        </div>
      ) : (
        <p className="mt-5 text-center">Không có loại tour nào!!!</p>
      )}
    </div>
  );
}

export default TourTypesList;
