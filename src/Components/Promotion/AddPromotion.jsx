import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

function CreatePromotionForm() {
  const { token } = useSelector((state) => state.user.currentUser);

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
    try {
      const response = await axios.post(
        `${BASE_URL}/tourPromotion/createPromotion`, // Kiểm tra lại đường dẫn API để đảm bảo nó đúng
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      alert("Tạo khuyến mãi thành công!");
      console.log(response.data);
    } catch (error) {
      alert("Tạo khuyến mãi không thành công.");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <h2 className="mb-2 block text-lg font-bold text-gray-700">
          Tạo khuyến mãi mới
        </h2>
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
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Tạo
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePromotionForm;
