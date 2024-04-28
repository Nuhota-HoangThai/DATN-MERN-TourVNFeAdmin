import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CreatePromotionForm() {
  const { token } = useSelector((state) => state.user.currentUser);

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    namePromotion: "",
    discountPercentage: 0,
    startDatePromotion: "",
    endDatePromotion: "",
    descriptionPromotion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      await axios.post(
        `${BASE_URL}/tourPromotion/createPromotion`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast("Tạo khuyến mãi thành công!");
      //console.log(response.data);
    } catch (error) {
      toast("Tạo khuyến mãi không thành công.");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-lg"
      >
        <h2 className="mb-2 block text-lg font-bold text-gray-700">
          Tạo khuyến mãi mới
        </h2>
        <div>
          <label
            htmlFor="file-input"
            className="mb-1 block cursor-pointer text-sm font-medium text-gray-700"
          >
            Thêm hình ảnh
          </label>
          {image ? (
            <div className="mb-4 flex justify-center">
              <img
                src={URL.createObjectURL(image)}
                alt="Hình ảnh địa điểm"
                onLoad={() => URL.revokeObjectURL(image)}
                className="h-auto max-w-xs rounded-md shadow-sm"
              />
            </div>
          ) : (
            <div className="mb-4 flex h-48 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300">
              <span className="text-sm text-gray-500">Chưa có hình ảnh</span>
            </div>
          )}
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="image"
            id="file-input"
            className="hidden"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {" "}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Tên khuyến mãi:
              <input
                type="text"
                name="namePromotion"
                value={formData.namePromotion}
                onChange={handleInputChange}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Giá khuyến mãi:
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                required
              />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Ngày bắt đầu:
              <input
                type="date"
                name="startDatePromotion"
                value={formData.startDatePromotion}
                onChange={handleInputChange}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Ngày kết thúc:
              <input
                type="date"
                name="endDatePromotion"
                value={formData.endDatePromotion}
                onChange={handleInputChange}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                required
              />
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Mô tả:
            <textarea
              name="descriptionPromotion"
              value={formData.descriptionPromotion}
              onChange={handleInputChange}
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              required
            />
          </label>
        </div>

        <button
          className="w-full bg-sky-600 py-2 font-semibold text-white"
          type="submit"
        >
          Tạo
        </button>
      </form>
    </div>
  );
}
export default CreatePromotionForm;
