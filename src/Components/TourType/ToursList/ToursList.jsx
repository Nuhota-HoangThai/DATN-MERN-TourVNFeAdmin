import { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";
import { useSelector } from "react-redux";
import axios from "axios";

const ToursList = ({ tourTypeId }) => {
  //const { token } = useSelector((state) => state.user.currentUser);

  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/tour/getTourType/${tourTypeId}`,
          {
            // headers: {
            //   Authorization: "Bearer " + token,
            // },
          },
        );

        setTours(data.tours);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (tourTypeId) {
      fetchTours();
    }
  }, [tourTypeId]);

  return (
    <div className="tours-list">
      <h3 className="my-4 text-xl font-semibold">Danh sách Tour</h3>
      {isLoading && <div>Đang tải...</div>}
      {/* {error && <div className="text-red-500">Lỗi: {error}</div>} */}
      {!isLoading && !error && tours.length === 0 && (
        <div>Không tìm thấy tour nào.</div>
      )}
      {!isLoading && !error && (
        <ul className="space-y-4">
          {tours.map((tour) => (
            <li
              key={tour._id}
              className="overflow-hidden rounded-md bg-white px-6 py-4 shadow"
            >
              <div className="font-medium text-indigo-600">{tour.nameTour}</div>
              {/* <div className="text-sm text-gray-500">{tour.description}</div> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToursList;
