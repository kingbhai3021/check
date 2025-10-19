import React from "react";
import { Card, CardContent } from "../../assets/animations/card";
import { TrendingUp, Wallet, CalendarCheck, BarChart3 } from "lucide-react";
import CountUp from "react-countup";
import FundPerformanceChart from "../ClientDashboard/Charts/FundPerformanceChart";
import AssetAllocationChart from "../ClientDashboard/Charts/AssetAllocationChart";

// Utility component for stat values
const StatValue = ({ label, value }) => {
  const isCurrency = !label.includes("SIP") && !label.includes("Funds");
  return isCurrency ? (
    <>
      ₹<CountUp end={value} duration={1.5} separator="," />
    </>
  ) : (
    <CountUp end={value} duration={1.2} />
  );
};

const DashboardHome = () => {
  const stats = [
    {
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
      label: "Current Value",
      value: 1234567,
    },
    {
      icon: <Wallet className="h-6 w-6 text-blue-500" />,
      label: "Invested Amount",
      value: 1000000,
    },
    {
      icon: <CalendarCheck className="h-6 w-6 text-purple-500" />,
      label: "SIP Count",
      value: 5,
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-yellow-500" />,
      label: "Total Funds",
      value: 8,
    },
  ];

  return (
    <div className="w-full space-y-10 px-4 md:px-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-4">
              {stat.icon}
              <div className="text-center md:text-left">
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <h2 className="text-lg font-semibold text-gray-900">
                  <StatValue label={stat.label} value={stat.value} />
                </h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Asset Allocation Chart */}
      <div className="mt-8">
        <h2 className="text-base md:text-lg font-semibold mb-2 text-center md:text-left">
          Asset Allocation
        </h2>
        <div className="w-full overflow-x-auto">
          <AssetAllocationChart />
        </div>
      </div>

      {/* Fund Performance Chart */}
      <div className="mt-8">
        <h2 className="text-base md:text-lg font-semibold mb-2 text-center md:text-left">
          Fund Performance
        </h2>
        <div className="w-full overflow-x-auto">
          <FundPerformanceChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
