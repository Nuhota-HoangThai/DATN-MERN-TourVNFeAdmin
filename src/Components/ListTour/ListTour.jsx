import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import { useSelector } from "react-redux";

const ListTour = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  const [allTours, setAllTours] = useState([]);

  const fetchInfo = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/tour/getAllTours`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAllTours(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const navigateToUpdateTour = (id) => {
    navigate(`/update_tour/${id}`);
  };

  const remove_tour = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tour/removeTour/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      await fetchInfo();
    } catch (error) {
      console.error("Error removing tour:", error);
    }
  };

  const formatRegion = (region) => {
    switch (region) {
      case "mn":
        return "Miền Nam";
      case "mb":
        return "Miền Bắc";
      case "mt":
        return "Miền Trung";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className="w-full p-4 ">
      <div className="flex justify-between">
        <h1 className="my-2 text-center text-2xl font-bold">Danh sách tour</h1>
        <Link to={"/addTour"} className=" no-underline ">
          <div className="mb-2 flex w-48 items-center justify-center rounded-lg bg-blue-950 py-2 text-white">
            <p className="pl-2">Thêm tour</p>
          </div>
        </Link>
      </div>
      <div className="max-h-[600px] overflow-auto">
        {allTours.length > 0 ? (
          <table className="min-w-full table-fixed overflow-hidden rounded-2xl text-left text-sm">
            <thead className=" bg-blue-950 text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Mã tour
                </th>
                <th scope="col" className="px-6 py-3">
                  Loại tour
                </th>
                <th scope="col" className="px-6 py-3">
                  Danh mục tour
                </th>

                <th scope="col" className="px-6 py-3">
                  Khuyến mãi
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên tour
                </th>
                <th scope="col" className="px-6 py-3">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3">
                  Giá <span className="lowercase">(đ/khách)</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Miền
                </th>

                <th scope="col" className="px-6 py-3">
                  Xem tour
                </th>

                <th scope="col" className="px-6 py-3">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              {allTours.map((tour) => (
                <tr key={tour._id} className="bg-white hover:bg-gray-100">
                  <td className="border-b px-6 py-4">
                    <Link to={`/tour-detail/${tour._id}`}>{tour._id}</Link>
                  </td>
                  <td className="border-b px-6 py-4">
                    {tour.tourType.typeName || "Không thuộc loại tour nào"}
                  </td>
                  <td className="border-b px-6 py-4">
                    {tour.tourDirectory.directoryName ||
                      "Không thuộc danh mục nào"}
                  </td>
                  <td className="border-b px-6 py-4">
                    {tour.promotion?.namePromotion || "Không có khuyến mãi"}
                  </td>

                  <td className="border-b px-6 py-4">{tour.nameTour}</td>
                  <td className="border-b px-6 py-4">{tour.maxParticipants}</td>
                  <td className="border-b px-6 py-4">
                    {" "}
                    {tour.price !== tour.originalPrice && tour.promotion ? (
                      <span>
                        {tour.price?.toLocaleString()} <br />
                        <span className="text-gray-500 line-through">
                          {tour.originalPrice?.toLocaleString()}
                        </span>
                      </span>
                    ) : (
                      tour.price?.toLocaleString()
                    )}
                  </td>
                  <td className="border-b px-6 py-4">
                    {formatRegion(tour.regions)}
                  </td>

                  <td className="border-b px-6 py-4">
                    <Link to={`/tour-detail/${tour._id}`}>Xem chi tiết</Link>
                  </td>

                  <td className="border-b px-6 py-4">
                    <button
                      className="text-red-500"
                      onClick={() => remove_tour(tour._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-5 text-center">Không có tour nào!!!</p>
        )}
      </div>{" "}
    </div>
  );
};

export default ListTour;
