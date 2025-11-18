import { Settings, LogOut, Hotel } from "lucide-react";
import { NavLink } from "react-router-dom";
import { handleLogout } from "../../modules/auth/api/auth.api";
import { NAVIGATION } from "./state-sidebar";

interface NavbarProps {
  isAdmin: boolean;
  isOwner: boolean;
  isReception: boolean;
}

export default function Navbar({ isAdmin, isOwner, isReception }: NavbarProps) {
  let key: "admin" | "owner" | "reception" = "reception";

  if (isAdmin) key = "admin";
  else if (isOwner) key = "owner";
  else if (isReception) key = "reception";

  const menu = NAVIGATION[key];
  const logout = async () => {
    try {
      await handleLogout();
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="w-full h-16 bg-white border-b border-gray-300 flex items-center justify-between px-6">
      {/* LEFT — LOGO + MENU */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <span className="text-2xl">
            <Hotel size={20} />
          </span>
          HMS
        </div>

        <nav className="flex items-center gap-6 text-gray-700 font-medium">
          {menu.map((item) => (
            <NavLink
              key={item.link}
              to={item.link}
              className={({ isActive }) =>
                `text-sm transition ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-500"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* RIGHT — SEARCH + SETTINGS + LOGOUT + PROFILE */}
      <div className="flex items-center gap-4">
        <NavLink
          to={"settings"}
          className="p-2 border rounded-xl hover:bg-gray-100 border-gray-400 cursor-pointer"
        >
          <Settings size={18} />
        </NavLink>

        <button
          onClick={logout}
          className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 cursor-pointer"
        >
          <LogOut size={18} />
        </button>

        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-9 h-9 rounded-full border"
        />
      </div>
    </header>
  );
}
