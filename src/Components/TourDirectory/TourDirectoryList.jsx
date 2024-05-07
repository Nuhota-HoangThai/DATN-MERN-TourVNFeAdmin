import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import { Link } from "react-router-dom";

const TourDirectoriesList = ({ tourDirectoryId }) => {
  const [tours, setTours] = useState([]);
  const [directoryName, setDirectoryName] = useState("");
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
        if (data.tours.length > 0) {
          setDirectoryName(data.tours[0].tourDirectory.directoryName); // Giả sử mỗi tour lưu tên danh mục
          setTours(data.tours);
        } else {
          setDirectoryName("");
          setTours([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (tourDirectoryId) {
      fetchTourDirectories();
    }
  }, [tourDirectoryId]);

  return (
    <div className="tour-directories-list">
      {isLoading && <div>Đang tải...</div>}
      {!isLoading && tours.length === 0 && (
        <div>Không có tour nào thuộc danh mục này.</div>
      )}
      {!isLoading && tours.length > 0 && (
        <>
          <h3 className="my-4 text-xl font-semibold">
            Danh sách tour thuộc danh mục: {directoryName}
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

export default TourDirectoriesList;
