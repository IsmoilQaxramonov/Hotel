// components/AddStaffForm.tsx
import React, { useState } from "react";

const AddStaffForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    username: "",
    role: "",
    startDate: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", form);
    // TODO: API call to add staff
  };

  return (
    <div className="p-4 border rounded shadow-sm mb-6">
      <h2 className="text-lg font-bold mb-4">Add New Staff Member</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select name="role" value={form.role} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Receptionist">Receptionist</option>
          <option value="Staff">Staff</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Password"
        />
        <button type="submit" className="col-span-3 bg-blue-500 text-white p-2 rounded">
          Add Staff
        </button>
      </form>
    </div>
  );
};

export default AddStaffForm;
