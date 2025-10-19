import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaUsers,
  FaWallet,
  FaMoneyBillWave,
  FaChartLine,
  FaPlus,
  FaShoppingCart,
  FaCalendarAlt,
  FaFileAlt,
} from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { api } from "../../services/api";
import LoanApplicationForm from "../LoanApplicationForm";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Chart Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 p-4 text-center">
          Error rendering chart. Please refresh or try again.
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

const DashboardHome = () => {
  const [kpis, setKpis] = useState({
    totalClients: 0,
    totalAUM: "₹0",
    commission: "₹0",
    activeSIPs: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLoanForm, setShowLoanForm] = useState(false);

  useEffect(() => {
    const fetchKpis = async () => {
      setIsLoading(true);
      try {
        const data = await api.getDashboardData(); // Replace with real API
        setKpis(data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchKpis();
  }, []);

  const commissionChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Commission (₹)",
        data: [10000, 15000, 12000, 18000, 20000, 22000],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const assetChartData = {
    labels: ["Equity", "Debt", "Hybrid"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
  };

  return (
    <div className="p-4 sm:p-6 space-y-8">
      {error && <div className="text-red-600 text-center">{error}</div>}

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center text-gray-500">Loading KPIs...</div>
        ) : (
          <>
            <KPI title="Total Clients" value={kpis.totalClients} icon={<FaUsers />} ariaLabel="Total Clients" />
            <KPI title="Total AUM" value={kpis.totalAUM} icon={<FaWallet />} ariaLabel="Total Assets Under Management" />
            <KPI title="Commission This Month" value={kpis.commission} icon={<FaMoneyBillWave />} ariaLabel="Monthly Commission" />
            <KPI title="Active SIPs" value={kpis.activeSIPs} icon={<FaChartLine />} ariaLabel="Active Systematic Investment Plans" />
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <div className="bg-white rounded-xl shadow p-4 h-64">
            <Line
              data={commissionChartData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { display: true, text: "Commission Trend" },
                },
                scales: {
                  y: { beginAtZero: true, ticks: { callback: (v) => `₹${v}` } },
                },
              }}
              aria-label="Commission Trend Chart"
            />
          </div>
        </ErrorBoundary>

        <ErrorBoundary>
          <div className="bg-white rounded-xl shadow p-4 h-64">
            <Pie
              data={assetChartData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { display: true, text: "Asset Allocation" },
                },
              }}
              aria-label="Asset Allocation Chart"
            />
          </div>
        </ErrorBoundary>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <QuickAction label="Add Client" icon={<FaPlus />} ariaLabel="Add a new client" />
          <QuickAction label="Buy Mutual Fund" icon={<FaShoppingCart />} ariaLabel="Buy mutual fund" />
          <QuickAction label="Setup SIP" icon={<FaCalendarAlt />} ariaLabel="Setup SIP" />
          <button
            onClick={() => setShowLoanForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            aria-label="Add loan application"
          >
            <FaFileAlt />
            <span>Add Loan Application</span>
          </button>
        </div>
      </div>

      {/* Loan Application Form Modal */}
      {showLoanForm && (
        <LoanApplicationForm
          onClose={() => setShowLoanForm(false)}
          onSuccess={() => {
            setShowLoanForm(false);
            // Optionally refresh data or show success message
          }}
        />
      )}
    </div>
  );
};

const KPI = ({ title, value, icon, ariaLabel }) => (
  <div
    className="bg-white rounded-xl shadow p-4 flex items-center gap-4"
    aria-label={ariaLabel}
  >
    <div className="text-2xl text-blue-600">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const QuickAction = ({ label, icon, ariaLabel }) => (
  <button
    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    aria-label={ariaLabel}
  >
    {icon}
    <span>{label}</span>
  </button>
);

KPI.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

QuickAction.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

DashboardHome.propTypes = {};

export default DashboardHome;
