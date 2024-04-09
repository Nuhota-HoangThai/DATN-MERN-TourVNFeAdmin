import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/config";
import axios from "axios";

const TourDirectoriesList = ({ tourDirectoryId }) => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourDirectories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/tour/getTourDirectory/${tourDirectoryId}`,
        );
        //console.log(data);
        setTours(data.tours);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourDirectories();
  }, [tourDirectoryId]);

  return (
    <div className="tour-directories-list">
      <h3 className="my-4 text-xl font-semibold">
        Danh sách tour thuộc danh mục {tourDirectoryId}
      </h3>
      {isLoading && <div>Đang tải...</div>}
      {!isLoading && !error && tours?.length === 0 && (
        <div>Không tìm thấy danh mục tour nào.</div>
      )}
      {!isLoading && !error && (
        <ul className="space-y-4">
          {tours?.map((tour) => (
            <li
              key={tour._id}
              className="overflow-hidden rounded-md bg-white px-6 py-4 shadow"
            >
              <div className="font-medium text-indigo-600">{tour.nameTour}</div>
              {/* <div className="text-sm text-gray-500">
                {tour.description}
              </div> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TourDirectoriesList;
