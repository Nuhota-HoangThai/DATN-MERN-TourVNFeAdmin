import { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

import ToursList from "../../TourType/ToursList/ToursList";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import axios from "axios";

import { CgAddR } from "react-icons/cg";
import { toast } from "react-toastify";

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
        toast("Xóa loại tour thành công.");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateTourType/${id}`);
  };

  if (isLoading) {
    return <div className="mt-5 text-center">Đang tải trang...</div>;
  }

  if (error) {
    return <div className="mt-5 text-center text-red-500">Lỗi: {error}</div>;
  }

  return (
    <div className="max-h-[600px] w-full overflow-auto">
      <div className="my-1 flex justify-between">
        <h2 className="font-bold">Loại tour</h2>
        <Link to={"/addTourType"} className="no-underline">
          <CgAddR color="red" size={"30px"} />
        </Link>
      </div>
      <div>
        {tourTypes.length > 0 ? (
          <>
            <table className="w-full border-collapse text-sm">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="w-8 border border-gray-300 px-6 py-3 text-center text-xs uppercase tracking-wider">
                    STT
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-center text-xs uppercase tracking-wider">
                    Tên Loại Tour
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-center text-xs uppercase tracking-wider">
                    Mô tả
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-center text-xs uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {tourTypes.map((tourType, index) => (
                  <tr key={tourType._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 text-center">
                      {index + 1 + (pageInfo.currentPage - 1) * 5}
                    </td>
                    <td
                      className="border border-gray-300 px-6 py-4 text-center text-gray-900"
                      onClick={() => selectTourType(tourType._id)}
                    >
                      {tourType.typeName}
                    </td>
                    <td
                      className="border border-gray-300 px-6 py-4 text-center text-gray-900"
                      style={{ maxWidth: "700px" }}
                    >
                      <div
                        className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                        dangerouslySetInnerHTML={{
                          __html: tourType.description,
                        }}
                      ></div>
                    </td>
                    <td className="border border-gray-300 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleUpdate(tourType._id)}
                          className="border border-blue-500 bg-blue-500 px-2 py-1 font-medium text-white hover:bg-blue-700"
                        >
                          Cập nhật
                        </button>

                        <button
                          onClick={() => handleDelete(tourType._id)}
                          className="border border-red-600 bg-red-600 px-2 py-1 font-medium text-white hover:bg-red-800"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedTourTypeId && (
              <ToursList tourTypeId={selectedTourTypeId} />
            )}
          </>
        ) : (
          <p className="mt-5 text-center text-gray-500">
            Không có loại tour nào.
          </p>
        )}
        {/* Phân trang */}
        <div className="my-5 flex items-center justify-center">
          {Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`mx-1 h-6 w-6 rounded text-white ${pageInfo.currentPage === pageNum ? "bg-blue-700" : "bg-blue-500"}`}
              >
                {pageNum}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default TourTypesList;
