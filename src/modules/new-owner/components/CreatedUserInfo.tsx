import type { CreateUserFormData } from "../../../types/userFormData";
import { User, BadgeCheck } from "lucide-react";

interface Props {
  user: CreateUserFormData;
}

const CreatedUserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow w-full h-fit">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BadgeCheck className="w-5 h-5 text-green-600" />
        Foydalanuvchi muvaffaqiyatli yaratildi
      </h2>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-gray-600" />
          <p><span className="font-medium">Login:</span> {user.username}</p>
        </div>

        <p><span className="font-medium">Parol:</span> {user.password}</p>
        <p><span className="font-medium">Ism:</span> {user.first_name}</p>
        <p><span className="font-medium">Familiya:</span> {user.last_name}</p>
        <p><span className="font-medium">Rol ID:</span> {user.role_id}</p>
      </div>
    </div>
  );
};

export default CreatedUserInfo;
