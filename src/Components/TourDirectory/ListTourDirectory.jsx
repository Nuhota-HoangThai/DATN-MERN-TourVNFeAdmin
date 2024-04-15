import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/config";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TourDirectoriesList from "./TourDirectoryList";
import axios from "axios";

import { CgAddR } from "react-icons/cg";
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";

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
        <Link to={"/addTourDirectory"} className="">
          <CgAddR color="red" size={"30px"} />
        </Link>
        <h2 className="font-bold">Danh mục tour</h2>
        <div className=" flex items-center justify-end">
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
      {tourDirectories.length > 0 ? (
        <div>
          <table className="w-full table-auto text-left text-sm">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-6 py-3 text-xs  uppercase tracking-wider">
                  stt
                </th>
                <th className="px-6 py-3 text-xs  uppercase tracking-wider">
                  Hình
                </th>
                <th className="px-6 py-3 text-xs  uppercase tracking-wider">
                  Tên Loại Tour
                </th>
                <th className="px-6 py-3 text-xs  uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="w-32 px-6 py-3 text-xs uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tourDirectories.map((tourDirectory, index) => (
                <tr
                  key={tourDirectory._id}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className=" border-b px-6 py-4 text-center">
                    {index + 1 + (pageInfo.currentPage - 1) * 5}
                    {/* Hiển thị Số Thứ Tự dựa trên chỉ số và trang hiện tại */}
                  </td>
                  <td className="border-b">
                    {tourDirectory.image ? (
                      <img
                        src={`${BASE_URL}/${tourDirectory.image.replace(/\\/g, "/")}`}
                        alt="promotion"
                        className="h-20 w-28 rounded-md object-cover"
                      />
                    ) : (
                      <p className="text-center text-gray-500">
                        Không có hình ảnh
                      </p>
                    )}
                  </td>
                  <td
                    className="whitespace-nowrap border-b px-6 py-2 text-sm font-medium text-gray-900"
                    onClick={() => selectTourDirectory(tourDirectory._id)}
                  >
                    {tourDirectory.directoryName}
                  </td>
                  <td
                    className="border-b px-6 py-2 text-sm font-medium text-gray-900"
                    style={{ maxWidth: "700px" }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: tourDirectory.directoryDescription,
                      }}
                    ></div>
                  </td>
                  <td className="border-b py-2 text-center">
                    <div className="flex justify-center gap-2">
                      {" "}
                      <button
                        onClick={() => handleUpdate(tourDirectory._id)}
                        className="border p-1 font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        <FaPenToSquare size={"25px"} />
                      </button>
                      <button
                        onClick={() => handleDelete(tourDirectory._id)}
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
          {selectedTourDirectoryId && (
            <TourDirectoriesList tourDirectoryId={selectedTourDirectoryId} />
          )}
        </div>
      ) : (
        <p className="mt-5 text-center text-gray-500">
          Không có danh mục tour nào!
        </p>
      )}
    </div>
  );
}

export default ListTourDirectories;
