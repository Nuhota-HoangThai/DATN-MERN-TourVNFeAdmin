import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

import { formatDateVN } from "../../utils/formatDate";
import { CgAddR } from "react-icons/cg";
import { toast } from "react-toastify";

const ListPromotion = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchPromotions = async (page = 1) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/tourPromotion/getAllPromotionLimit?page=${page}&limit=6`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      //console.log(data.updatedPromotions);
      setPromotions(data.updatedPromotions);
      setPageInfo({
        currentPage: page,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, [token]);

  const handlePageChange = (newPage) => {
    fetchPromotions(newPage);
  };

  const remove_promotion = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tourPromotion/deletePromotion/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast("Xóa khuyến mãi thành công.");
      await fetchPromotions();
    } catch (error) {
      console.error("Error removing promotion:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-lg">Đang tải...</div>;
  }

  if (promotions.length === 0) {
    return (
      <div className="text-center text-lg">
        <p>Chưa có khuyến mãi nào được tạo.</p>
        <Link to="/addPromotion" className="text-blue-500 underline">
          Tạo khuyến mãi mới
        </Link>
      </div>
    );
  }

  return (
    <div className="max-h-[600px] w-full">
      <div className="my-1 flex justify-between">
        <h2 className="font-bold">Chương trình khuyến mãi</h2>
        <Link to="/addPromotion">
          <CgAddR color="red" size={"30px"} />
        </Link>
      </div>
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-blue-800 text-xs uppercase text-white">
          <tr>
            <th className="w-8 border border-gray-300 px-6 py-3">Stt</th>
            <th className="border border-gray-300 px-6 py-3">Hình ảnh</th>
            <th className="w-72 border border-gray-300 px-6 py-3">
              Khuyến Mãi
            </th>
            <th className="border border-gray-300 px-6 py-3">Mô Tả</th>
            <th className="border border-gray-300 px-6 py-3">Giảm Giá (%)</th>
            <th className="border border-gray-300 px-6 py-3">Ngày Bắt Đầu</th>
            <th className="border border-gray-300 px-6 py-3">Ngày Kết Thúc</th>
            <th className="border border-gray-300 px-6 py-3 text-center">
              Hành Động
            </th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promotion, index) => (
            <tr key={promotion._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-6 py-4 text-center">
                {index + 1 + (pageInfo.currentPage - 1) * 8}
              </td>
              <td className="border border-gray-300 px-6 py-4">
                {promotion.image ? (
                  <img
                    src={`${BASE_URL}/${promotion.image.replace(/\\/g, "/")}`}
                    alt="promotion"
                    className="h-20 w-28 rounded-md object-cover"
                  />
                ) : (
                  <p className="text-center text-black">Không có hình ảnh</p>
                )}
              </td>
              <td className="border border-gray-300 px-6 py-4 text-black">
                {promotion.namePromotion}
              </td>
              <td className="border border-gray-300 px-6 py-4 text-black">
                {promotion.descriptionPromotion}
              </td>
              <td className="border border-gray-300 px-6 py-4 text-center">
                {promotion.discountPercentage}%
              </td>
              <td className="border border-gray-300 px-6 py-4">
                {formatDateVN(new Date(promotion.startDatePromotion))}
              </td>
              <td className="border border-gray-300 px-6 py-4">
                {formatDateVN(new Date(promotion.endDatePromotion))}
              </td>
              <td className="border border-gray-300 px-3">
                <div className="flex gap-2">
                  <Link
                    to={`/editPromotion/${promotion._id}`}
                    className="w-20 rounded bg-blue-600 px-2 py-1 text-white hover:bg-green-700"
                  >
                    Cập nhật
                  </Link>
                  <button
                    onClick={() => remove_promotion(promotion._id)}
                    className=" rounded bg-red-500 px-2 py-1 text-white hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
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
  );
};

export default ListPromotion;
