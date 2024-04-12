import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/review/getAllReview`) // Ensure the URL matches your server configuration
      .then((response) => {
        console.log(response.data);
        setReviews(response.data.reviews);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch reviews: " + error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Reviews</h1>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <h2>
                {review.tourId.name} Review by {review.userId.name}
              </h2>
              <p>{review.content}</p>

              {review.image &&
                review.image.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt="Review"
                    style={{ width: "100px", height: "100px" }}
                  />
                ))}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}

export default AllReviews;
