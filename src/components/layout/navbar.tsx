import { Search, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { handleLogout } from "../../modules/auth/api/auth.api";

export default function Navbar() {
  const menu = [
    { title: "Dashboard", link: "/" },
    { title: "Bino / Qavat / Xona", link: "/properties" },
    { title: "Bronlar", link: "/bookings" },
    { title: "Mehmonlar", link: "/guests" },
    { title: "To'lovlar", link: "/payments" },
    { title: "Xodimlar", link: "/staff" },
    { title: "Loglar", link: "/logs" },
  ];
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
    <header className="w-full h-16 bg-white border-b border-gray-400 flex items-center justify-between px-6">
      {/* LEFT — LOGO + MENU */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <span className="text-2xl">Hotel</span>
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
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search bookings, guests..."
            className="border border-gray-400 rounded-xl pl-10 pr-4 py-2 text-sm w-64 bg-white focus:outline-none focus:ring focus:ring-blue-100"
          />
        </div>

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
