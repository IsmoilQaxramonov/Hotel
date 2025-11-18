import { outstandingPayments } from "../api/dummy-data";


const OutstandingPayments = () => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Outstanding Payments</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Invoice</th><th>Guest</th><th>Room</th><th>Amount</th><th>Due</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {outstandingPayments.map((p) => (
            <tr key={p.invoice} className="border-b">
              <td>{p.invoice}</td>
              <td>{p.guest}</td>
              <td>{p.room}</td>
              <td>€{p.amount}</td>
              <td>{p.due}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutstandingPayments;
