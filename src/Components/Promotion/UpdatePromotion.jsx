import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdatePromotionForm = () => {
  const { token } = useSelector((state) => state.user.currentUser);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namePromotion: "",
    descriptionPromotion: "",
    discountPercentage: 0,
    startDatePromotion: "",
    endDatePromotion: "",
  });

  useEffect(() => {
    const fetchPromotionDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/tourPromotion/getPromotionById/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );
        console.log(setFormData);
        setFormData({
          namePromotion: response.data.namePromotion,
          descriptionPromotion: response.data.descriptionPromotion,
          discountPercentage: response.data.discountPercentage,
          startDatePromotion: response.data.startDatePromotion.split("T")[0], // Only take the date part
          endDatePromotion: response.data.endDatePromotion.split("T")[0], // Only take the date part
        });
      } catch (error) {
        console.error("Error fetching promotion details", error);
      }
    };

    fetchPromotionDetails();
  }, [id, token]);

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
      await axios.put(
        `${BASE_URL}/tourPromotion/updatePromotion/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      toast("Cập nhật khuyến mãi thành công!");
      navigate("/listPromotion"); // Navigate user back to the promotion list page after updating
    } catch (error) {
      toast("Cập nhật khuyến mãi không thành công.");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="namePromotion"
          >
            Tên khuyến mãi
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="namePromotion"
            type="text"
            placeholder="Tên khuyến mãi"
            name="namePromotion"
            value={formData.namePromotion}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="descriptionPromotion"
          >
            Mô Tả
          </label>
          <textarea
            className="focus:shadow-outline h-24 w-full resize-none appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="descriptionPromotion"
            placeholder="Mô Tả Khuyến Mãi"
            name="descriptionPromotion"
            value={formData.descriptionPromotion}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="discountPercentage"
          >
            Giá Khuyến Mãi (Giảm %)
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="discountPercentage"
            type="number"
            placeholder="Nhập giá khuyến mãi"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="startDatePromotion"
          >
            Ngày Bắt Đầu
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="startDatePromotion"
            type="date"
            name="startDatePromotion"
            value={formData.startDatePromotion}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="endDatePromotion"
          >
            Ngày Kết Thúc
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="endDatePromotion"
            type="date"
            name="endDatePromotion"
            value={formData.endDatePromotion}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePromotionForm;
