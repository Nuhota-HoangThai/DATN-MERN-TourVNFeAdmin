import { useState } from "react";
import { useSelector } from "react-redux";
import { tourService } from "../../service/tourService";

import { getDefaultConvergeTime } from "../../utils/formatDate";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import TourType from "./TourType";
import TourDirectory from "./TourDirectory";
import Schedule from "./Schedule";

const AddTour = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedTourType, setSelectedTourType] = useState("");

  const [scheduleContent, setScheduleContent] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [convergeTime, setConvergeTime] = useState(getDefaultConvergeTime());
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const Add_Tour = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    setError("");

    let formData = new FormData(e.target);
    formData.append("description", description);
    formData.append("schedule", scheduleContent);

    if (video.length > 0) {
      formData.append("video", video[0]);
    }

    try {
      await tourService.addTour(formData, token);
      setIsSuccess(true);
    } catch (error) {
      setError("Thêm tour thất bại.");
      console.error(error);
    }
  };
  // Cài đặt cho Slider
  const sliderSettings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: images.length > 1,
    autoplay: images.length > 1,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: images.length > 1,
          autoplay: images.length > 1,
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
      <PerfectScrollbar>
        <form
          className="max-h-[600px]"
          onSubmit={(e) => {
            Add_Tour(e);
          }}
        >
          <h1 className="my-2 text-center font-bold">Thêm chuyến du lịch</h1>{" "}
          <div className=" bg-gray-100 p-4 shadow-md ">
            <div className="grid grid-cols-2">
              {/**/}
              <div>
                {/*fhsh*/}
                <div className="grid grid-cols-2 gap-4">
                  <TourDirectory />
                  <TourType
                    selectedTourType={selectedTourType}
                    setSelectedTourType={setSelectedTourType}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                <div className="grid grid-cols-2 gap-4">
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
                      htmlFor="priceForChildren"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      Giá khách (6-16) tuổi
                    </label>
                    <input
                      type="number"
                      name="priceForChildren"
                      id="priceForChildren"
                      placeholder="Nhập giá"
                      disabled={selectedTourType === "661689edb0caba81f9b831c0"}
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="priceForYoungChildren"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      Giá khách (3-6) tuổi
                    </label>
                    <input
                      type="number"
                      name="priceForYoungChildren"
                      id="priceForYoungChildren"
                      placeholder="Nhập giá"
                      disabled={
                        selectedTourType === "661689edb0caba81f9b831c0" ||
                        selectedTourType === "661689fab0caba81f9b831c6"
                      }
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="priceForInfants"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      Giá khách (dưới 3) tuổi
                    </label>
                    <input
                      type="number"
                      name="priceForInfants"
                      id="priceForInfants"
                      placeholder="Nhập giá"
                      disabled={
                        selectedTourType === "661689edb0caba81f9b831c0" ||
                        selectedTourType === "661689fab0caba81f9b831c6" ||
                        selectedTourType === "66168a06b0caba81f9b831cc"
                      }
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="additionalFees"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      Phí phụ thu
                    </label>
                    <input
                      type="number"
                      name="additionalFees"
                      id="additionalFees"
                      placeholder="Phí bổ sung"
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    />
                  </div>
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
                </div>{" "}
              </div>

              <div className="ml-5 mt-6">
                <div className="flex w-full border-2 border-black">
                  {/* Phần hình ảnh */}
                  <div className="flex-1 text-center">
                    <label
                      htmlFor="file-input"
                      className="flex h-full w-full cursor-pointer items-center justify-center"
                    >
                      {images.length > 0 ? (
                        <Slider {...sliderSettings} className="h-full w-full">
                          {images.map((image, index) => {
                            if (
                              image instanceof Blob ||
                              image instanceof File
                            ) {
                              const imageUrl = URL.createObjectURL(image);
                              return (
                                <div key={index} className="h-full w-full">
                                  <img
                                    className="mx-auto border border-black"
                                    src={imageUrl}
                                    alt="Hình ảnh địa điểm"
                                    onLoad={() => URL.revokeObjectURL(imageUrl)}
                                    style={{
                                      width: "250px",
                                      height: "200px",
                                      objectFit: "cover", // Chỉnh sửa để hình ảnh phù hợp với khung nhìn mà không bị méo
                                    }}
                                  />
                                </div>
                              );
                            }
                            return null;
                          })}
                        </Slider>
                      ) : (
                        <div className="h-full w-full border border-black">
                          <h1 className="p-20">Thêm hình ảnh</h1>
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
                      className="hidden"
                      multiple
                    />
                  </div>

                  {/* Phần video */}
                  <div className="flex-1 text-center">
                    <label
                      htmlFor="video-input"
                      className="flex h-full w-full cursor-pointer items-center justify-center"
                    >
                      {video.length > 0 ? (
                        <video
                          className="mx-auto border border-black"
                          controls
                          src={URL.createObjectURL(video[0])}
                          alt="Video preview"
                          style={{
                            width: "250px",
                            height: "200px",
                            objectFit: "cover", // Chỉnh sửa để video phù hợp với khung nhìn mà không bị méo
                          }}
                        />
                      ) : (
                        <div className="h-full w-full border border-black">
                          <h1 className="p-20 text-center">Thêm video</h1>
                        </div>
                      )}
                    </label>
                    <input
                      onChange={(e) => setVideo([...e.target.files])}
                      type="file"
                      name="video"
                      id="video-input"
                      className="hidden"
                      accept="video/*"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  {" "}
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      name="description"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      Thông tin (Điểm nhấn)
                    </label>
                    <ReactQuill
                      name="description"
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="schedule"
                      name="schedule"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      Lịch trình
                    </label>
                    <Schedule
                      name="schedule"
                      content={scheduleContent}
                      setContent={setScheduleContent}
                    />
                  </div>
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
        </form>{" "}
      </PerfectScrollbar>
    </>
  );
};

export default AddTour;
