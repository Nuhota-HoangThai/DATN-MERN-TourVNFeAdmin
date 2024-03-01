import { useState } from "react";
import upload from "../../assets/images/upload.png";
import { BASE_URL } from "../../utils/config";

const AddTour = () => {
  const [images, setImages] = useState([]);

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const Add_Tour = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    setError("");

    let formData = new FormData(e.target);

    await fetch(`${BASE_URL}/tour/addTour`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(
            `HTTP error! status: ${resp.status}, statusText: ${resp.statusText}`
          );
        }
        return resp.json();
      })
      .then((data) => {
        if (data.success) {
          setIsSuccess(true);
        } else {
          setError("Không thêm được tour. Vui lòng điền lại!!!");
        }
      })

      .catch((error) => {
        console.error("Error:", error);
        alert("Đã xãy ra lỗi!");
      });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          Add_Tour(e);
        }}
      >
        <div className="max-w-lg mx-auto p-6 bg-gray-100 my-5 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold  text-center">
            Thêm chuyến du lịch
          </h1>
          <div className="mb-4">
            <label
              htmlFor="nameTour"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Chuyến du lịch
            </label>
            <input
              type="text"
              name="nameTour"
              id="nameTour"
              placeholder="Tiêu đề chuyến du lịch"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Giá/khách
            </label>
            <input
              type="Number"
              name="price"
              id="price"
              placeholder="Giá"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="maxParticipants"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Số lượng khách
            </label>
            <input
              type="Number"
              name="maxParticipants"
              id="maxParticipants"
              placeholder="Số lượng khách"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Ngày khởi hành
            </label>
            <input
              type="Date"
              name="startDate"
              id="startDate"
              placeholder="Ngày khởi hành"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Ngày kết thúc
            </label>
            <input
              type="Date"
              name="endDate"
              id="endDate"
              placeholder="Ngày kết thúc"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="regions"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Khu vực du lịch
            </label>
            <select
              name="regions"
              id="regions"
              className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="miền Bắc">Miền Bắc</option>
              <option value="miền Trung">Miền Trung</option>
              <option value="miền Nam">Miền Nam</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Thông tin chi tiết
            </label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Mô tả chi tiết chuyến du lịch"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 text-center">
            <label htmlFor="file-input" className="cursor-pointer   my-2">
              {images.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((image, index) => {
                    if (image instanceof Blob) {
                      const imageUrl = URL.createObjectURL(image);
                      return (
                        <img
                          src={imageUrl}
                          key={index}
                          alt=""
                          onLoad={() => URL.revokeObjectURL(imageUrl)}
                        />
                      );
                    }
                    return null; // Or handle non-Blob/File images differently
                  })}
                </div>
              ) : (
                <img src={upload} className="w-20 mx-auto" />
              )}
            </label>
            <input
              onChange={(e) => {
                setImages(() => {
                  return [...e.target.files];
                });
              }}
              type="file"
              name="image"
              id="file-input"
              className=" mt-4"
              multiple
            />
          </div>
          {isSuccess && (
            <div className="mb-4 text-sm font-semibold text-green-500">
              Thêm tour thành công
            </div>
          )}
          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Thêm
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTour;
