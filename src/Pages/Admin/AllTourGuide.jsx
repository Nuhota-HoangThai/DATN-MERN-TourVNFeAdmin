import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

const AllTourGuide = () => {
  const { token } = useSelector((state) => state.user.currentUser);
  const [tours, setTours] = useState([]);
  const [groupedTours, setGroupedTours] = useState({});
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tour/getAllTourGuide`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setTours(response.data.tours);
        const grouped = groupToursByGuide(response.data.tours);
        setGroupedTours(grouped);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  const groupToursByGuide = (tours) => {
    return tours.reduce((acc, tour) => {
      const guideId = tour.userGuide._id;
      if (!acc[guideId]) {
        acc[guideId] = {
          guideName: tour.userGuide.name,
          tours: [],
        };
      }
      acc[guideId].tours.push(tour);
      return acc;
    }, {});
  };

  return (
    <div>
      <h1>Tours Đã Có Hướng Dẫn Viên</h1>
      {Object.keys(groupedTours).map((guideId) => (
        <div key={guideId}>
          <h2>Hướng dẫn viên: {groupedTours[guideId].guideName}</h2>
          <ul>
            {groupedTours[guideId].tours.map((tour) => (
              <li key={tour._id}>
                <h3>{tour.nameTour}</h3>
                <p>Loại tour: {tour.tourType?.typeName}</p>
                <p>Danh mục tour: {tour.tourDirectory?.directoryName}</p>
                <p>Giá: ${tour.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AllTourGuide;
