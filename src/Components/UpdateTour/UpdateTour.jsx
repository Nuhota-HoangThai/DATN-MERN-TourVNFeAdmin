import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import axios from "axios";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import upload from "../../assets/images/upload.png";

const UpdateTour = () => {
  const { token } = useSelector((state) => state.user.currentUser);
  // const [selectedTourType, setSelectedTourType] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [tourData, setTourData] = useState({
    image: "",
    nameTour: "",
    maxParticipants: "",
    price: "",
    description: "",
    regions: "",
    startDate: "",
    endDate: "",
    convergeTime: "",
    tourType: "",
    tourDirectory: "",
    priceForChildren: "",
    priceForYoungChildren: "",
    priceForInfants: "",
    additionalFees: "",

    promotion: "",
  });

  //////////////////
  const [tourTypes, setTourTypes] = useState([]);
  const [tourDirectory, setTourDirectory] = useState([]);
  const [tourPromotion, setTourPromotion] = useState([]);

  useEffect(() => {
    const fetchTourTypes = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/tourType/getAllTourType`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );

        setTourTypes(data.tourTypes);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchTourTypes();
  }, []);

  useEffect(() => {
    const fetchTourCategories = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/tourDirectory/getAllTourDirectories`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );

        setTourDirectory(data.tourDirectories);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchTourCategories();
  }, []);
  useEffect(() => {
    const fetchTourPromotion = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/tourPromotion/getAllPromotion`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );
        console.log(data); // Verify the structure of the received data
        setTourPromotion(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchTourPromotion();
  }, []);
  ////////////////////
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState([upload]);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/tour/getTourById/${id}`, {
          // headers: {
          //   Authorization: "Bearer " + token,
          // },
        });
        setTourData(data.tour);
        if (Array.isArray(data.tour.image)) {
          const imagesUrls = data.tour.image.map(
            (i) => `${BASE_URL}/${i.replace(/\\/g, "/")}`,
          );
          setPreviewImage(imagesUrls);
        }
      } catch (error) {
        console.error("Error fetching tour:", error);
      }
    };

    fetchTour();
  }, [id]);
  //console.log(previewImage);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const key in tourData) {
      formData.append(key, tourData[key]);
    }
    if (image && image.length) {
      image.forEach((img) => {
        formData.append("image", img); // Thêm từng hình ảnh vào formData
      });
    }

    try {
      const { data } = await axios.put(
        `${BASE_URL}/tour/update_tour/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      setTourData(data.tour);

      alert("Cập nhật tour thành công!");
      navigate("/listTour");
    } catch (error) {
      console.error("Lỗi cập nhật tour:", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImage(filesArray); // Lưu trữ tất cả các file hình ảnh được chọn
      const filesArrayUrls = filesArray.map((file) =>
        URL.createObjectURL(file),
      );
      setPreviewImage(filesArrayUrls); // Cập nhật các URL xem trước cho tất cả hình ảnh được chọn
    }
  };

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2); // Ensuring two digits
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // JavaScript months are 0-based.
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getDefaultConvergeTime = () => {
    const now = new Date();

    // Không cần thêm giờ GMT+7 nếu bạn muốn sử dụng giờ máy chủ/local
    const localTime = now;

    // Format ngày tháng năm theo YYYY-MM-DD và giờ phút theo HH:mm
    const year = localTime.getFullYear();
    const month = (localTime.getMonth() + 1).toString().padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
    const day = localTime.getDate().toString().padStart(2, "0");
    const hours = localTime.getHours().toString().padStart(2, "0");
    const minutes = localTime.getMinutes().toString().padStart(2, "0");

    // Trả về chuỗi ngày giờ đã được format
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="mx-auto my-4 max-h-[600px] max-w-4xl   shadow-lg">
      <div className="rounded-2xl  bg-white  p-5 md:p-8">
        <h1 className="mb-4 text-xl font-semibold">Cập nhật Tour</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4 flex justify-center">
            <label htmlFor="file-input" className="flex cursor-pointer gap-4">
              {previewImage.length > 0 ? (
                previewImage.map((image, index) => (
                  <img
                    src={image}
                    alt="Preview"
                    key={index}
                    style={{ width: "100px", height: "100px" }}
                  />
                ))
              ) : (
                <img
                  src={upload}
                  alt="Upload"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
            </label>
            <input
              onChange={handleImageChange}
              type="file"
              name="image"
              id="file-input"
              className="flex"
              multiple // Cho phép chọn nhiều hình ảnh
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Danh mục tour
              </label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                value={tourData.tourDirectory}
                onChange={(e) =>
                  setTourData({ ...tourData, tourDirectory: e.target.value })
                }
              >
                <option value="">Chọn danh mục tour</option>
                {tourDirectory?.map((directory) => (
                  <option key={directory._id} value={directory._id}>
                    {directory.directoryName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loại tour
              </label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                value={tourData.tourType}
                onChange={(e) =>
                  setTourData({ ...tourData, tourType: e.target.value })
                }
              >
                <option value="">Chọn loại tour</option>
                {tourTypes?.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type?.typeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Khuyến mãi
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={tourData.promotion}
              onChange={(e) =>
                setTourData({ ...tourData, promotion: e.target.value })
              }
            >
              <option value="">Chọn loại khuyến mãi</option>
              {tourPromotion?.map((promotion) => (
                <option key={promotion._id} value={promotion._id}>
                  {promotion.namePromotion}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2  gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên tour
              </label>
              <input
                placeholder="Nhập tên tour"
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 placeholder-gray-400  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                type="text"
                value={tourData.nameTour}
                onChange={(e) =>
                  setTourData({ ...tourData, nameTour: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Khu vực du lịch
              </label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                value={tourData.regions}
                onChange={(e) =>
                  setTourData({ ...tourData, regions: e.target.value })
                }
              >
                <option value="">Chọn miền</option>
                <option value="mb">Miền Bắc</option>
                <option value="mt">Miền Trung</option>
                <option value="mn">Miền Nam</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2  gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nơi khởi hành
              </label>
              <input
                placeholder="Nhập nơi khởi hành"
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 placeholder-gray-400  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                type="text"
                value={tourData.startingGate}
                onChange={(e) =>
                  setTourData({ ...tourData, startingGate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số chỗ trống
              </label>
              <input
                placeholder="Số chỗ trống"
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                type="number"
                value={tourData.maxParticipants}
                onChange={(e) =>
                  setTourData({ ...tourData, maxParticipants: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giá
              </label>
              <input
                placeholder="Nhập giá tour"
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                type="number"
                value={tourData.price}
                onChange={(e) =>
                  setTourData({ ...tourData, price: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giá trẻ em (6-16) tuổi
              </label>
              <input
                placeholder="Nhập giá tour"
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                type="number"
                value={tourData.priceForChildren}
                onChange={(e) =>
                  setTourData({ ...tourData, priceForChildren: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giá trẻ em (3-6) tuổi
              </label>
              <input
                placeholder="Nhập giá"
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                type="number"
                value={tourData.priceForYoungChildren}
                onChange={(e) =>
                  setTourData({
                    ...tourData,
                    priceForYoungChildren: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giá trẻ sơ sinh (dưới 3) tuổi
              </label>
              <input
                placeholder="Nhập giá tour"
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                type="number"
                value={tourData.priceForInfants}
                onChange={(e) =>
                  setTourData({ ...tourData, priceForInfants: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phí phụ thu (phòng đơn)
              </label>
              <input
                placeholder=" Phí bổ sung"
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                type="number"
                value={tourData.additionalFees}
                onChange={(e) =>
                  setTourData({ ...tourData, additionalFees: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thời gian tập trung
              </label>
              <input
                placeholder="Thời gian tập trung"
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                type="datetime-local"
                value={
                  tourData.convergeTime
                    ? tourData.convergeTime
                    : getDefaultConvergeTime()
                }
                onChange={(e) =>
                  setTourData({ ...tourData, convergeTime: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2  gap-6">
            <div>
              <label className="block text-sm  font-medium text-gray-700">
                Ngày khởi hành
              </label>
              <input
                placeholder="Nhập ngày khởi hành"
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                type="date"
                value={formatDateVN(tourData.startDate)}
                onChange={(e) =>
                  setTourData({ ...tourData, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ngày kết thúc
              </label>
              <input
                placeholder="Nhập ngày kết thúc"
                className="mt-1 block w-full rounded-md border border-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                type="date"
                value={formatDateVN(tourData.endDate)}
                onChange={(e) =>
                  setTourData({ ...tourData, endDate: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Thông tin chi tiết
            </label>
            <ReactQuill
              theme="snow"
              value={tourData.description}
              onChange={(content) =>
                setTourData({ ...tourData, description: content })
              }
            />
          </div>

          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cập nhật Tour
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTour;
