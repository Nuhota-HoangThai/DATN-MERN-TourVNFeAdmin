import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import { useSelector } from "react-redux";

import { formatRegion } from "../../utils/formatRegion";
import { CgAddR } from "react-icons/cg";

const ListTour = () => {
  const { token } = useSelector((state) => state.user.currentUser);

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

  return (
    <div className="max-h-[600px] w-full">
      <div className="my-1 flex justify-between">
        <Link to={"/addTour"} className="no-underline">
          <CgAddR color="red" size={"30px"} />
        </Link>
        <h2 className="font-bold">Danh sách tour</h2>
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
      <div className="">
        {allTours.length > 0 ? (
          <table className="w-full  table-fixed rounded-2xl text-left text-sm">
            <thead className="bg-blue-800 text-xs uppercase text-white">
              <tr>
                <th scope="col" className="w-8 px-6 py-3">
                  Stt
                </th>
                <th scope="col" className="px-6 py-3">
                  Mã tour
                </th>
                <th scope="col" className=" px-6 py-3">
                  Loại tour
                </th>
                <th scope="col" className=" px-6 py-3">
                  Danh mục
                </th>
                <th scope="col" className=" px-6 py-3">
                  Khuyến mãi
                </th>
                <th scope="col" className=" px-6 py-3">
                  Tên tour
                </th>
                <th scope="col" className=" px-6 py-3">
                  Miền
                </th>
                <th scope="col" className=" px-6 py-3">
                  Xem
                </th>
                <th scope="col" className=" px-6 py-3">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              {allTours.map((tour, index) => (
                <tr key={tour._id} className="bg-white hover:bg-gray-100">
                  <td className=" border-b px-6 py-4 text-center">
                    {index + 1 + (pageInfo.currentPage - 1) * 8}
                    {/* Hiển thị Số Thứ Tự dựa trên chỉ số và trang hiện tại */}
                  </td>
                  <td className="ellipsis border-b px-6 py-4">
                    <Link to={`/tour-detail/${tour._id}`}>{tour._id}</Link>
                  </td>
                  <td className=" ellipsis border-b px-6 py-4">
                    {tour.tourType.typeName || "Không thuộc loại tour nào"}
                  </td>
                  <td className="ellipsis border-b px-6 py-4">
                    {tour.tourDirectory.directoryName ||
                      "Không thuộc danh mục nào"}
                  </td>
                  <td className="ellipsis border-b px-6 py-4">
                    {tour.promotion?.namePromotion || "Không có khuyến mãi"}
                  </td>

                  <td className="ellipsis border-b px-6 py-4">
                    {tour.nameTour}
                  </td>

                  <td className="ellipsis border-b px-6 py-4">
                    {formatRegion(tour.regions)}
                  </td>

                  <td className="ellipsis border-b px-6 py-4 text-blue-800">
                    <Link
                      to={`/tour-detail/${tour._id}`}
                      className="italic underline"
                    >
                      Chi tiết
                    </Link>
                  </td>

                  <td className="border-b px-6 py-4">
                    <button
                      className="text-red-500"
                      onClick={() => remove_tour(tour._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-5 text-center">Không có tour nào!!!</p>
        )}
      </div>{" "}
    </div>
  );
};

export default ListTour;
