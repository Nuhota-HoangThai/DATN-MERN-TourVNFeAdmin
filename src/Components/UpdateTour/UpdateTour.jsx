import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import upload from "../../assets/images/upload.png";
const UpdateTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [image, setImage] = useState();

  const [tourData, setTourData] = useState({
    image: "",
    nameTour: "",
    maxParticipants: "",
    price: "",
    description: "",
    regions: "",
    startDate: "",
    endDate: "",
    tourType: "",
  });

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState([upload]);
  const [tourTypes, setTourTypes] = useState([]);

  // Fetch tour types
  useEffect(() => {
    const fetchTourTypes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tourType/getAllTourType`);
        const data = await response.json();
        setTourTypes(data.tourTypes);
      } catch (error) {
        console.error("Error fetching tour types:", error);
      }
    };

    fetchTourTypes();
  }, []);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tour/getTourById/${id}`);
        const data = await res.json();
        setTourData(data.tour);

        if (Array.isArray(data.tour.image)) {
          const imagesUrls = data.tour.image.map(
            (i) => `${BASE_URL}/${i.replace(/\\/g, "/")}`
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
      const response = await fetch(`${BASE_URL}/tour/update_tour/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json(); // Giả sử server trả về JSON
      console.log(data);
      if (!response.ok) {
        throw new Error("Failed to update tour");
      }
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
        URL.createObjectURL(file)
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

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white shadow-lg rounded-lg md:p-8">
      <h1 className="text-xl font-semibold mb-4">Cập nhật Tour</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4 flex justify-center">
          <label htmlFor="file-input" className="cursor-pointer flex gap-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Loại tour
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 rounded-md"
            value={tourData.tourType}
            onChange={(e) =>
              setTourData({ ...tourData, tourType: e.target.value })
            }
          >
            <option value="">Chọn loại tour</option>
            {tourTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.typeName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tên tour
          </label>
          <input
            placeholder="Nhập tên tour"
            className="mt-1 block w-full border border-gray-800 rounded-md shadow-sm py-2 px-3  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400"
            type="text"
            value={tourData.nameTour}
            onChange={(e) =>
              setTourData({ ...tourData, nameTour: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-2  gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số chỗ trống
            </label>
            <input
              placeholder="Số chỗ trống"
              className="mt-1 block w-full border border-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400"
              type="number"
              value={tourData.maxParticipants}
              onChange={(e) =>
                setTourData({ ...tourData, maxParticipants: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Giá
            </label>
            <input
              placeholder="Nhập giá tour"
              className="mt-1 block w-full border border-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400"
              type="number"
              value={tourData.price}
              onChange={(e) =>
                setTourData({ ...tourData, price: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Khu vực du lịch
          </label>
          <select
            className="mt-1 block w-full border border-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={tourData.regions}
            onChange={(e) =>
              setTourData({ ...tourData, regions: e.target.value })
            }
          >
            <option value="">Chọn miền</option>
            <option value="Miền Bắc">Miền Bắc</option>
            <option value="Miền Trung">Miền Trung</option>
            <option value="Miền Nam">Miền Nam</option>
          </select>
        </div>
        <div className="grid grid-cols-2  gap-6">
          {" "}
          <div>
            <label className="block text-sm  font-medium text-gray-700">
              Ngày khởi hành
            </label>
            <input
              placeholder="Nhập ngày khởi hành"
              className="mt-1 block w-full border border-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400"
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
              className="mt-1 block w-full border border-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400"
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
          <input
            placeholder="Nhập thông tin chi tiết tour"
            className="mt-1 block w-full border border-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400"
            type="text"
            value={tourData.description}
            onChange={(e) =>
              setTourData({ ...tourData, description: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
        >
          Cập nhật Tour
        </button>
      </form>
    </div>
  );
};

export default UpdateTour;
