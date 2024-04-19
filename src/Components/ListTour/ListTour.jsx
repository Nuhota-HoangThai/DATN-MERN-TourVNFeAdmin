import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import { useSelector } from "react-redux";

import { CgAddR } from "react-icons/cg";

const ListTour = () => {
  const { token } = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const formatPrice = (price) => {
    return `${price?.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const [searchTerm, setSearchTerm] = useState("");

  const [allTours, setAllTours] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchInfo = async (page = 1) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/tour/getAllToursLimit?page=${page}&limit=10`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      setAllTours(data.tours);
      setPageInfo({
        currentPage: page,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handlePageChange = (newPage) => {
    fetchInfo(newPage);
  };

  const navigateToUpdateTour = (id) => {
    navigate(`/update_tour/${id}`);
  };

  const remove_tour = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tour/removeTour/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      await fetchInfo();
    } catch (error) {
      console.error("Error removing tour:", error);
    }
  };

  const filteredTours = allTours.filter((tour) =>
    tour.nameTour.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-h-[600px] w-full">
      <div className="my-1 flex items-center justify-between">
        <input
          type="text"
          placeholder="Tìm kiếm tour..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-full border border-blue-800 p-1.5 px-3"
        />{" "}
        <h2 className="font-bold">Danh sách tour</h2>
        <div className="my-1 flex justify-between">
          <Link to={"/addTour"} className="no-underline">
            <CgAddR color="red" size={"30px"} />
          </Link>
        </div>{" "}
      </div>
      <div className="">
        {filteredTours.length > 0 ? (
          <table className="w-full table-auto border-collapse rounded-2xl text-sm">
            <thead className="bg-blue-800 text-xs uppercase text-white">
              <tr>
                <th
                  scope="col"
                  className="w-8 border border-gray-300 px-6 py-3 text-center"
                >
                  Stt
                </th>
                <th
                  scope="col"
                  className="border border-gray-300 px-6 py-3 text-center"
                >
                  Mã tour
                </th>
                <th
                  scope="col"
                  className="border border-gray-300 px-6 py-3 text-center"
                >
                  Tên tour
                </th>
                <th
                  scope="col"
                  className="border border-gray-300 px-6 py-3 text-center"
                >
                  Giá
                </th>
                <th
                  scope="col"
                  className="border border-gray-300 px-6 py-3 text-center"
                >
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.map((tour, index) => (
                <tr key={tour._id} className="bg-white hover:bg-gray-100">
                  <td className="border border-gray-300 px-6 py-4 text-center">
                    {index + 1 + (pageInfo.currentPage - 1) * 8}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-center">
                    <Link
                      to={`/tour-detail/${tour._id}`}
                      className="text-blue-800 hover:underline"
                    >
                      {tour._id}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-center">
                    {tour.nameTour}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-center">
                    {tour.price !== tour.originalPrice && tour.promotion ? (
                      <>
                        <p className="text-red-600">
                          {formatPrice(tour.price)}
                        </p>
                        <p className="text-gray-500 line-through">
                          {formatPrice(tour.originalPrice)}
                        </p>
                      </>
                    ) : (
                      <span className="text-red-600">
                        {formatPrice(tour.price)}
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-green-700"
                        onClick={() => navigateToUpdateTour(tour._id)}
                      >
                        Cập nhật
                      </button>
                      <button
                        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                        onClick={() => remove_tour(tour._id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-5 text-center">Không có tour nào!!!</p>
        )}
      </div>{" "}
      {/* phân trang */}
      <div className="mt-5 flex items-center justify-center">
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
  );
};

export default ListTour;
