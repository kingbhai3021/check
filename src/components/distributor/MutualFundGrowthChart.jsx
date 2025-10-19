import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

const rawData = [
  { year: '2002', value: 1.1 },
  { year: '2007', value: 3.26 },
  { year: '2012', value: 5.87 },
  { year: '2015', value: 12.11 },
  { year: '2018', value: 21.36 },
  { year: '2021', value: 32.17 },
  { year: '2024', value: 67.09 },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 rounded shadow text-sm">
        <p className="font-semibold">Year: {label}</p>
        <p>AUM: ₹{payload[0].value} Lakh Cr</p>
      </div>
    );
  }
  return null;
};

const MutualFundGrowthChart = () => {
  const [data, setData] = useState([]);

  // Animate bar addition one-by-one
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < rawData.length) {
        setData((prev) => [...prev, rawData[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 uppercase tracking-wide">
            Mutual Fund
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] mt-2 mb-4">
            Industry Growth Story
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            The Indian Mutual Fund Industry AUM has grown from{' '}
            <strong>₹1 Lakh Crore</strong> in March 2002 to{' '}
            <strong>₹67.09 Lakh Crore</strong> in Sep 2024 —
            a growth of over 67 times.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8">
            <div className="bg-[var(--primary-color)] text-white text-center py-6 rounded-md shadow-md">
              <p className="font-medium">Mutual Fund AUM</p>
              <p className="text-2xl font-bold mt-2">₹67.09</p>
              <p className="font-medium">Lakh Crore</p>
            </div>
            <div className="bg-[var(--primary-color)] text-white text-center py-6 rounded-md shadow-md">
              <p className="font-medium">Mutual Fund Investor Accounts</p>
              <p className="text-2xl font-bold mt-2">21.05</p>
              <p className="font-medium">Crore</p>
            </div>
            <div className="bg-[var(--primary-color)] text-white text-center py-6 rounded-md shadow-md">
              <p className="font-medium">SIP Accounts</p>
              <p className="text-2xl font-bold mt-2">9.87</p>
              <p className="font-medium">Crore</p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-[var(--primary-color)] text-white text-center text-sm mt-6 py-2 px-4 rounded">
            Mutual Fund AUM has Grown 5.54 Times in 9 Years with 20.97% Annual Growth
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Source: AMFI (As on Sep. 2024)
          </p>
        </div>

        {/* RIGHT SIDE: CHART */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              aria-label="Mutual Fund AUM Growth from 2002 to 2024"
            >
              <title>Mutual Fund AUM Growth Chart</title>
              <desc>Bar chart showing Mutual Fund AUM growth from 2002 to 2024</desc>

              <XAxis dataKey="year" />
              <YAxis
                label={{
                  value: 'MF AUM (in Lakh Cr)',
                  angle: -90,
                  position: 'insideLeft',
                  style: {
                    textAnchor: 'middle',
                    fill: '#333',
                    fontSize: 12,
                  },
                }}
              />
              <Tooltip content={<CustomTooltip />} />

              <Bar
                dataKey="value"
                fill="var(--primary-color)"
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
                animationDuration={800}
              >
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={(val) => `₹${val}`}
                  style={{
                    fill: 'var(--primary-color)',
                    fontWeight: 'bold',
                    fontSize: '12px',
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default MutualFundGrowthChart;
