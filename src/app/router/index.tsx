import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../modules/auth/pages/LoginPage";
import DashboardPage from "../../modules/reports/pages/DashboardPage";
import FloorsPage from "../../modules/hotels/pages/FloorsPage";
import RoomsPage from "../../modules/hotels/pages/RoomsPage";
import BookingListPage from "../../modules/booking/pages/BookingListPage";
import BookingDetailsPage from "../../modules/booking/pages/BookingDetailsPage";
import GuestsPage from "../../modules/guests/pages/GuestsPage";
import PaymentsPage from "../../modules/payments/pages/PaymentsPage";
import StaffManagementPage from "../../modules/staff/pages/StaffManagementPage";
import SettingsPage from "../../modules/settings/pages/SettingsPage";
import NotFound from "../../pages/NotFound";
import App from "../App";
import ProtectedRoute from "./protected-route";
import PropertiesLayout from "../../modules/hotels/layout";
import HotelsPage from "../../modules/hotels/pages/HotelsPage";
import BuildingsPage from "../../modules/hotels/pages/BuildingsPage";
import UsersPage from "../../modules/users/pages/UsersPage";
import NewOwnerPage from "../../modules/new-owner/pages/NewOwnerPage";

export const router = createBrowserRouter([
  // PUBLIC ROUTE
  {
    path: "/login",
    element: <LoginPage />,
  },

  // PROTECTED ROUTES
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <DashboardPage /> },
      // Hotels
      {
        path: "properties",
        element: <PropertiesLayout />,
        children: [
          { path: "hotels", element: <HotelsPage /> },
          { path: "buildings", element: <BuildingsPage /> },
          { path: "floors", element: <FloorsPage /> },
          { path: "rooms", element: <RoomsPage /> },
        ],
      },

          // Booking
          { path: "bookings", element: <BookingListPage /> },
          { path: "bookings/:id", element: <BookingDetailsPage /> },

          // Guests
          { path: "guests", element: <GuestsPage /> },

          // Payments
          { path: "payments", element: <PaymentsPage /> },

          // Staff
          { path: "staff", element: <StaffManagementPage /> },

          // Users
          {path: "users", element: <UsersPage/>},

          {path: "new-owner", element: <NewOwnerPage/>},

          // Settings
          { path: "settings", element: <SettingsPage /> },
        ],
      },
    ],
  },

  // NOT FOUND
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
