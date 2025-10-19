
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./app.css";

/* ---------------- Authentication Context ---------------- */
import { AuthProvider } from "./context/AuthContext.jsx";
import { Suspense, lazy } from 'react';

/* ---------------- Main Website Pages ---------------- */
import Home from "./Pages/Home.jsx";
import Client from "./Pages/Client.jsx";
import Distributor from "./Pages/Distributor.jsx";
import ClientDashboard from "./Pages/ClientDashboard.jsx";
import AgentDashboard from "./Pages/AgentDashboard.jsx";
import KycForm from "./components/Home/clientkyc.jsx";
import ForgotPassword from "./Pages/forgotpassword.jsx";
import About from "./Pages/About.jsx";
import ProductBasket from "./Pages/ProductBasket.jsx";
import EmpLogin from "./Pages/EmpLogin.jsx";
import EmployeeDashboard from "./Pages/EmployeeDashboard.jsx";
import DsaLogin from "./components/dsalogin.jsx";
import DsaSignup from "./components/dsasignup.jsx";
import DSASystemDemo from "./components/DSASystemDemo.jsx";
import CallCentreLogin from "./Pages/CallCentreLogin.jsx";
import CallCentre from "./Pages/CallCentre.jsx";

/* ---------------- Layout Components ---------------- */
import WebsiteLayout from "./components/Layout/WebsiteLayout.jsx";


/* ---------------- Insurance Pages ---------------- */
import AllInsurance from "./componets/Insurance/AllInsurance.jsx";
import Health from "./componets/Insurance/Health.jsx";
import Endowment from "./componets/Insurance/Endowment.jsx";
import Termform from "./componets/Insurance/Termform.jsx";
import Travel from "./componets/Insurance/Travel.jsx";
import ULIP from "./componets/Insurance/ULIP.jsx";
import Vehicle from "./componets/Insurance/Vehicle.jsx";

/* ---------------- Financial Tools & Calculators ---------------- */
import SIPCalculator from "./components/FinancialTools/SIPCalculator.jsx";
import EMICalculator from "./components/FinancialTools/EMICalculator.jsx";
import HomeLoanCalculator from "./components/FinancialTools/HomeLoanCalculator.jsx";
import PersonalLoanCalculator from "./components/FinancialTools/PersonalLoanCalculator.jsx";

/* ---------------- Financial Products Pages ---------------- */
import CreditCardPage from "./components/FinancialTools/CreditCardPage.jsx";
import CreditScorePage from "./components/FinancialTools/CreditScorePage.jsx";
import LoanPage from "./components/FinancialTools/LoanPage.jsx";
import LoanDetailsPage from "./components/FinancialTools/LoanDetailsPage.jsx";
import LoanEligibilityForm from "./components/FinancialTools/LoanEligibilityForm.jsx";
import CreditCardApplicationForm from "./components/FinancialTools/CreditCardApplicationForm.jsx";
import FDInterestRatesPage from "./components/FinancialTools/FDInterestRatesPage.jsx";
import MutualFundsPage from "./components/FinancialTools/MutualFundsPage.jsx";
import GoldRatePage from "./components/FinancialTools/GoldRatePage.jsx";

/* ---------------- Admin Dashboard Pages ---------------- */
// Lazy load admin components for better performance
const AdminLogin = lazy(() => import('./Pages/admin/AdminLogin.jsx'));
const AdminDashboardLayout = lazy(() => import('./components/AdminDashboard/Layout/AdminDashboardLayout.jsx'));
const AdminDashboard = lazy(() => import('./Pages/admin/AdminDashboard.jsx'));
const AdminProfile = lazy(() => import('./components/AdminDashboard/AdminProfile.jsx'));
const AdminManagement = lazy(() => import('./components/AdminDashboard/AdminManagement.jsx'));
const ManageClients = lazy(() => import('./components/AdminDashboard/ManageClients.jsx'));
const ManageAgents = lazy(() => import('./components/AdminDashboard/ManageAgents.jsx'));
const ManageDSA = lazy(() => import('./components/AdminDashboard/ManageDSA.jsx'));
const LeadsManagement = lazy(() => import('./components/AdminDashboard/LeadsManagement.jsx'));
const Notification = lazy(() => import('./components/AdminDashboard/Notification.jsx'));
const Services = lazy(() => import('./components/AdminDashboard/Services.jsx'));
const ManageLoanApplications = lazy(() => import('./components/AdminDashboard/ManageLoanApplications.jsx'));
const LoanAudit = lazy(() => import('./components/AdminDashboard/LoanAudit.jsx'));
const Employee = lazy(() => import('./components/AdminDashboard/Employee.jsx'));
const SalaryManagement = lazy(() => import('./components/AdminDashboard/SalaryManagement.jsx'));
const Commissions = lazy(() => import('./components/AdminDashboard/Commissions.jsx'));

// Loading component for admin routes
const AdminLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading admin panel...</p>
    </div>
  </div>
);

/* ---------------- 404 Page ---------------- */
function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-5">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">This page could not be found!</p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Homepage
      </a>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Home Route - has its own navbar */}
          <Route path="/" element={<Home />} />
          
          {/* Login/Auth Routes - no navbar needed */}
          <Route path="/client-login" element={<Client />} />
          <Route path="/employee/login" element={<EmpLogin />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/dsa-login" element={<DsaLogin />} />
          <Route path="/dsa-signup" element={<DsaSignup />} />
          <Route path="/dsa-demo" element={<DSASystemDemo />} />
          <Route path="/call-centre-login" element={<CallCentreLogin />} />
          <Route path="/call-centre" element={<CallCentre />} />
          <Route path="/distributor" element={<Distributor />} />
          <Route path="/dashboard/*" element={<ClientDashboard />} />
          <Route path="/agent/*" element={<AgentDashboard />} />
          <Route path="/client-kyc" element={<KycForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Website Pages with Navbar Layout */}
          <Route element={<WebsiteLayout />}>
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<ProductBasket />} />
            
            {/* Insurance Routes */}
            <Route path="/AllInsurance" element={<AllInsurance />} />
            <Route path="/endowment" element={<Endowment />} />
            <Route path="/health" element={<Health />} />
            <Route path="/termform" element={<Termform />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/ulip" element={<ULIP />} />
            <Route path="/vehicle" element={<Vehicle />} />

            {/* Financial Tools & Calculators Routes */}
            <Route path="/calculators/sip" element={<SIPCalculator />} />
            <Route path="/calculators/emi" element={<EMICalculator />} />
            <Route path="/calculators/home-loan-emi" element={<HomeLoanCalculator />} />
            <Route path="/calculators/personal-loan" element={<PersonalLoanCalculator />} />
            <Route path="/sip-calculator" element={<SIPCalculator />} />
            <Route path="/cibil-score" element={<CreditScorePage />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/home-loan-calculator" element={<HomeLoanCalculator />} />
            <Route path="/personal-loan-calculator" element={<PersonalLoanCalculator />} />

            {/* Financial Products Routes */}
            <Route path="/credit-cards" element={<CreditCardPage />} />
            <Route path="/credit-score" element={<CreditScorePage />} />
            <Route path="/loans" element={<LoanPage />} />
            <Route path="/loans/details" element={<LoanDetailsPage />} />
            <Route path="/loans/eligibility" element={<LoanEligibilityForm />} />
            <Route path="/credit-cards/apply" element={<CreditCardApplicationForm />} />
            <Route path="/investment/fixed-deposits" element={<FDInterestRatesPage />} />
            <Route path="/investment/mutual-funds" element={<MutualFundsPage />} />
            <Route path="/gold-rate" element={<GoldRatePage />} />
            <Route path="/mutual-funds" element={<MutualFundsPage />} />
            <Route path="/insurance" element={<AllInsurance />} />
          </Route>

          {/* Admin Routes - Lazy loaded for better performance */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={
            <Suspense fallback={<AdminLoading />}>
              <AdminLogin />
            </Suspense>
          } />
          <Route path="/admin/dashboard" element={
            <Suspense fallback={<AdminLoading />}>
              <AdminDashboardLayout />
            </Suspense>
          }>
            <Route index element={
              <Suspense fallback={<AdminLoading />}>
                <AdminDashboard />
              </Suspense>
            } />
            <Route path="profile-settings" element={
              <Suspense fallback={<AdminLoading />}>
                <AdminProfile />
              </Suspense>
            } />
            <Route path="management" element={
              <Suspense fallback={<AdminLoading />}>
                <AdminManagement />
              </Suspense>
            } />
            <Route path="manage-clients" element={
              <Suspense fallback={<AdminLoading />}>
                <ManageClients />
              </Suspense>
            } />
            <Route path="manage-agents" element={
              <Suspense fallback={<AdminLoading />}>
                <ManageAgents />
              </Suspense>
            } />
            <Route path="manage-dsa" element={
              <Suspense fallback={<AdminLoading />}>
                <ManageDSA />
              </Suspense>
            } />
            <Route path="leads-management" element={
              <Suspense fallback={<AdminLoading />}>
                <LeadsManagement />
              </Suspense>
            } />
            <Route path="notifications" element={
              <Suspense fallback={<AdminLoading />}>
                <Notification />
              </Suspense>
            } />
            <Route path="services" element={
              <Suspense fallback={<AdminLoading />}>
                <Services />
              </Suspense>
            } />
            <Route path="loan-applications" element={
              <Suspense fallback={<AdminLoading />}>
                <ManageLoanApplications />
              </Suspense>
            } />
            <Route path="loan-audit" element={
              <Suspense fallback={<AdminLoading />}>
                <LoanAudit />
              </Suspense>
            } />
            <Route path="employees" element={
              <Suspense fallback={<AdminLoading />}>
                <Employee />
              </Suspense>
            } />
            <Route path="salary-management" element={
              <Suspense fallback={<AdminLoading />}>
                <SalaryManagement />
              </Suspense>
            } />
            <Route path="commissions" element={
              <Suspense fallback={<AdminLoading />}>
                <Commissions />
              </Suspense>
            } />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Toast Notifications */}
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </Router>
  );
}
