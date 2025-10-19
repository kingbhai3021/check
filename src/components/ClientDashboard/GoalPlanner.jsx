import { Card, CardContent } from "../../assets/animations/card";
import { CircleDollarSign } from "lucide-react";

// Sample goal data
const goals = [
  {
    name: "Retirement Fund",
    target: 5000000,
    invested: 1750000,
    deadline: "2045",
  },
  {
    name: "Child's Education",
    target: 2000000,
    invested: 800000,
    deadline: "2035",
  },
  {
    name: "Buy a House",
    target: 3000000,
    invested: 1200000,
    deadline: "2030",
  },
];

// Currency formatter
const formatCurrency = (val) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);

// Calculate % progress
const getProgress = (invested, target) => {
  return Math.min(Math.round((invested / target) * 100), 100);
};

export default function GoalPlanner() {
  return (
    <div className="space-y-6 px-4 md:px-0">
      {goals.map((goal, index) => {
        const progress = getProgress(goal.invested, goal.target);
        return (
          <Card
            key={index}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-4 sm:p-6 space-y-3">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <CircleDollarSign className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {goal.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Target Year: {goal.deadline}
                  </p>
                </div>
              </div>

              {/* Goal details */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>🎯 Target Amount: {formatCurrency(goal.target)}</p>
                <p>💰 Invested So Far: {formatCurrency(goal.invested)}</p>
                <p>
                  📈 Progress:{" "}
                  <span className="font-medium text-blue-700">
                    {progress}%
                  </span>
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-2.5 transition-[width] duration-700 ease-in-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
