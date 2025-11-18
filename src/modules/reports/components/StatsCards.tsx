import { statsData } from "../api/dummy-data";

const StatsCards = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="p-4 bg-white rounded shadow">
        <p>Total Revenue</p>
        <h2 className="text-2xl font-bold">€{statsData.revenue}</h2>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <p>Total Bookings</p>
        <h2 className="text-2xl font-bold">{statsData.bookings}</h2>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <p>Available Rooms</p>
        <h2 className="text-2xl font-bold">
          {statsData.availableRooms.available} / {statsData.availableRooms.total}
        </h2>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <p>Unpaid Payments</p>
        <h2 className="text-2xl font-bold">€{statsData.unpaid}</h2>
      </div>
    </div>
  );
};

export default StatsCards;
