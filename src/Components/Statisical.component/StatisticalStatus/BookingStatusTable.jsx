import { translateStatus } from "../../../utils/formatStatus";

const BookingStatusTable = ({ bookingStats }) => (
  <div className="p-4">
    <h1 className="mb-4 text-xl font-bold">Thống kê trạng thái đặt tour</h1>
    <table className="w-full text-sm text-gray-500">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3 text-center">
            Trạng thái
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            Số lượng
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(bookingStats).map(([status, count]) => (
          <tr key={status} className="border-b bg-white">
            <td className="px-6 py-4 text-center">{translateStatus(status)}</td>
            <td className="px-6 py-4 text-center">{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BookingStatusTable;
