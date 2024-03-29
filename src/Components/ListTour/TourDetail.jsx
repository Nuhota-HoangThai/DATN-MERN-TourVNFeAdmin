import { useState, useEffect } from "react";
import axios from "axios"; // Đảm bảo bạn đã cài đặt axios
import { BASE_URL } from "../../utils/config";
import { useParams } from "react-router-dom";

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
    return <div>Không phải tour bạn chọn</div>;
  }

  return (
    <div>
      <h1>
        Loại tour: {tour.tourType.typeName || "Không thuộc loại tour nào"}
      </h1>
      <h1 className="">
        Danh mục tour:
        {tour.tourDirectory.directoryName || "Không thuộc danh mục nào"}
      </h1>
      <h1 className="">
        Khuyến mãi:
        {tour.promotion?.namePromotion || "Không có khuyến mãi"}
      </h1>
      <h1>Tour: {tour.nameTour}</h1>
      <h1>Khu vực: {tour.regions}</h1>
      <h1>
        {" "}
        Giá:
        {tour.price !== tour.originalPrice ? (
          <span>
            {tour.price?.toLocaleString()} <br />
            <span className="text-gray-500 line-through">
              {tour.originalPrice?.toLocaleString()}
            </span>
          </span>
        ) : (
          tour.price?.toLocaleString()
        )}
      </h1>
      <h1>{tour.priceForChildren}</h1>
      <h1>{tour.priceForYoungChildren}</h1>
      <h1>{tour.priceForInfants}</h1>
      <h1>{tour.maxParticipants}</h1>
      <h1>{tour.startDate}</h1>
      <h1>{tour.endDate}</h1>
      <h1>{tour.startingGate}</h1>
      <h1>{tour.convergeTime}</h1>
      <h1>{tour.additionalFees}</h1>
      <h1>{tour.description}</h1>
    </div>
  );
};

export default TourDetail;
