interface Staff {
  name: string;
  username: string;
  role: string;
  startDate: string;
  status: "Active" | "Inactive";
}

const mockData: Staff[] = [
  { name: "Alice Wonderland", username: "alice.w", role: "Manager", startDate: "2022-03-15", status: "Active" },
  { name: "Bob The Builder", username: "bob.b", role: "Receptionist", startDate: "2023-01-20", status: "Active" },
];

const StaffTable = () => {
  return (
    <div className="p-4 border rounded shadow-sm">
      <h2 className="text-lg font-bold mb-4">Current Staff Members</h2>
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Username</th>
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-left">Start Date</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((staff, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border p-2">{staff.name}</td>
              <td className="border p-2">{staff.username}</td>
              <td className="border p-2">{staff.role}</td>
              <td className="border p-2">{staff.startDate}</td>
              <td className="border p-2">
                <span className={`px-2 py-1 rounded text-white ${staff.status === "Active" ? "bg-green-500" : "bg-gray-500"}`}>
                  {staff.status}
                </span>
              </td>
              <td className="border p-2 space-x-2">
                <button className="border px-2 py-1 rounded">Edit</button>
                <button className="border px-2 py-1 rounded bg-red-500 text-white">Block</button>
                <button className="border px-2 py-1 rounded">Archive</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
