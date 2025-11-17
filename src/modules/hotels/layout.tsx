// PropertiesLayout.tsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function PropertiesLayout() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: "10px 18px",
    borderRadius: "6px",
    textDecoration: "none",
    background: isActive ? "#4f46e5" : "#f5f5f5",
    color: isActive ? "#fff" : "#000",
    fontWeight: 500,
  });

  return (
    <div style={{ padding: "20px" }}>
      {/* Top navigation */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <NavLink to="hotels" style={linkStyle}>
          Hotels
        </NavLink>
        <NavLink to="buildings" style={linkStyle}>
          Buildings
        </NavLink>
        <NavLink to="floors" style={linkStyle}>
          Floors
        </NavLink>
        <NavLink to="rooms" style={linkStyle}>
          Rooms
        </NavLink>
      </div>

      {/* Nested content */}
      <Outlet />
    </div>
  );
}
