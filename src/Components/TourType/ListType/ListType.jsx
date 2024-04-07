import { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

import ToursList from "../../TourType/ToursList/ToursList";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import axios from "axios";

function TourTypesList() {
  const { token } = useSelector((state) => state.user.currentUser);

  const [tourTypes, setTourTypes] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [selectedTourTypeId, setSelectedTourTypeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchTourTypes = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/tourType/getAllTourTypeLimit?page=${page}&limit=5`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      setTourTypes(data.tourTypes);
      setPageInfo({
        currentPage: page,
        totalPages: data.totalPages,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTourTypes();
  }, []);

  const handlePageChange = (newPage) => {
    fetchTourTypes(newPage);
  };

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
    <div className="max-h-[600px] w-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="my-2 text-xl font-bold text-gray-800">Loại Tour</h2>
        <Link to={"/addTourType"} className=" mr-5 no-underline">
          <div className="my-2 flex w-48 items-center justify-center rounded-lg bg-gray-200 py-2">
            <p className="pl-2">Thêm loại tour</p>
          </div>
        </Link>
      </div>

      <div>
        {tourTypes.length > 0 ? (
          <div className="">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-200 ">
                <tr>
                  <th className="px-6 py-3 text-xs  uppercase tracking-wider">
                    Tên Loại Tour
                  </th>
                  <th className="px-6 py-3 text-xs  uppercase tracking-wider">
                    Mô tả
                  </th>
                  <th className="px-6 py-3 text-center text-xs  uppercase tracking-wider">
                    Cập nhật
                  </th>
                  <th className="px-6 py-3 text-center text-xs  uppercase tracking-wider">
                    Xóa
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {tourTypes.map((tourType) => (
                  <tr key={tourType._id} className="hover:bg-gray-50">
                    <td
                      className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
                      onClick={() => selectTourType(tourType._id)}
                    >
                      {tourType.typeName}
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium text-gray-900"
                      style={{ maxWidth: "700px" }}
                    >
                      <div
                        className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                        dangerouslySetInnerHTML={{
                          __html: tourType.description,
                        }}
                      ></div>
                    </td>
                    <td className="py-4 text-center">
                      <button
                        onClick={() => handleUpdate(tourType._id)}
                        className="font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        Sửa
                      </button>
                    </td>
                    <td className="py-4 text-center">
                      <button
                        onClick={() => handleDelete(tourType._id)}
                        className="font-medium text-red-600 hover:text-red-800"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedTourTypeId && (
              <ToursList tourTypeId={selectedTourTypeId} />
            )}
          </div>
        ) : (
          <p className="mt-5 text-center text-gray-500">
            Không có loại tour nào.
          </p>
        )}
      </div>
      {/* phân trang */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`mx-1 rounded bg-gray-500 px-4 py-2 text-white ${pageInfo.currentPage === pageNum ? "bg-gray-700" : ""}`}
            >
              {pageNum}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

export default TourTypesList;
