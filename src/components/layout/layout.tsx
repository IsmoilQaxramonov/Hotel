import { NavLink } from "react-router-dom";
import {
  Building2,
  Users,
  FileBarChart,
  UserCircle,
  CreditCard,
  Settings,
  BookOpen,
  ScrollText,
} from "lucide-react";

// Sidebar layout for Hotel Admin Panel
export default function Sidebar() {
  const menu = [
    {
      title: "Dashboard",
      link: "/",
      icon: <FileBarChart size={20} />,
    },

    {
      title: "Hotel / Bino / Qavat / Xona",
      link: "/properties",
      icon: <Building2 size={20} />,
    },

    {
      title: "Bronlar",
      link: "/bookings",
      icon: <BookOpen size={20} />,
    },

    {
      title: "Mehmonlar",
      link: "/guests",
      icon: <UserCircle size={20} />,
    },

    {
      title: "To'lovlar",
      link: "/payments",
      icon: <CreditCard size={20} />,
    },

    {
      title: "Xodimlar",
      link: "/staff",
      icon: <Users size={20} />,
    },

    {
      title: "Loglar",
      link: "/logs",
      icon: <ScrollText size={20} />,
    },

    {
      title: "Sozlamalar",
      link: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-400 px-4 py-6">
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
