export const statsData = {
  revenue: 55678,
  bookings: 1245,
  availableRooms: { available: 55, total: 200 },
  unpaid: 3450,
};

export const dailyRevenue = [
  1500, 1800, 2200, 2500, 3000, 3500, 3700, 3900, 4200, 4500, 4800, 5000,
];

export const monthlyRevenue = [
  35000, 38000, 41000, 39000, 45000, 47000,
  43000, 48000, 49000, 50000, 52000, 55000
];

export const occupancyData = {
  occupied: 145,
  available: 55
};

export const paymentStatusData = {
  paid: 60,
  partial: 20,
  unpaid: 20,
};

export const upcomingCheckins = [
  { id: "BKG001", guest: "Alice Smith", room: 101, type: "Check-in", time: "14:00", status: "Confirmed" },
  { id: "BKG002", guest: "Bob Johnson", room: 203, type: "Check-out", time: "11:00", status: "Completed" },
  { id: "BKG003", guest: "Charlie Brown", room: 305, type: "Check-in", time: "15:00", status: "Pending" },
];

export const outstandingPayments = [
  { invoice: "INV001", guest: "Charlie Brown", room: 305, amount: 250, due: "2025-01-15", status: "Partial" },
  { invoice: "INV002", guest: "Eve Adams", room: 201, amount: 75.50, due: "2024-12-31", status: "Unpaid" },
  { invoice: "INV003", guest: "Frank White", room: 103, amount: 120, due: "2025-01-10", status: "Unpaid" },
];
