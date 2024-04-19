import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ToursWithReviews = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token;

  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/review/getReviews/haveTourReview`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setTours(response.data.tours);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTours();
  }, [token]);

  const deleteReview = async (tourId, reviewId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/review/deleteReviewAdmin/${reviewId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.status === 200) {
        setTours((prevTours) =>
          prevTours.map((tour) =>
            tour._id === tourId
              ? {
                  ...tour,
                  reviews: tour.reviews.filter(
                    (review) => review._id !== reviewId,
                  ),
                }
              : tour,
          ),
        );
        alert("Review đã được xóa thành công.");
      }
    } catch (error) {
      alert(`Có lỗi xảy ra khi xóa review: ${error.message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
      {tours.map((tour) => (
        <div key={tour._id} className="rounded border p-4 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">{tour.nameTour}</h2>
          <strong className="font-semibold">Đánh giá:</strong>
          <ul className="mt-2 space-y-2">
            {tour.reviews.map((review) => (
              <li
                key={review._id}
                className="flex items-center justify-between rounded-md bg-gray-100 p-2"
              >
                <div>
                  <strong>{review.userId.name}</strong>: {review.reviewText}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="w-20 rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700"
                    onClick={() => navigate(`/review-details/${review._id}`)}
                  >
                    Chi tiết
                  </button>
                  <button
                    className="rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
                    onClick={() => deleteReview(tour._id, review._id)}
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ToursWithReviews;
