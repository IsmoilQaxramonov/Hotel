import { BookOpen, Building2, CreditCard, FileBarChart, Settings, StarOff, UserCircle, Users } from "lucide-react";

export const NAVIGATION = {
  admin: [
    {
      title: "Dashboard",
      link: "/",
      icon: <FileBarChart size={20} />,
    },
    {
      title: "Register Owner Hotel",
      link: "/new-owner",
      icon: <StarOff size={20} />,
    },
  ],

  owner: [
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
      title: "Sozlamalar",
      link: "/settings",
      icon: <Settings size={20} />,
    },
  ],

  reception: [
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
  ],
};
