import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiUser, FiPhone, FiMail, FiMapPin, FiFileText, FiCreditCard, FiCheck, FiX, FiEye, FiTrendingUp } from 'react-icons/fi';

export default function ManageLoanApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      console.log('Fetching loan applications for admin...');
      const response = await fetch('http://localhost:5050/api/loan-applications/admin', {
        credentials: 'include',
      });

      console.log('Admin loan apps response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched admin loan applications:', data);
        setApplications(data.applications || []);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch loan applications:', response.status, errorText);
      }
    } catch (error) {
      console.error('Fetch loan applications error:', error);
    } finally {
      setLoading(false);
    }
  };

  const reviewApplication = async (applicationId, status, remarks = '') => {
    try {
      const response = await fetch(`http://localhost:5050/api/loan-applications/admin-review/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status, remarks }),
      });

      if (response.ok) {
        alert(`Application ${status.toLowerCase()} successfully!`);
        fetchApplications();
        setShowDetails(false);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to update application');
      }
    } catch (error) {
      console.error('Review application error:', error);
      alert('Failed to review application');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Submitted': 'bg-blue-100 text-blue-800',
      'Under Review': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Disbursed': 'bg-purple-100 text-purple-800',
      'Forwarded to Admin': 'bg-indigo-100 text-indigo-800',
      'Admin Approved': 'bg-emerald-100 text-emerald-800',
      'Admin Rejected': 'bg-rose-100 text-rose-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Loan Applications for Review</h2>
          <p className="text-sm text-gray-600 mt-1">Review and approve loan applications forwarded by employees</p>
        </div>
        <button
          onClick={fetchApplications}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-600 font-medium">Pending Review</p>
              <p className="text-2xl font-bold text-indigo-900">
                {applications.filter(a => a.status === 'Forwarded to Admin').length}
              </p>
            </div>
            <FiTrendingUp className="text-3xl text-indigo-600" />
          </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 font-medium">Admin Approved</p>
              <p className="text-2xl font-bold text-emerald-900">
                {applications.filter(a => a.status === 'Admin Approved').length}
              </p>
            </div>
            <FiCheck className="text-3xl text-emerald-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Disbursed</p>
              <p className="text-2xl font-bold text-purple-900">
                {applications.filter(a => a.status === 'Disbursed').length}
              </p>
            </div>
            <FiDollarSign className="text-3xl text-purple-600" />
          </div>
        </div>

        <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-rose-600 font-medium">Rejected</p>
              <p className="text-2xl font-bold text-rose-900">
                {applications.filter(a => a.status === 'Admin Rejected').length}
              </p>
            </div>
            <FiX className="text-3xl text-rose-600" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap space-x-2 border-b">
        {['all', 'Forwarded to Admin', 'Admin Approved', 'Admin Rejected', 'Disbursed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 font-medium transition ${
              filter === status
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            {status === 'all' ? 'All' : status}
            {status === 'all' 
              ? ` (${applications.length})`
              : ` (${applications.filter(a => a.status === status).length})`
            }
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-600">No loan applications found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredApplications.map((application) => (
            <div
              key={application._id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold text-gray-800">{application.applicantName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Loan Type</p>
                      <p className="font-semibold text-gray-800">{application.loanType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Loan Amount</p>
                      <p className="font-semibold text-gray-800">₹{application.loanAmount?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Bank</p>
                      <p className="font-semibold text-gray-800">{application.bankName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Submitted By DSA</p>
                      <p className="font-semibold text-gray-800">{application.dsaName}</p>
                      <p className="text-xs text-gray-500">{application.dsaId}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Forwarded By</p>
                      <p className="font-semibold text-gray-800">{application.employeeName}</p>
                      <p className="text-xs text-gray-500">{application.employeeId}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiPhone className="mr-1" />
                      {application.applicantPhone}
                    </div>
                    <div className="flex items-center">
                      <FiMail className="mr-1" />
                      {application.applicantEmail}
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    Forwarded on: {new Date(application.forwardedAt || application.appliedDate).toLocaleDateString()}
                    {application.remarks && (
                      <span className="ml-4">• Remarks: {application.remarks}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => {
                      setSelectedApplication(application);
                      setShowDetails(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                  >
                    <FiEye className="mr-2" /> View Details
                  </button>
                  
                  {application.status === 'Forwarded to Admin' && (
                    <>
                      <button
                        onClick={() => {
                          const remarks = prompt('Enter approval remarks (optional):');
                          reviewApplication(application._id, 'Admin Approved', remarks || '');
                        }}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center"
                      >
                        <FiCheck className="mr-2" /> Approve
                      </button>
                      <button
                        onClick={() => {
                          const remarks = prompt('Enter rejection reason:');
                          if (remarks) reviewApplication(application._id, 'Admin Rejected', remarks);
                        }}
                        className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition flex items-center"
                      >
                        <FiX className="mr-2" /> Reject
                      </button>
                    </>
                  )}

                  {application.status === 'Admin Approved' && (
                    <button
                      onClick={() => {
                        if (confirm('Mark this application as disbursed?')) {
                          reviewApplication(application._id, 'Disbursed', 'Loan disbursed successfully');
                        }
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center"
                    >
                      <FiDollarSign className="mr-2" /> Mark Disbursed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-2xl font-bold">Loan Application Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-white hover:text-gray-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadge(selectedApplication.status)}`}>
                  {selectedApplication.status}
                </span>
                <div className="text-sm text-gray-600">
                  <p>Forwarded: {new Date(selectedApplication.forwardedAt || selectedApplication.appliedDate).toLocaleDateString()}</p>
                  <p>Applied: {new Date(selectedApplication.appliedDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Loan Information */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                  <FiFileText className="mr-2" /> Loan Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Bank Name</p>
                    <p className="font-semibold">{selectedApplication.bankName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Branch</p>
                    <p className="font-semibold">{selectedApplication.branchName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Loan Type</p>
                    <p className="font-semibold">{selectedApplication.loanType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Loan Amount</p>
                    <p className="font-semibold">₹{selectedApplication.loanAmount?.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Applicant Details */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                  <FiUser className="mr-2" /> Applicant Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Full Name</p>
                    <p className="font-semibold">{selectedApplication.applicantName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-semibold">{selectedApplication.applicantPhone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-semibold">{selectedApplication.applicantEmail}</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                  <FiMapPin className="mr-2" /> Address
                </h3>
                <p className="text-sm">
                  {selectedApplication.applicantAddress?.street}, {selectedApplication.applicantAddress?.city},{' '}
                  {selectedApplication.applicantAddress?.state} - {selectedApplication.applicantAddress?.pincode}
                </p>
              </div>

              {/* Banking Details */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                  <FiCreditCard className="mr-2" /> Banking & KYC Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Account Number</p>
                    <p className="font-semibold">{selectedApplication.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">IFSC Code</p>
                    <p className="font-semibold">{selectedApplication.ifscCode}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">PAN Card</p>
                    <p className="font-semibold">{selectedApplication.panCard}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Aadhar Number</p>
                    <p className="font-semibold">{selectedApplication.aadharNumber}</p>
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-800 mb-3 flex items-center">
                  <FiDollarSign className="mr-2" /> Employment & Income
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Employment Type</p>
                    <p className="font-semibold">{selectedApplication.employmentType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Monthly Income</p>
                    <p className="font-semibold">₹{selectedApplication.monthlyIncome?.toLocaleString()}</p>
                  </div>
                  {selectedApplication.companyName && (
                    <div>
                      <p className="text-gray-600">Company Name</p>
                      <p className="font-semibold">{selectedApplication.companyName}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* DSA & Employee Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Submission Info</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Submitted By DSA</p>
                    <p className="font-semibold">{selectedApplication.dsaName}</p>
                    <p className="text-xs text-gray-500">{selectedApplication.dsaId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Forwarded By Employee</p>
                    <p className="font-semibold">{selectedApplication.employeeName}</p>
                    <p className="text-xs text-gray-500">{selectedApplication.employeeId}</p>
                  </div>
                </div>
              </div>

              {selectedApplication.remarks && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Remarks</h3>
                  <p className="text-sm text-gray-700">{selectedApplication.remarks}</p>
                </div>
              )}

              {/* Action Buttons */}
              {selectedApplication.status === 'Forwarded to Admin' && (
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    onClick={() => {
                      const remarks = prompt('Enter rejection reason:');
                      if (remarks) reviewApplication(selectedApplication._id, 'Admin Rejected', remarks);
                    }}
                    className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
                  >
                    Reject Application
                  </button>
                  <button
                    onClick={() => {
                      const remarks = prompt('Enter approval remarks (optional):');
                      reviewApplication(selectedApplication._id, 'Admin Approved', remarks || '');
                    }}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    Approve Application
                  </button>
                </div>
              )}

              {selectedApplication.status === 'Admin Approved' && (
                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={() => {
                      if (confirm('Mark this application as disbursed?')) {
                        reviewApplication(selectedApplication._id, 'Disbursed', 'Loan disbursed successfully');
                      }
                    }}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Mark as Disbursed
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
