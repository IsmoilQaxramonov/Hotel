import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/navbar";
import Sidebar from "../components/layout/layout";
import { useEffect, useState } from "react";
import { useAuthStore } from "./store/auth-store";

export default function App() {
  const restore = useAuthStore((state) => state.restore);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isReception, setIsReception] = useState(false);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    restore();
  }, []);

  useEffect(() => {
  if (!user?.role_id) return;

  setIsAdmin(user.role_id === 1);
  setIsOwner(user.role_id === 2);
  setIsReception(user.role_id === 3);

}, [user]);


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* TOP NAV */}
      <Navbar isAdmin={isAdmin} isOwner={isOwner} isReception={isReception} />

      <div className="flex flex-1">
        {/* SIDEBAR LEFT */}
        <Sidebar
          isAdmin={isAdmin}
          isOwner={isOwner}
          isReception={isReception}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
