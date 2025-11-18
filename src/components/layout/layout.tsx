import { NavLink } from "react-router-dom";
import { NAVIGATION } from "./state-sidebar";

interface SidebarProps {
  isAdmin: boolean;
  isOwner: boolean;
  isReception: boolean;
}

export default function Sidebar({
  isAdmin,
  isOwner,
  isReception,
}: SidebarProps) {
  let key: "admin" | "owner" | "reception" = "reception";

  if (isAdmin) key = "admin";
  else if (isOwner) key = "owner";
  else if (isReception) key = "reception";

  const menu = NAVIGATION[key]

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-300 px-4 py-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-8 px-2">
        Hotel Admin
      </h1>

      <nav className="flex flex-col gap-1">
        {menu.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-[15px] transition-all
               ${
                 isActive
                   ? "bg-gray-100 text-gray-900 font-semibold"
                   : "text-gray-700 hover:bg-gray-50"
               }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
