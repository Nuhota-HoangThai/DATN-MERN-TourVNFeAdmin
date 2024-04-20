import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/config";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TourDirectoriesList from "./TourDirectoryList";
import axios from "axios";

import { CgAddR } from "react-icons/cg";

function ListTourDirectories() {
  const { token } = useSelector((state) => state.user.currentUser);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [tourDirectories, setTourDirectories] = useState([]);
  const [selectedTourDirectoryId, setSelectedTourDirectoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTourDirectories = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/tourDirectory/getAllTourDirectoriesLimit?page=${page}&limit=5`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      setTourDirectories(data.tourDirectories);
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
    fetchTourDirectories();
  }, []);

  const handlePageChange = (newPage) => {
    fetchTourDirectories(newPage);
  };

  const selectTourDirectory = (id) => {
    setSelectedTourDirectoryId(id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục tour này?")) {
      setIsLoading(true);
      try {
        await axios.delete(`${BASE_URL}/tourDirectory/deleteDirectory/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        fetchTourDirectories();
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateTourDirectory/${id}`);
  };

  if (isLoading) {
    return <div className="mt-5 text-center">Đang tải...</div>;
  }

  if (error) {
    return <div className="mt-5 text-center text-red-500">Lỗi: {error}</div>;
  }

  return (
    <div className="max-h-[600px] w-full">
      <div className="my-1 flex items-center justify-between">
        <h2 className="font-bold">Danh mục tour</h2>
        <Link to={"/addTourDirectory"}>
          <CgAddR color="red" size={"30px"} />
        </Link>
      </div>
      {tourDirectories.length > 0 ? (
        <div>
          <table className="w-full table-auto border-collapse text-sm">
            <thead className="bg-blue-800 text-center text-white">
              <tr>
                <th className="border border-gray-300 px-6 py-3 text-xs uppercase tracking-wider">
                  STT
                </th>
                <th className="border border-gray-300 px-6 py-3 text-xs uppercase tracking-wider">
                  Hình
                </th>
                <th className="border border-gray-300 px-6 py-3 text-xs uppercase tracking-wider">
                  Tên Loại Tour
                </th>
                <th className="border border-gray-300 px-6 py-3 text-xs uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="w-32 border border-gray-300 px-6 py-3 text-xs uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white text-center">
              {tourDirectories.map((tourDirectory, index) => (
                <tr key={tourDirectory._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-6 py-4">
                    {index + 1 + (pageInfo.currentPage - 1) * 5}
                  </td>
                  <td className="border border-gray-300">
                    {tourDirectory.image ? (
                      <img
                        src={`${BASE_URL}/${tourDirectory.image.replace(/\\/g, "/")}`}
                        alt=""
                        className="mx-auto h-20 w-28 rounded-md object-cover"
                      />
                    ) : (
                      <p className="text-gray-500">Không có hình ảnh</p>
                    )}
                  </td>
                  <td className="whitespace-nowrap border border-gray-300 px-6 py-2 text-sm font-medium text-gray-900">
                    {tourDirectory.directoryName}
                  </td>
                  <td className="border border-gray-300 px-6 py-2 text-sm font-medium text-gray-900">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: tourDirectory.directoryDescription,
                      }}
                    ></div>
                  </td>
                  <td className="border border-gray-300 py-2">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleUpdate(tourDirectory._id)}
                        className="border bg-indigo-600 p-1 font-medium text-white hover:bg-indigo-800"
                      >
                        Cập nhật
                      </button>
                      <button
                        onClick={() => handleDelete(tourDirectory._id)}
                        className="border bg-red-600 p-1 font-medium text-white hover:bg-red-800"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedTourDirectoryId && (
            <TourDirectoriesList tourDirectoryId={selectedTourDirectoryId} />
          )}
        </div>
      ) : (
        <p className="mt-5 text-center text-gray-500">
          Không có danh mục tour nào!
        </p>
      )}
      <div className="my-5 flex items-center justify-center">
        {Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`mx-1 h-6 w-6 rounded ${pageInfo.currentPage === pageNum ? "bg-blue-700" : "bg-blue-500"} text-white`}
            >
              {pageNum}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

export default ListTourDirectories;
