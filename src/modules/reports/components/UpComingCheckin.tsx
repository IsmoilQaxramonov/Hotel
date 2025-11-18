import { upcomingCheckins } from "../api/dummy-data";


const UpcomingCheckins = () => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Upcoming Check-ins & Check-outs</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>ID</th><th>Guest</th><th>Room</th><th>Type</th><th>Time</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {upcomingCheckins.map((i) => (
            <tr key={i.id} className="border-b">
              <td>{i.id}</td>
              <td>{i.guest}</td>
              <td>{i.room}</td>
              <td>{i.type}</td>
              <td>{i.time}</td>
              <td>{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingCheckins;
