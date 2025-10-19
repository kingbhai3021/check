import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AgentDashboardLayout from "../components/AgentDashboard/Layout/AgentDashboardLayout";

// Lazy-load all feature components
const DashboardHome = lazy(() => import("../components/AgentDashboard/DashboardHome"));
const ClientManagement = lazy(() => import("../components/AgentDashboard/ClientManagement"));
const MutualFundPurchase = lazy(() => import("../components/AgentDashboard/MutualFundPurchase"));
const SIPSetup = lazy(() => import("../components/AgentDashboard/SIPSetup"));
const TransactionHistory = lazy(() => import("../components/AgentDashboard/TransactionHistory"));
const LeadManagement = lazy(() => import("../components/AgentDashboard/LeadManagement"));
const ReferralAndCommission = lazy(() => import("../components/AgentDashboard/ReferralAndCommission"));
const ReportsAndDownloads = lazy(() => import("../components/AgentDashboard/ReportsAndDownloads"));
const KYCUpload = lazy(() => import("../components/AgentDashboard/KYCUpload"));
const AgentProfile = lazy(() => import("../components/AgentDashboard/AgentProfile"));
const Notifications = lazy(() => import("../components/AgentDashboard/Notifications"));


const AgentDashboard = () => {
  return (
    <AgentDashboardLayout>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
            Loading Dashboard...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="clients" element={<ClientManagement />} />
          <Route path="purchase" element={<MutualFundPurchase />} />
          <Route path="sip" element={<SIPSetup />} />
          <Route path="transactions" element={<TransactionHistory />} />
          <Route path="leads" element={<LeadManagement />} />
          <Route path="commission" element={<ReferralAndCommission />} />
          <Route path="reports" element={<ReportsAndDownloads />} />
          <Route path="kyc" element={<KYCUpload />} />
          <Route path="profile" element={<AgentProfile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="BuySellSIP"/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AgentDashboardLayout>
  );
};

export default AgentDashboard;
