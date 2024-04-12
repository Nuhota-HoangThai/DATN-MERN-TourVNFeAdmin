import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/config";
import { Link } from "react-router-dom";

import { formatDateVN } from "../../utils/formatDate";

function GuideTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token;

  useEffect(() => {
    if (
      currentUser &&
      (currentUser.role === "guide" || currentUser.role === "admin")
    ) {
      fetchTours(currentUser.id);
    }
  }, [currentUser]);

  const fetchTours = (userGuideId) => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/tour/getTourGuide/${userGuideId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data.tours);
        setTours(response.data.tours);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching tours: " + err.message);
        setLoading(false);
      });
  };

  if (
    !currentUser ||
    (currentUser.role !== "guide" && currentUser.role !== "admin")
  ) {
    return <p>Bạn không được phép truy cập trang này.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-6 text-center text-2xl font-bold">
        Danh sách tour của bạn
      </h1>
      {tours.length > 0 ? (
        <table className="min-w-full table-auto leading-normal">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Thời gian
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Tên tour
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Thuộc loại
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Thuộc danh mục
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Chi tiết
              </th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour._id}>
                <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                  {formatDateVN(tour?.startDate)} đến{" "}
                  {formatDateVN(tour?.endDate)}
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                  {tour?.nameTour}
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                  {tour.tourType?.typeName}
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                  {tour.tourDirectory?.directoryName}
                </td>

                <td className="ellipsis border-b px-6 py-4 text-blue-800">
                  <Link
                    to={`/tour-detail-guide/${tour._id}`}
                    className="italic underline"
                  >
                    Chi tiết
                  </Link>
                </td>
                {/* <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                  {tour.promotion?.namePromotion} -{" "}
                  {tour.promotion?.discountPercentage}%
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-700">
          Bạn chưa được phân công tour nào.
        </p>
      )}
    </div>
  );
}

export default GuideTours;
