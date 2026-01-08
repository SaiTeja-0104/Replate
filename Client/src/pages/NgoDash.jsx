import { useContext, useEffect, useState, useMemo } from "react";
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
import { NgoContext } from "../context/NgoContext";

// Helper to format month-year
const formatMonthYear = (date) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" });
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
    months.push({ key: `${month} ${year}`, month: `${month} ${year}`, supply: 0 });
  }

  return months;
};

const NgoDash = () => {
  const { getRequestSupply } = useContext(NgoContext);
  const [requestSupply, setRequestSupply] = useState([]);

  const fetch = async () => {
    const data = await getRequestSupply();
    setRequestSupply(data || []);
  };

  useEffect(() => {
    fetch();
  }, []);

  // Stats
  const totalSupply = requestSupply.filter((d) => d.status === "approved").length;
  const mealsReceived =
    requestSupply
      .filter((d) => d.status === "approved")
      .reduce((sum, d) => sum + (d.quantity || 0), 0) || 0;
  const pendingDeliveries = requestSupply.filter((d) => d.status === "pending").length;

  // Monthly aggregation
  const monthlyData = useMemo(() => {
    const baseMonths = getLast12Months();
    const map = {};

    requestSupply?.forEach((req) => {
      if (!req.createdAt || req.status !== "approved") return;
      const key = formatMonthYear(req.createdAt);
      if (!map[key]) map[key] = 0;
      map[key] += req.quantity || 0;
    });

    return baseMonths.map((m) => ({
      ...m,
      supply: map[m.key] || 0,
    }));
  }, [requestSupply]);

  const latestMonth = monthlyData[monthlyData.length - 1];

  return (
    <div className="bg-[#F4FDF0] font-pop py-8 px-6 sm:px-3">
      {/* Dashboard Header */}
      <div className="text-3xl mb-2">
        <p className="font-bold sm:pl-8 text-gray-800">NGO's Dashboard</p>
      </div>

      <div className="flex flex-col gap-5 pt-5">
        {/* Top Cards */}
        <div className="flex sm:px-13 flex-col lg:flex-row gap-4">
          <DashCard title="Total Supply" count={totalSupply} img={3} />
          <DashCard title="Meals Received" count={mealsReceived} img={4} />
          <DashCard title="Pending Deliveries" count={pendingDeliveries} img={5} />
        </div>

        {/* Chart */}
        <div className="overflow-hidden">
          <h2 className="text-xl sm:text-2xl pt-6 font-semibold text-center">
            Monthly Supply Overview (Last 12 Months)
          </h2>
          <div className="product-scroll overflow-x-auto">
            <div className="min-w-[600px] max-w-full h-[440px] text-sm">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Area
                    type="monotone"
                    dataKey="supply"
                    stroke="#81C784"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorSupply)"
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

export default NgoDash;