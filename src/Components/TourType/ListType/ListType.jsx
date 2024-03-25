import { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

import ToursList from "../../TourType/ToursList/ToursList";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import axios from "axios";

function TourTypesList() {
  const { token } = useSelector((state) => state.user.currentUser);

  const [tourTypes, setTourTypes] = useState([]);
  const [selectedTourTypeId, setSelectedTourTypeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTourTypes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/tourType/getAllTourType`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

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
        await axios.delete(`${BASE_URL}/tourType/deleteType/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

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
    <div className="max-h-[600px] w-full p-4">
      <div className="flex justify-between">
        <h2 className="my-2 text-center text-2xl  font-bold">Loại Tour</h2>
        <Link to={"/addTourType"} className=" no-underline">
          <div className="mb-2 flex w-48 items-center justify-center rounded-lg bg-blue-950 py-2 text-white">
            <p className="pl-2">Thêm loại tour</p>
          </div>
        </Link>
      </div>
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
                  className="px-6 py-3 text-center text-xs uppercase tracking-wider"
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
                      maxWidth: "700px",
                    }}
                  >
                    <div
                      className="h-auto p-4"
                      dangerouslySetInnerHTML={{ __html: tourType.description }}
                    ></div>
                  </td>
                  <td className="py-3 text-center text-sm font-medium ">
                    <button
                      onClick={() => handleUpdate(tourType._id)}
                      className=""
                    >
                      Sửa
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
