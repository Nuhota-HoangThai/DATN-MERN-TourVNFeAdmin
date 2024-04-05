import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

const CreateBillForm = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [bookingId, setBookingId] = useState("");
  const [notesBill, setNotesBill] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post(
        `${BASE_URL}/bill/createBills`,
        {
          booking: bookingId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      //console.log("Bill created:", response.data);

      setBookingId("");
      setNotesBill("");
      alert("Tạo hóa đơn thành công!");
    } catch (error) {
      console.error("Failed to create bill:", error);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-4 my-4 rounded-lg bg-white shadow-xl"
    >
      <div className="p-6">
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <div className="mx-3 mb-6 flex flex-wrap">
          <h2 className="flex items-center text-xl font-semibold text-gray-900">
            Mã đặt tour:
          </h2>
          <div className="flex w-full items-center px-3 md:mb-0 md:w-1/2">
            <input
              type="text"
              id="bookingId"
              placeholder="Nhập mã đặt tour"
              className="w-full appearance-none rounded-lg border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              required
            />
          </div>
          <div className="w-54 flex items-center px-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-lg bg-blue-900 px-8 py-2 font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {isLoading ? "Đang tạo..." : "Tạo hóa đơn"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateBillForm;
