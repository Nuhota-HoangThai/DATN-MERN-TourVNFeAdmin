import { useState } from "react";
import upload from "../../assets/images/upload.png";
import { BASE_URL } from "../../utils/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

  // Cài đặt cho Slider
  const sliderSettings = {
    dots: true,
    infinite: true, // Đặt là true nếu bạn muốn Slider lặp lại khi chạy hết các hình
    speed: 500,
    slidesToShow: 1, // Hiển thị 1 hình ảnh tại một thời điểm
    slidesToScroll: 1, // Di chuyển 1 hình ảnh khi scroll hoặc nhấn nút
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          Add_Tour(e);
        }}
      >
        <div className="max-w-screen-lg mx-auto p-6 bg-gray-100 my-5 shadow-md rounded-lg ">
          <h1 className="text-2xl font-bold  text-center">
            Thêm chuyến du lịch
          </h1>
          <div className="grid grid-cols-2">
            <div>
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
            </div>
            <div className="ml-5 ">
              <div className="mb-4 text-center ">
                <label htmlFor="file-input" className="cursor-pointer my-2 ">
                  {images.length > 0 ? (
                    <Slider {...sliderSettings} className="mx-5">
                      {images.map((image, index) => {
                        if (image instanceof Blob) {
                          const imageUrl = URL.createObjectURL(image);
                          return (
                            <div key={index} className="">
                              <img
                                src={imageUrl}
                                alt={`Preview ${index}`}
                                onLoad={() => URL.revokeObjectURL(imageUrl)}
                                style={{
                                  width: "100%",
                                  height: "400px",
                                  marginTop: "100px",
                                }}
                              />
                            </div>
                          );
                        }
                        return null;
                      })}
                    </Slider>
                  ) : (
                    <div className="my-[50%]">
                      <img
                        src={upload}
                        className="w-20 mx-auto  rounded-full border-4"
                        alt="Upload"
                      />
                      <h1 className="mt-3">Thêm hình ảnh</h1>
                    </div>
                  )}
                </label>
                <input
                  onChange={(e) => {
                    setImages([...e.target.files]);
                  }}
                  type="file"
                  name="image"
                  id="file-input"
                  className="hidden "
                  multiple
                />
              </div>
            </div>
          </div>
          {isSuccess && (
            <div className="mb-4 text-sm font-semibold text-green-500">
              Thêm tour thành công
            </div>
          )}
          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Thêm
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTour;
