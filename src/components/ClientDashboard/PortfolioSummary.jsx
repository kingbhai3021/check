import { Card, CardContent } from "../../assets/animations/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { IndianRupee, LineChart, PieChart as PieIcon } from "lucide-react";

const fundData = [
  { name: "Axis Bluechip", invested: 300000, value: 330000 },
  { name: "ICICI Value Discovery", invested: 200000, value: 210000 },
  { name: "HDFC Balanced Adv.", invested: 150000, value: 165000 },
];

const totalInvested = fundData.reduce((sum, f) => sum + f.invested, 0);
const totalValue = fundData.reduce((sum, f) => sum + f.value, 0);
const totalReturn = totalValue - totalInvested;
const returnPercent = ((totalReturn / totalInvested) * 100).toFixed(2);

export default function PortfolioSummary() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <Card className="shadow-md">
          <CardContent className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
            <IndianRupee className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8" />
            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Total Invested</p>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                ₹{totalInvested.toLocaleString()}
              </h2>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
            <LineChart className="text-green-600 w-6 h-6 sm:w-8 sm:h-8" />
            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Current Value</p>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                ₹{totalValue.toLocaleString()}
              </h2>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
            <PieIcon className="text-purple-600 w-6 h-6 sm:w-8 sm:h-8" />
            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Total Returns</p>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                ₹{totalReturn.toLocaleString()} ({returnPercent}%)
              </h2>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card className="shadow-md">
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
            Fund-wise Current Value
          </h3>
          <div className="h-60 sm:h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={fundData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Bar dataKey="value" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
