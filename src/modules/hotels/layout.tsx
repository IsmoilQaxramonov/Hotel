import React, { useEffect, useRef } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuthStore } from "../../app/store/auth-store";

export default function PropertiesLayout() {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-sm"
      : "px-4 py-2 rounded-lg bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-100 transition";

  const clickRef = useRef<HTMLElement | null>(null);
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role_id;

  // Avtomatik birinchi tabni tanlash
  useEffect(() => {
    if (clickRef.current) {
      clickRef.current.click();
    }
  }, []);

  return (
    <div className="p-5">
      {/* Top navigation */}
      <div className="flex gap-3 mb-6">
        {/* ADMIN → faqat Hotels */}
        {(userRole === 1 || userRole === 2) && (
          <NavLink to="hotels" ref={clickRef} className={linkStyle}>
            Hotels
          </NavLink>
        )}

        {/* OWNER → Buildings va Floors */}
        {(userRole === 2 || userRole === 3) && (
          <>
            <NavLink to="buildings" ref={clickRef} className={linkStyle}>
              Buildings
            </NavLink>
            <NavLink to="floors" className={linkStyle}>
              Floors
            </NavLink>
          </>
        )}

        {/* RECEPTION → faqat Rooms */}
        {(userRole === 2 || userRole === 3) && (
          <NavLink to="rooms" ref={clickRef} className={linkStyle}>
            Rooms
          </NavLink>
        )}
      </div>

      {/* Nested Routes Content */}
      <Outlet />
    </div>
  );
}
