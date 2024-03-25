import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import axios from "axios";

const TourType = ({ selectedTourType, setSelectedTourType }) => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [tourTypes, setTourTypes] = useState([]);

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

  return (
    <div>
      {" "}
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
    </div>
  );
};

export default TourType;
