import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

const ListPromotion = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchPromotions();
  }, [token]);

  const remove_promotion = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tourPromotion/deletePromotion/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      await fetchPromotions();
    } catch (error) {
      console.error("Error removing promotion:", error);
    }
  };

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
    <div className="p-6">
      <div className="mb-6 text-right">
        <Link
          to="/addPromotion"
          className="inline-flex items-center justify-center rounded-md bg-gray-200 px-5 py-2.5 text-center text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Tạo khuyến mãi mới
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-blue-500 text-xs uppercase text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tên Khuyến Mãi
              </th>
              <th scope="col" className="px-6 py-3">
                Mô Tả
              </th>
              <th scope="col" className="px-6 py-3">
                Giảm Giá (%)
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày Bắt Đầu
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày Kết Thúc
              </th>
              <th scope="col" className="px-6 py-3">
                Hành Động
              </th>
              <th scope="col" className="px-6 py-3">
                Xóa
              </th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promotion) => (
              <tr
                key={promotion._id}
                className="border-b bg-white hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {promotion.namePromotion}
                </td>
                <td className="px-6 py-4">{promotion.descriptionPromotion}</td>
                <td className="px-6 py-4 text-center">
                  {promotion.discountPercentage}%
                </td>
                <td className="px-6 py-4">
                  {formatDateVN(new Date(promotion.startDatePromotion))}
                </td>
                <td className="px-6 py-4">
                  {formatDateVN(new Date(promotion.endDatePromotion))}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/editPromotion/${promotion._id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Chỉnh sửa
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => remove_promotion(promotion._id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
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
