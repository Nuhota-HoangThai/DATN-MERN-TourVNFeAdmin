import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import { MdClear } from "react-icons/md";

const ListTour = () => {
  const [allTours, setAllTours] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    //image: "",
    name: "",
    maxGroupSize: "",
    old_price: "",
    new_price: "",
    regions: "",
    desc: "",
  });

  const fetchInfo = async () => {
    try {
      const res = await fetch(`${BASE_URL}/tour/getAllTours`);
      const data = await res.json();
      setAllTours(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const startEditing = (tour) => {
    setEditingId(tour._id);
    setEditFormData({
      //image: tour.image,
      name: tour.name,
      maxGroupSize: tour.maxGroupSize,
      old_price: tour.old_price,
      new_price: tour.new_price,
      regions: tour.regions,
      desc: tour.desc,
    });
  };

  const update_tour = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/tour/update_tour/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to update tour");
      }

      // Cập nhật thông tin tours từ server sau khi cập nhật thành công
      await fetchInfo();

      // Rời khỏi chế độ chỉnh sửa chỉ sau khi cập nhật thành công
      setEditingId(null);
      setEditFormData({
        //image: "",
        name: "",
        maxGroupSize: "",
        old_price: "",
        new_price: "",
        regions: "",
        desc: "",
      });
    } catch (error) {
      console.error("Error updating tour:", error);
    }
  };

  const remove_tour = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/tour/removeTour/${id}`, {
        method: "DELETE", // Ensure this matches the expected HTTP method in your backend
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the tour");
      }

      await fetchInfo(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error removing tour:", error);
    }
  };

  return (
    <div className="w-full  p-4">
      <h1 className="text-2xl font-bold mb-4">
        Tất cả danh mục Chuyến du lịch
      </h1>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="text-xs text-white uppercase bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tên
              </th>
              <th scope="col" className="px-6 py-3">
                Số lượng
              </th>
              <th scope="col" className="px-6 py-3">
                Giá cũ <span className="lowercase">(đ/khách)</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Giá mới <span className="lowercase">(đ/khách)</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Miền
              </th>
              <th scope="col" className="px-6 py-3">
                Mô tả
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
              <tr key={tour._id} className="bg-white border-b">
                {editingId === tour._id ? (
                  // Editable cells
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        defaultValue={tour.name}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            name: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <input
                        type="number"
                        defaultValue={tour.maxGroupSize}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            maxGroupSize: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <input
                        type="number"
                        defaultValue={tour.old_price}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            old_price: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <input
                        type="number"
                        defaultValue={tour.new_price}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            new_price: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <input
                        type="text"
                        defaultValue={tour.regions}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            regions: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <input
                        type="text"
                        defaultValue={tour.desc}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            desc: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </td>
                  </>
                ) : (
                  // Non-editable cells
                  <>
                    <td className="px-6 py-4">{tour.name}</td>
                    <td className="px-6 py-4">{tour.maxGroupSize}</td>
                    <td className="px-6 py-4">{tour.old_price}</td>
                    <td className="px-6 py-4">{tour.new_price}</td>
                    <td className="px-6 py-4">{tour.regions}</td>
                    <td className="px-6 py-4">{tour.desc}</td>
                  </>
                )}
                <td className="px-6 py-4 ">
                  {editingId === tour._id ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => update_tour(tour._id)}
                    >
                      Cập nhật
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => startEditing(tour)}
                    >
                      Sửa
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                  <MdClear
                    onClick={() => remove_tour(tour._id)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTour;
