import { useState, useEffect } from "react";
import axios from "axios"; // Đảm bảo bạn đã cài đặt axios
import { BASE_URL } from "../../utils/config";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const TourDetail = () => {
  // const { token } = useSelector((state) => state.user.currentUser);

  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tour details
  useEffect(() => {
    const fetchTour = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/tour/getTourById/${tourId}`,
          {
            //   headers: {
            //     Authorization: "Bearer " + token,
            //   },
          },
        );
        setTour(response.data.tour);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTour();
  }, [tourId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tour) {
    return (
      <div>Sorry, the tour information is not available at the moment.</div>
    );
  }

  return (
    <div>
      hello
      <h1>{tour.nameTour}</h1>
    </div>
  );
};

export default TourDetail;
