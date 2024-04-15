import { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

import ToursList from "../../TourType/ToursList/ToursList";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import axios from "axios";

import { CgAddR } from "react-icons/cg";
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";

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
        <Link to={"/addTourType"} className="no-underline">
          <CgAddR color="red" size={"30px"} />
        </Link>
        <h2 className="font-bold">Loại tour</h2>
        {/* phân trang */}
        <div className="flex items-center justify-end">
          {Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`mx-1 h-6 w-6 rounded bg-blue-500 text-white ${pageInfo.currentPage === pageNum ? "bg-blue-700" : ""}`}
              >
                {pageNum}
              </button>
            ),
          )}
        </div>
      </div>
      <div>
        {tourTypes.length > 0 ? (
          <div className="">
            <table className="w-full text-left text-sm">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="w-8 px-6 py-3 text-xs  uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-6 py-3 text-xs  uppercase tracking-wider">
                    Tên Loại Tour
                  </th>
                  <th className="px-6 py-3 text-xs  uppercase tracking-wider">
                    Mô tả
                  </th>
                  <th className="px-6 py-3 text-center text-xs  uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200  bg-white">
                {tourTypes.map((tourType, index) => (
                  <tr key={tourType._id} className=" hover:bg-gray-50">
                    <td className=" w-8 border-b px-6 py-4 text-center">
                      {index + 1 + (pageInfo.currentPage - 1) * 5}
                      {/* Hiển thị Số Thứ Tự dựa trên chỉ số và trang hiện tại */}
                    </td>
                    <td
                      className="whitespace-nowrap border-b px-6 py-4 text-sm font-medium text-gray-900"
                      onClick={() => selectTourType(tourType._id)}
                    >
                      {tourType.typeName}
                    </td>
                    <td
                      className="border-b px-6 py-4 text-sm font-medium text-gray-900"
                      style={{ maxWidth: "700px" }}
                    >
                      <div
                        className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                        dangerouslySetInnerHTML={{
                          __html: tourType.description,
                        }}
                      ></div>
                    </td>
                    <td className="border-b py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleUpdate(tourType._id)}
                          className="border p-1 font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          <FaPenToSquare size={"25px"} />
                        </button>

                        <button
                          onClick={() => handleDelete(tourType._id)}
                          className="border p-1 font-medium text-red-600 hover:text-red-800"
                        >
                          <FaTrashCan size={"25px"} />
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
          </div>
        ) : (
          <p className="mt-5 text-center text-gray-500">
            Không có loại tour nào.
          </p>
        )}
      </div>
    </div>
  );
}

export default TourTypesList;
