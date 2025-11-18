import type { CreateUserFormData } from "../../../types/userFormData";
import { Loader2, UserPlus } from "lucide-react";

interface AddOwnerFormProps {
  onSubmit: () => void;
  formData: CreateUserFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateUserFormData>>
  loading: boolean;
}

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({
  onSubmit,
  formData,
  setFormData,
  loading
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "role_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-5 w-full"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <UserPlus className="w-5 h-5 text-blue-600" />
        Yangi foydalanuvchini ro‘yxatdan o‘tkazish
      </h2>

      {/* Username */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Login (username)</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          placeholder="Foydalanuvchi logini"
          required
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Parol</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          placeholder="Parol kiriting"
          required
        />
      </div>

      {/* First Name */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Ism</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          placeholder="Ism"
          required
        />
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Familiya</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          placeholder="Familiya"
          required
        />
      </div>

      {/* Role */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Rol</label>
        <select
          name="role_id"
          value={formData.role_id}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value={2}>Ega</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
        disabled={loading}
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {loading ? "Yaratilmoqda..." : "Foydalanuvchini yaratish"}
      </button>
    </form>
  );
};

export default AddOwnerForm;
