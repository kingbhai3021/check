import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../assets/animations/card";

const data = [
  { name: "Week 1", Equity: 100000, Debt: 95000 },
  { name: "Week 2", Equity: 102000, Debt: 97000 },
  { name: "Week 3", Equity: 104500, Debt: 99000 },
  { name: "Week 4", Equity: 107000, Debt: 101000 },
];

const FundPerformanceChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fund Performance (Last 1 Month)</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              label={{
                value: "Amount (₹)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
              }}
            />
            <Tooltip
              formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
              labelStyle={{ fontWeight: "bold" }}
              contentStyle={{ borderRadius: "8px", borderColor: "#e0e0e0" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="Equity"
              stroke="#2F54EB"
              strokeWidth={2}
              dot
              activeDot={{ r: 6 }}
              animationDuration={800}
            />
            <Line
              type="monotone"
              dataKey="Debt"
              stroke="#13C2C2"
              strokeWidth={2}
              dot
              activeDot={{ r: 6 }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FundPerformanceChart;
