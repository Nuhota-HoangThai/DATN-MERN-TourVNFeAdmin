import { useState, useEffect } from "react";
import upload from "../../assets/images/upload.png";
import { BASE_URL } from "../../utils/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddTour = () => {
  const [images, setImages] = useState([]);

  const [tourTypes, setTourTypes] = useState([]);
  const [selectedTourType, setSelectedTourType] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [description, setDescription] = useState("");

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const getDefaultConvergeTime = () => {
    const now = new Date();

    // Thêm giờ GMT+7 vào thời gian hiện tại
    const localTime = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000,
    );

    // Format ngày tháng năm theo dd/mm/yyyy
    const day = localTime.getDate().toString().padStart(2, "0");
    const month = (localTime.getMonth() + 1).toString().padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
    const year = localTime.getFullYear();
    const hours = localTime.getHours().toString().padStart(2, "0");
    const minutes = localTime.getMinutes().toString().padStart(2, "0");

    // Trả về chuỗi ngày giờ đã được format
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [convergeTime, setConvergeTime] = useState(getDefaultConvergeTime());

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
            `HTTP error! status: ${resp.status}, statusText: ${resp.statusText}`,
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

  useEffect(() => {
    const fetchTourTypes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tourType/getAllTourType`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setTourTypes(data.tourTypes);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchTourTypes();
  }, []);

  // Cài đặt cho Slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
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
        <div className="mx-auto my-4 max-w-screen-lg rounded-2xl bg-gray-100 p-6 shadow-md ">
          <h1 className="mb-5 text-center text-2xl font-bold">
            Thêm chuyến du lịch
          </h1>
          <div className="grid grid-cols-2">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="nameTour"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Chuyến du lịch
                </label>
                <input
                  type="text"
                  name="nameTour"
                  id="nameTour"
                  placeholder="Tiêu đề chuyến du lịch"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="tourType"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Loại Tour
                  </label>
                  <select
                    name="tourType"
                    id="tourType"
                    value={selectedTourType}
                    onChange={(e) => setSelectedTourType(e.target.value)}
                    className="block w-full appearance-none rounded border border-gray-200 bg-white px-3 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  >
                    <option value="">Chọn loại tour</option>
                    {tourTypes.map((type) => (
                      <option key={type._id} value={type._id}>
                        {type.typeName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="startingGate"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Nơi khởi hành
                  </label>
                  <input
                    type="text"
                    name="startingGate"
                    id="startingGate"
                    placeholder="Nơi khởi hành"
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Giá/khách
                  </label>
                  <input
                    type="Number"
                    name="price"
                    id="price"
                    placeholder="Giá"
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="maxParticipants"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Số lượng khách
                  </label>
                  <input
                    type="Number"
                    name="maxParticipants"
                    id="maxParticipants"
                    placeholder="Số lượng khách"
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="startDate"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Ngày khởi hành
                  </label>
                  <input
                    type="Date"
                    name="startDate"
                    id="startDate"
                    placeholder="Ngày khởi hành"
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="endDate"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Ngày kết thúc
                  </label>
                  <input
                    type="Date"
                    name="endDate"
                    id="endDate"
                    placeholder="Ngày kết thúc"
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="convergeTime"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Thời gian tập trung
                  </label>
                  <input
                    type="datetime-local"
                    name="convergeTime"
                    id="convergeTime"
                    value={convergeTime}
                    onChange={(e) => setConvergeTime(e.target.value)}
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="regions"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Khu vực du lịch
                  </label>
                  <select
                    name="regions"
                    id="regions"
                    className="block w-full appearance-none rounded border border-gray-200 bg-white px-3 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  >
                    <option value="mb">Miền Bắc</option>
                    <option value="mt">Miền Trung</option>
                    <option value="mn">Miền Nam</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Thông tin chi tiết
                </label>
                <ReactQuill
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>
            <div className="ml-5 ">
              <div className="mb-4 text-center ">
                <label htmlFor="file-input" className="my-2 cursor-pointer ">
                  {images.length > 0 ? (
                    <Slider {...sliderSettings} className="mx-5 ">
                      {images.map((image, index) => {
                        if (image instanceof Blob) {
                          const imageUrl = URL.createObjectURL(image);
                          return (
                            <div key={index} className="">
                              <img
                                className="rounded-full"
                                src={imageUrl}
                                alt="Hình ảnh địa điểm "
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
                        className="mx-auto w-20  rounded-full border-4"
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
            className="focus:shadow-outline w-full rounded bg-blue-900 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Thêm
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTour;
