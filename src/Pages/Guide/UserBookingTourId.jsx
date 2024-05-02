import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

function UserBookingTourId() {
  const { token } = useSelector((state) => state.user.currentUser);
  const { tourId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/booking/bookings/by-tour/${tourId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings: " + err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [tourId, token]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800">
        Mã tour: {tourId}
      </h2>
      {bookings.length > 0 ? (
        <table className="mt-6 min-w-full table-auto overflow-hidden rounded-lg bg-white shadow-md">
          <thead className="bg-gray-200 text-center text-gray-700">
            <tr>
              <th className="border-b-2 border-gray-200 px-4 py-3">
                Khách hàng
              </th>
              <th className="border-b-2 border-gray-200 px-4 py-3">Email</th>
              <th className="border-b-2 border-gray-200 px-4 py-3">
                Số điện thoại
              </th>
              <th className="border-b-2 border-gray-200 px-4 py-3">Ngày đặt</th>
              <th className="border-b-2 border-gray-200 px-4 py-3">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="text-center text-gray-700">
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border-b border-gray-200 px-4 py-3">
                  {booking.user.name}
                </td>
                <td className="border-b border-gray-200 px-4 py-3">
                  {booking.user.email}
                </td>
                <td className="border-b border-gray-200 px-4 py-3">
                  {booking.user.phone}
                </td>
                <td className="border-b border-gray-200 px-4 py-3">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>
                <td className="border-b border-gray-200 px-4 py-3">
                  {" "}
                  <Link
                    to={`/booking-detail/${booking._id}`}
                    className="w-20 rounded bg-green-500 px-1 py-2 font-bold text-white hover:bg-green-700"
                  >
                    Chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="py-8 text-center text-xl text-gray-500">
          Tour chưa có khách đặt
        </div>
      )}
    </div>
  );
}

export default UserBookingTourId;
