import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar.jsx";

export default function ViewKYC() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ KYC data will be passed using location.state from ManageDSA
  const kycData = location.state?.kycData;

  if (!kycData) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-2xl font-bold text-gray-700">No KYC Data Found</h1>
          <p className="text-gray-500 mt-2">Please submit the KYC first.</p>
          <button
            onClick={() => navigate("/manage-dsa")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Manage DSA
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center">
            DSA KYC Details (ID: {id})
          </h1>
          <div className="space-y-3 text-gray-700">
            <p><strong>Full Name:</strong> {kycData.fullName}</p>
            <p><strong>Date of Birth:</strong> {kycData.dob}</p>
            <p><strong>PAN Number:</strong> {kycData.panNumber}</p>
            <p><strong>Aadhaar Number:</strong> {kycData.aadhaarNumber}</p>
            <p><strong>Address:</strong> {kycData.address}</p>
          </div>
          <button
            onClick={() => navigate("/manage-dsa")}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Back to Manage DSA
          </button>
        </div>
      </main>
    </div>
  );
}
