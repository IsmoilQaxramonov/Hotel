import OutstandingPayments from "../components/OutsTandingPayment";
import UpcomingCheckins from "../components/UpComingCheckin";
import PaymentStatusChart from "../components/PaymentsChart";
import OccupancyChart from "../components/OccupancyChart";
import StatsCards from "../components/StatsCards";
import DailyRevenueChart from "../components/DailyChart";
import MonthlyRevenueChart from "../components/MonthlyChart";

const DashboardPage = () => {
  return (
    <div className="p-6 space-y-6">
      <StatsCards />

      <div className="grid grid-cols-2 gap-4">
        <DailyRevenueChart />
        <MonthlyRevenueChart />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <OccupancyChart />
        <PaymentStatusChart />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <UpcomingCheckins />
        <OutstandingPayments />
      </div>
    </div>
  );
};

export default DashboardPage;
