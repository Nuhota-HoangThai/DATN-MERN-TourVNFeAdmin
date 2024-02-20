import { useState } from "react";
import upload from "../../assets/images/upload.png";
import { BASE_URL } from "../../utils/config";

const AddTour = () => {
  const [image, setImage] = useState(false);
  const [tourDetails, setTourDetails] = useState({
    name: "",
    image: "",
    regions: "mb",
    new_price: "",
    old_price: "",
    distance: "",
    desc: "",
    maxGroupSize: "",
    date: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setTourDetails({ ...tourDetails, [e.target.name]: e.target.value });
  };

  const Add_Tour = async () => {
    console.log(tourDetails);
    let responseData;
    let tour = tourDetails;

    let formData = new FormData();
    formData.append("tour", image);

    await fetch(`${BASE_URL}/tour/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      tour.image = responseData.image_url;
      await fetch(`${BASE_URL}/tour/addTour`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tour),
      })
        .then((resp) => resp.json())
        .then((data) => (data.success ? alert("Tour Added") : alert("Failed")));
    }
  };

  return (
    <div className="max-w-lg mx-auto my-6 p-6 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Chuyến du lịch
        </label>
        <input
          value={tourDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          id="name"
          placeholder="Tiêu đề chuyến du lịch"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="distance"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Khoảng cách (km)
        </label>
        <input
          value={tourDetails.distance}
          onChange={changeHandler}
          type="Number"
          name="distance"
          id="distance"
          placeholder="Độ dài đoạn đường đi"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="maxGroupSize"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Số lượng khách
        </label>
        <input
          value={tourDetails.maxGroupSize}
          onChange={changeHandler}
          type="Number"
          name="maxGroupSize"
          id="maxGroupSize"
          placeholder="Số lượng khách"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Ngày khởi hành
        </label>
        <input
          value={tourDetails.date}
          onChange={changeHandler}
          type="Date"
          name="date"
          id="date"
          placeholder="Ngày khởi hành"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="old_price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Giá cũ
          </label>
          <input
            value={tourDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            id="old_price"
            placeholder="Giá cũ"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            htmlFor="new_price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Giá khuyến mãi
          </label>
          <input
            value={tourDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            id="new_price"
            placeholder="Giá khuyến mãi"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="regions"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Khu vực du lịch
        </label>
        <select
          value={tourDetails.regions}
          onChange={changeHandler}
          name="regions"
          id="regions"
          className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="mb">Miền Bắc</option>
          <option value="mt">Miền Trung</option>
          <option value="mn">Miền Nam</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="desc"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Thông tin chi tiết
        </label>
        <input
          value={tourDetails.desc}
          onChange={changeHandler}
          type="text"
          name="desc"
          id="desc"
          placeholder="Mô tả chi tiết chuyến du lịch"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4 flex justify-center">
        <label htmlFor="file-input" className="cursor-pointer">
          <img
            className="w-14 "
            src={image ? URL.createObjectURL(image) : upload}
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          className="hidden"
        />
      </div>
      <button
        onClick={() => {
          Add_Tour();
        }}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Thêm
      </button>
    </div>
  );
};

export default AddTour;
