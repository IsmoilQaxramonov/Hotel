import AddStaffForm from "../components/AddStaffForm";
import StaffTable from "../components/StaffTable";

const StaffManagementPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Staff Management</h1>
      <AddStaffForm />
      <StaffTable />
    </div>
  );
};

export default StaffManagementPage;
