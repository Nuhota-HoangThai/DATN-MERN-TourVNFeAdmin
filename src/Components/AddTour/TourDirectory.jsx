import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import { useSelector } from "react-redux";

const TourDirectory = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [tourDirectory, setTourDirectory] = useState([]);
  const [selectedTourDirectory, setSelectedTourDirectory] = useState("");

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

  return (
    <div>
      <div className="mb-4">
        <label
          htmlFor="tourDirectory"
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Danh Mục Tour <span className="text-red-500">*</span>
        </label>
        <select
          name="tourDirectory"
          id="tourDirectory"
          value={selectedTourDirectory}
          onChange={(e) => setSelectedTourDirectory(e.target.value)}
          className="block w-full appearance-none rounded border border-gray-200 bg-white px-3 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
        >
          <option value="">Chọn danh mục tour</option>
          {tourDirectory?.map((directory) => (
            <option key={directory._id} value={directory._id}>
              {directory.directoryName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TourDirectory;
