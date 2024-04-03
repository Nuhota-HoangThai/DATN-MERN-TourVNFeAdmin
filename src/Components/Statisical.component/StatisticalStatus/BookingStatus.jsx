import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";

import BookingStatusTable from "./BookingStatusTable";
import BookingStatusChart from "../RevenueChart/BookingStatusChart";
import { useSelector } from "react-redux";

const BookingStatus = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [bookingStats, setBookingStats] = useState(null);

  useEffect(() => {
    const fetchBookingStats = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/statistical/booking-stats`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );
        setBookingStats(data.data);
      } catch (error) {
        console.error("Failed to fetch booking statistics:", error);
      }
    };

    fetchBookingStats();
  }, []);

  if (!bookingStats) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className="mx-2 my-8 grid grid-cols-2 rounded bg-white shadow-xl">
      <BookingStatusTable bookingStats={bookingStats} />
      <BookingStatusChart bookingStats={bookingStats} />
    </div>
  );
};

export default BookingStatus;
