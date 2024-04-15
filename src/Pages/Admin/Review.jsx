import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IoEyeSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";

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
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );
        //console.log(response.data);
        setTours(response.data.tours);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  const deleteReview = async (tourId, reviewId) => {
    try {
      // Send a delete request to the server
      const response = await axios.delete(
        `${BASE_URL}/review/deleteReviewAdmin/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Check if the server responded with a successful deletion status
      if (response.status === 200) {
        // Update the local state to remove the deleted review
        setTours((prevTours) =>
          prevTours?.map((tour) => {
            if (tour?._id === tourId) {
              return {
                ...tour,
                reviews: tour.reviews.filter(
                  (review) => review._id !== reviewId,
                ),
              };
            }
            return tour;
          }),
        );
        alert("Review đã được xóa thành công.");
      } else {
        throw new Error(
          `Failed to delete review with status code: ${response.status}`,
        );
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Có lỗi xảy ra khi xóa review: " + error.message);
    }
  };

  if (isLoading) return <div>đang tải...</div>;
  if (error) return <div>lỗi: {error}</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {tours?.map((tour) => (
        <div key={tour?._id} className="border p-4">
          <div>
            <h2 className="text-xl font-semibold">{tour?.nameTour}</h2>
          </div>
          <div>
            <strong className="font-semibold">Đánh giá:</strong>
            <ul className="mt-2 space-y-2">
              {tour?.reviews?.map((review) => (
                <li
                  key={review?._id}
                  className="flex justify-between rounded-md bg-gray-100 p-2"
                >
                  <div>
                    <strong>{review.userId.name}</strong>: {review.reviewText}
                  </div>
                  <div className="ml-4 flex justify-center gap-2">
                    <button
                      className="h-10 rounded border bg-blue-500 p-1  text-white hover:bg-blue-700"
                      onClick={() => navigate(`/review-details/${review._id}`)}
                    >
                      <IoEyeSharp size={"25px"} />
                    </button>
                    <button
                      className="h-10 rounded border bg-red-500 p-1 text-white hover:bg-red-700"
                      onClick={() => deleteReview(tour._id, review._id)}
                    >
                      <FaTrashCan size={"25px"} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToursWithReviews;
