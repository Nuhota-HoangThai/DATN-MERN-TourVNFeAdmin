import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const CreateBillForm = () => {
  const [bookingId, setBookingId] = useState("");
  const [notesBill, setNotesBill] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/bill/createBills`, {
        booking: bookingId,
        notesBill,
      });
      console.log("Bill created:", response.data);
      // Clear form
      setBookingId("");
      setNotesBill("");
      alert("Bill created successfully!");
    } catch (error) {
      console.error("Failed to create bill:", error);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-4  my-4 bg-white shadow-lg">
      <div className="p-4">
        {" "}
        <h2 className="mb-6 text-2xl font-semibold">Tạo hóa đơn</h2>
        {error && <p className="text-red-500">{error}</p>}{" "}
        <div className="w-1/2">
          <div className="mb-4">
            <label
              htmlFor="bookingId"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Nhập mã đặt tour:
            </label>
            <input
              type="text"
              id="bookingId"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="notesBill"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Thông tin thêm:
            </label>
            <textarea
              id="notesBill"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              value={notesBill}
              onChange={(e) => setNotesBill(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`focus:shadow-outline w-48 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
        >
          {isLoading ? "Creating..." : "Tạo"}
        </button>
      </div>
    </form>
  );
};

export default CreateBillForm;
