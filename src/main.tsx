import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Sidebar from "./components/layout";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-5">
          <Dashboard />
        </main>
      </div>
    </BrowserRouter>
  </StrictMode>
);
