import { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";
import axios from "axios";
import { Link } from "react-router-dom";

const ToursList = ({ tourTypeId }) => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [typeName, setTypeName] = useState(""); // State to hold the tour type name

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/tour/getTourType/${tourTypeId}`,
        );

        if (data.tours && data.tours.length > 0) {
          setTypeName(data.tours[0].tourType.typeName); // Set the tour type name
          setTours(data.tours);
        } else {
          setTypeName(""); // Reset tour type name if no tours are found
          setTours([]);
        }
      } catch (err) {
        setError(err.message);
        setTours([]); // Clear tours on error
        setTypeName(""); // Reset tour type name on error
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
      {isLoading && <div>Đang tải...</div>}

      {!isLoading && tours.length === 0 && (
        <div className="mt-2">Không có tour nào thuộc loại tour này.</div>
      )}

      {!isLoading && tours.length > 0 && (
        <>
          <h3 className="my-4 font-semibold">
            Danh sách tour thuộc loại tour: {typeName}
          </h3>
          <ul className="space-y-4">
            {tours.map((tour) => (
              <li
                key={tour._id}
                className="overflow-hidden rounded-md bg-white px-6 py-4 shadow"
              >
                <div className="font-medium text-indigo-600">
                  <Link
                    to={`/tour-detail/${tour._id}`}
                    className="text-blue-800 hover:underline"
                  >
                    {tour.nameTour}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ToursList;
