import { NavLink } from "react-router-dom";
import { Building2, Users, FileBarChart, UserCircle, CreditCard, Settings } from "lucide-react";

// Sidebar layout for Hotel Admin Panel
export default function Sidebar() {
  const menu = [
    {
      title: "Dashboard",
      link: "/",
      icon: <FileBarChart size={18} />,
    },
    {
      title: "Bino / Qavat / Xona boshqaruvi",
      link: "/management/rooms",
      icon: <Building2 size={18} />,
    },
    {
      title: "Qabul xodimlari",
      link: "/staff",
      icon: <Users size={18} />,
    },
    {
      title: "Hisobotlar",
      link: "/reports",
      icon: <FileBarChart size={18} />,
    },
    {
      title: "Mehmonlar bazasi",
      link: "/guests",
      icon: <UserCircle size={18} />,
    },
    {
      title: "To'lovlar & Bron statistikasi",
      link: "/payments",
      icon: <CreditCard size={18} />,
    },
    {
      title: "Tizim sozlamalari",
      link: "/settings",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <aside className="h-screen w-64 bg-white shadow-xl border-r px-4 py-6 flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Hotel Admin</h1>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all
               ${isActive ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"}`
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
