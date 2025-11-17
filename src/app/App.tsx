import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/navbar";
import Sidebar from "../components/layout/layout";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth-store";

export default function App() {
  const restore = useAuthStore((state) => state.restore);
  useEffect(() => {
    restore();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* TOP NAV */}
      <Navbar />

      <div className="flex flex-1">
        {/* SIDEBAR LEFT */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
