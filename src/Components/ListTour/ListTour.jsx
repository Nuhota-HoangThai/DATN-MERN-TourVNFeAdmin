import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

import { MdClear } from "react-icons/md";

const ListTour = () => {
  const navigate = useNavigate();

  const [allTours, setAllTours] = useState([]);

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDateVNWithTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const fetchInfo = async () => {
    try {
      const res = await fetch(`${BASE_URL}/tour/getAllTours`);
      const data = await res.json();
      setAllTours(data);
      console.log(data);
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
      const response = await fetch(`${BASE_URL}/tour/removeTour/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the tour");
      }

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
      {allTours.length > 0 ? (
        <div className="max-h-[500px]">
          <table className="min-w-full table-auto  text-left text-sm">
            <thead className="bg-blue-950 text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Loại tour
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
                  Ngày khởi hành
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày kết thúc
                </th>
                <th scope="col" className="px-6 py-3">
                  Thời gian tập trung
                </th>
                <th scope="col" className="px-6 py-3">
                  Nơi khởi hành
                </th>
                <th scope="col" className="px-6 py-3">
                  Cập nhật
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
                    {tour.tourType.typeName || "N/A"}
                  </td>
                  <td className="border-b px-6 py-4">{tour.nameTour}</td>
                  <td className="border-b px-6 py-4">{tour.maxParticipants}</td>
                  <td className="border-b px-6 py-4">{tour.price}</td>
                  <td className="border-b px-6 py-4">
                    {formatRegion(tour.regions)}
                  </td>
                  <td className="border-b px-6 py-4">
                    {formatDateVN(tour.startDate)}
                  </td>
                  <td className="border-b px-6 py-4">
                    {formatDateVN(tour.endDate)}
                  </td>
                  <td className="border-b px-6 py-4">
                    {formatDateVNWithTime(tour.convergeTime)}
                  </td>
                  <td className="border-b px-6 py-4">{tour.startingGate}</td>
                  <td className="border-b px-6 py-4">
                    <button
                      className="rounded bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-700"
                      onClick={() => navigateToUpdateTour(tour._id)}
                    >
                      Sửa
                    </button>
                  </td>

                  <td className="border-b px-6 py-4">
                    <MdClear
                      onClick={() => remove_tour(tour._id)}
                      className="cursor-pointer text-xl text-red-500 hover:text-red-700"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-5 text-center">Không có tour nào!!!</p>
      )}
    </div>
  );
};

export default ListTour;
