import DashCard from "../components/DashCard";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useContext, useMemo } from "react";
import { DonorContext } from "../context/DonorContext";

// Helper to format month-year
const formatMonthYear = (date) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" }); // Jan, Feb...
  const year = d.getFullYear();
  return `${month} ${year}`;
};

// Generate last 12 months rolling window
const getLast12Months = () => {
  const months = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = d.toLocaleString("default", { month: "short" });
    const year = d.getFullYear();
    months.push({ key: `${month} ${year}`, month: `${month} ${year}`, donations: 0 });
  }

  return months;
};

const DonorDash = () => {
  const { donationData } = useContext(DonorContext);

  // Aggregate donations into last 12 months
  const monthlyData = useMemo(() => {
    const baseMonths = getLast12Months();
    const map = {};

    donationData?.forEach((donation) => {
      if (!donation.createdAt) return;
      const key = formatMonthYear(donation.createdAt);
      if (!map[key]) map[key] = 0;
      map[key] += donation.quantity || 0;
    });

    // Fill base months with donation counts
    return baseMonths.map((m) => ({
      ...m,
      donations: map[m.key] || 0,
    }));
  }, [donationData]);

  // Stats
  const totalDonations = donationData?.length || 0;
  const mealsServed =
    donationData?.reduce(
      (total, donation) =>
        total + (donation.quantity - donation.availableQuantity || 0),
      0
    ) || 0;
  const pendingPickups =
    donationData?.filter((donation) => donation.status === "Active").length || 0;

  const latestMonth = monthlyData[monthlyData.length - 1];

  return (
    <div className="bg-[#fffdf7] font-pop py-8 px-6">
      {/* Dashboard Header */}
      <div className="text-3xl mb-2">
        <p className="font-bold sm:pl-8 text-gray-800">Donor's Dashboard</p>
      </div>

      <div className="flex flex-col gap-5 pt-5">
        {/* Top Cards */}
        <div className="flex sm:px-13 flex-col lg:flex-row gap-4">
          <DashCard title="Total Donations" count={totalDonations} img={0} />
          <DashCard title="Meals Served" count={mealsServed} img={1} />
          <DashCard title="Active Donations" count={pendingPickups} img={2} />
        </div>

        {/* Chart */}
        <div className="overflow-hidden">
          <h2 className="text-xl sm:text-2xl pt-6 font-semibold text-center">
            Monthly Donations Overview (Last 12 Months)
          </h2>
          <div className="product-scroll overflow-x-auto">
            <div className="min-w-[600px] max-w-full h-[440px] text-sm">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient
                      id="colorDonations"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#FFA500"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="#FFA500"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Area
                    type="monotone"
                    dataKey="donations"
                    stroke="#FFA500"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorDonations)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDash;