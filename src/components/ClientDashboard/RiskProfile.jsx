// wittyfrontend2\src\components\ClientDashboard\RiskProfile.jsx
import { Card, CardContent } from "../../assets/animations/card";
import { Gauge } from "lucide-react";

export default function RiskProfile() {
  const riskLevel = "Moderate";
  const riskScore = 6; // out of 10

  const getRiskColor = () => {
    if (riskScore <= 3) return "text-blue-600";
    if (riskScore <= 7) return "text-yellow-600";
    return "text-red-600";
  };

  const getRiskLabel = () => {
    if (riskScore <= 3) return "Conservative";
    if (riskScore <= 7) return "Moderate";
    return "Aggressive";
  };

  return (
    <div className="space-y-6">
      {/* Risk Gauge Card */}
      <Card className="shadow-md">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Gauge className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Your Risk Level</p>
            <h2 className={`text-xl sm:text-2xl font-bold ${getRiskColor()}`}>{getRiskLabel()}</h2>
            <p className="text-gray-400 text-sm mt-1">Risk Score: {riskScore}/10</p>
          </div>
        </CardContent>
      </Card>

      {/* Risk Summary Card */}
      <Card className="shadow-md">
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">Risk Profile Summary</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
            <li>You are comfortable with moderate market fluctuations.</li>
            <li>You aim for balanced growth and capital preservation.</li>
            <li>Investment horizon: Medium to Long Term (5–10 years).</li>
            <li>Suitable for hybrid or balanced fund strategies.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
