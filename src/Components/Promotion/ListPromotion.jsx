import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

const ListPromotion = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/tourPromotion/getAllPromotion`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );
        setPromotions(response.data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, [token]);

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
    <div className="p-4">
      <div className="mb-4 text-right">
        <Link
          to="/addPromotion"
          className="inline-block rounded bg-blue-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Tạo khuyến mãi mới
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="whitespace-no-wrap w-full">
          <thead>
            <tr className="bg-blue-900 text-left font-bold text-white">
              <th className="px-6 py-3">Tên Khuyến Mãi</th>
              <th className="px-6 py-3">Mô Tả</th>
              <th className="px-6 py-3">Phần Trăm Giảm Giá</th>
              <th className="px-6 py-3">Ngày Bắt Đầu</th>
              <th className="px-6 py-3">Ngày Kết Thúc</th>
              <th className="px-6 py-3">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {promotions.map((promotion) => (
              <tr key={promotion._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{promotion.namePromotion}</td>
                <td className="px-6 py-4">{promotion.descriptionPromotion}</td>
                <td className="px-6 py-4">{promotion.discountPercentage}%</td>
                <td className="px-6 py-4">
                  {new Date(promotion.startDatePromotion).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {new Date(promotion.endDatePromotion).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/editPromotion/${promotion._id}`}
                    className="mr-4 text-blue-600 hover:text-blue-800"
                  >
                    Chỉnh sửa
                  </Link>
                  {/* Thêm nút xóa hoặc các hành động khác tại đây */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListPromotion;
