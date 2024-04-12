import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { formatDateVN } from "../../utils/formatDate";

const ReviewDetails = () => {
  const { reviewId } = useParams(); // This hooks into the URL parameter to get the review ID
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token;

  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/review/reviewDetail/${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data);
        setReview(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchReviewDetails();
  }, [reviewId, token]);

  if (isLoading) return <div>đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!review) return <div>Không tìm thấy review</div>;

  return (
    <div className="mx-auto mt-10 max-w-xl rounded border p-5 shadow-lg">
      <h1 className="mb-4 text-xl font-semibold">Chi Tiết Review</h1>
      <h2 className="text-lg font-bold">Tour: {review.tourId.nameTour}</h2>
      <p className="text-md">
        Người đánh giá: {review.userId.name} - {review.userId.email}
      </p>
      <p className="text-md">Nội dung: {review.reviewText}</p>
      <div className="my-4 flex flex-wrap gap-5">
        {/* Hiển thị tất cả hình ảnh */}
        {review.image &&
          review.image.length > 0 &&
          review.image.map((img, imgIndex) => (
            <img
              key={imgIndex}
              src={`${BASE_URL}/${img.replace(/\\/g, "/")}`}
              alt={`review ${imgIndex}`}
              className="h-auto w-48 rounded-md object-cover"
            />
          ))}
        {/* Hiển thị tất cả video */}
        {review.video &&
          review.video.length > 0 &&
          review.video.map((vid, vidIndex) => (
            <video
              key={vidIndex}
              src={`${BASE_URL}/${vid.replace(/\\/g, "/")}`}
              alt={`review ${vidIndex}`}
              className="h-auto w-48 rounded-md"
              controls
              loop
              muted
            />
          ))}
      </div>
      <p className="text-md">Đánh giá: {review.rating}/10 điểm</p>
      <p className="text-md mb-10 ">Ngày: {formatDateVN(review.createdAt)}</p>
      <Link to={"/review"} className="border-2 border-blue-600 px-4 py-1.5">
        Trở lại
      </Link>
    </div>
  );
};

export default ReviewDetails;
