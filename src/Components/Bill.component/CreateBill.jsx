import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

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

      setBookingId("");
      setNotesBill("");
      toast("Tạo hóa đơn thành công!");
    } catch (error) {
      toast("Tạo hóa đơn không thành công!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-1 max-w-4xl rounded-lg bg-blue-800 p-2 shadow-xl"
    >
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-4">
          <input
            type="text"
            id="bookingId"
            placeholder="Nhập mã đặt tour"
            className="w-full rounded-lg border border-white px-4 py-2 text-gray-700 shadow-sm "
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            required
          />
        </div>
        <div className="">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-white px-4 py-2 text-black transition-colors duration-200 ease-in-out hover:bg-blue-500 hover:text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Đang tạo..." : "Tạo hóa đơn"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateBillForm;
