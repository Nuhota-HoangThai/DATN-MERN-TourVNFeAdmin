import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
    <div className="container mx-auto ">
      <h1 className="mb-4 mt-1 text-center font-bold">
        Tour Đã Có Hướng Dẫn Viên
      </h1>
      {Object.keys(groupedTours).map((guideId) => (
        <div key={guideId} className="mb-8">
          <h2 className="mb-2 font-semibold underline">
            Hdv: {groupedTours[guideId].guideName}
          </h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-800 text-left text-white">
                <th className="px-4 py-2">Tên tour</th>
                <th className="px-4 py-2">Loại tour</th>
                <th className="px-4 py-2">Danh mục tour</th>
                <th className="px-4 py-2">Giá</th>
                <th className="px-4 py-2 text-center">Chi tiết tour</th>
              </tr>
            </thead>
            <tbody>
              {groupedTours[guideId].tours.map((tour) => (
                <tr key={tour._id} className="border-b">
                  <td className="px-4 py-2">{tour.nameTour}</td>
                  <td className="px-4 py-2">{tour.tourType?.typeName}</td>
                  <td className="px-4 py-2">
                    {tour.tourDirectory?.directoryName}
                  </td>
                  <td className="px-4 py-2 text-red-500">
                    {tour.price?.toLocaleString()} đ
                  </td>
                  <td className="px-4 py-2 text-center italic underline">
                    <Link
                      to={`/tour-detail/${tour._id}`}
                      className="text-blue-800"
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AllTourGuide;
