import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import { useSelector } from "react-redux";

const TourDirectory = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [tourPromotion, setTourPromotion] = useState([]);
  const [selectedTourPromotion, setSelectedPromotion] = useState("");

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

  return (
    <div>
      <div className="mb-4">
        <label
          htmlFor="promotion"
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Khuyến mãi
        </label>
        <select
          name="promotion"
          id="promotion"
          value={selectedTourPromotion}
          onChange={(e) => setSelectedPromotion(e.target.value)}
          className="block w-full appearance-none rounded border border-gray-200 bg-white px-3 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
        >
          <option value="">Chọn loại khuyến mãi</option>
          {tourPromotion?.map((promotion) => (
            <option key={promotion._id} value={promotion._id}>
              {promotion.namePromotion ?? "Khuyến mãi không tên"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TourDirectory;
