import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimes, FaEye, FaClock, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaBuilding, FaDollarSign } from "react-icons/fa";
import { toast } from "react-hot-toast";
import api from "../../services/api";

export default function ManageDSA() {
  console.log('ManageDSA component rendering...');
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [dsaCredentials, setDsaCredentials] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [rejectionReason, setRejectionReason] = useState('');

  // Fetch DSA applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching DSA applications...');
      const response = await api.get('/dsa-applications');
      console.log('DSA applications response:', response);
      
      // Handle different response formats
      const apps = response.data?.applications || response.applications || response.data || response || [];
      console.log('Extracted applications:', apps);
      setApplications(apps);
      
      if (apps.length === 0) {
        console.warn('No DSA applications found');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to fetch DSA applications';
      setError(errorMsg);
      toast.error(errorMsg);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Approve DSA application
  const approveApplication = async (applicationId) => {
    try {
      console.log('Approving application:', applicationId);
      const response = await api.post(`/dsa-applications/${applicationId}/approve`);
      console.log('Approval response:', response);
      
      // Show credentials modal
      if (response.data?.credentials || response.credentials) {
        const creds = response.data?.credentials || response.credentials;
        const dsaName = response.data?.dsa?.name || response.dsa?.name || 'DSA User';
        setDsaCredentials({
          name: dsaName,
          username: creds.username,
          password: creds.password
        });
        setShowCredentialsModal(true);
      }
      
      toast.success('DSA application approved successfully!');
      fetchApplications(); // Refresh the list
      setShowDetails(false);
    } catch (error) {
      console.error('Error approving application:', error);
      toast.error(error.response?.data?.message || 'Failed to approve application');
    }
  };

  // Reject DSA application
  const rejectApplication = async (applicationId) => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    try {
      console.log('Rejecting application:', applicationId, 'Reason:', rejectionReason);
      await api.post(`/dsa-applications/${applicationId}/reject`, {
        rejectionReason: rejectionReason
      });
      toast.success('DSA application rejected successfully');
      setRejectionReason('');
      setShowDetails(false);
      setShowRejectModal(false);
      setSelectedApplication(null);
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting application:', error);
      toast.error(error.response?.data?.message || 'Failed to reject application');
    }
  };

  // View application details
  const viewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetails(true);
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status?.toLowerCase() === filter.toLowerCase();
  });

  // Debug: Log application statuses
  console.log('Applications:', applications.map(app => ({ name: app.name, status: app.status })));

  // Get status badge
  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    const statusConfig = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', icon: FaClock, text: 'Pending' },
      'approved': { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, text: 'Approved' },
      'rejected': { color: 'bg-red-100 text-red-800', icon: FaTimes, text: 'Rejected' }
    };
    
    const config = statusConfig[statusLower] || statusConfig['pending'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </span>
    );
  };

  if (loading) {
  return (
    <div className="p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">DSA Applications Management</h2>
          <button
          onClick={fetchApplications}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
          Refresh
          </button>
        </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'all', label: 'All Applications', count: applications.length },
          { key: 'pending', label: 'Pending', count: applications.filter(app => app.status === 'pending').length },
          { key: 'approved', label: 'Approved', count: applications.filter(app => app.status === 'approved').length },
          { key: 'rejected', label: 'Rejected', count: applications.filter(app => app.status === 'rejected').length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <FaUser className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'No DSA applications have been submitted yet.' 
                : `No ${filter} applications found.`
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
            </tr>
          </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FaUser className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {application.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.panNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-2">
                        <FaPhone className="w-3 h-3 text-gray-400" />
                        {application.phone}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <FaEnvelope className="w-3 h-3 text-gray-400" />
                        {application.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.submittedByBDE?.name || application.submittedBy?.name || 'Unknown BDE'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(application.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.createdAt).toLocaleDateString()}
                </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => viewDetails(application)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors flex items-center gap-1"
                          title="View Details"
                        >
                          <FaEye className="w-3 h-3" />
                          <span className="text-xs">View</span>
                        </button>
                        {application.status?.toLowerCase() === 'pending' && (
                          <>
                            <button
                              onClick={() => approveApplication(application._id)}
                              className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded-md transition-colors flex items-center gap-1"
                              title="Approve DSA"
                            >
                              <FaCheckCircle className="w-3 h-3" />
                              <span className="text-xs font-medium">Accept</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowRejectModal(true);
                              }}
                              className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors flex items-center gap-1"
                              title="Reject DSA"
                            >
                              <FaTimes className="w-3 h-3" />
                              <span className="text-xs font-medium">Reject</span>
                            </button>
                          </>
                        )}
                      </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        )}
      </div>

      {/* Application Details Modal */}
      {showDetails && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  DSA Application Details
                </h3>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedApplication(null);
                    setRejectionReason('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FaUser className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Name:</span>
                      <span>{selectedApplication.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPhone className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Phone:</span>
                      <span>{selectedApplication.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Email:</span>
                      <span>{selectedApplication.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaIdCard className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">PAN:</span>
                      <span>{selectedApplication.panNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaIdCard className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Aadhar:</span>
                      <span>{selectedApplication.aadharNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Address:</span>
                      <span>{selectedApplication.address}, {selectedApplication.city}, {selectedApplication.state} - {selectedApplication.pincode}</span>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Financial Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FaDollarSign className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Annual Income:</span>
                      <span>₹{selectedApplication.annualIncome?.toLocaleString() || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBuilding className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Occupation:</span>
                      <span>{selectedApplication.occupation || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBuilding className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Employer:</span>
                      <span>{selectedApplication.employerName || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              {selectedApplication.bankDetails && (
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Bank Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Bank Name:</span>
                      <span className="ml-2">{selectedApplication.bankDetails.bankName}</span>
                    </div>
                    <div>
                      <span className="font-medium">Account Number:</span>
                      <span className="ml-2">{selectedApplication.bankDetails.accountNumber}</span>
                    </div>
                    <div>
                      <span className="font-medium">IFSC Code:</span>
                      <span className="ml-2">{selectedApplication.bankDetails.ifscCode}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Rejection Reason (if rejected) */}
              {selectedApplication.status === 'rejected' && selectedApplication.rejectionReason && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="text-lg font-medium text-red-800 mb-2">Rejection Reason</h4>
                  <p className="text-red-700">{selectedApplication.rejectionReason}</p>
                </div>
              )}

              {/* Action Buttons */}
              {selectedApplication.status === 'pending' && (
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => approveApplication(selectedApplication._id)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <FaCheckCircle className="w-4 h-4" />
                    Approve Application
                  </button>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Reason for rejection..."
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <button
                      onClick={() => rejectApplication(selectedApplication._id)}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <FaTimes className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DSA Credentials Modal */}
      {showCredentialsModal && dsaCredentials && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <FaCheckCircle className="w-5 h-5" />
                DSA Approved Successfully!
              </h3>
              <button
                onClick={() => {
                  setShowCredentialsModal(false);
                  setDsaCredentials(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-800 mb-2">
                <strong>{dsaCredentials.name}</strong> has been approved as a DSA.
              </p>
              <p className="text-xs text-green-700">
                Login credentials have been generated and sent via SMS.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  DSA Username (DSA ID)
                </label>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded border border-gray-300">
                  <code className="text-sm font-mono text-gray-900">{dsaCredentials.username}</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(dsaCredentials.username);
                      toast.success('Username copied!');
                    }}
                    className="text-blue-600 hover:text-blue-700 text-xs ml-2"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Temporary Password
                </label>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded border border-gray-300">
                  <code className="text-sm font-mono text-gray-900">{dsaCredentials.password}</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(dsaCredentials.password);
                      toast.success('Password copied!');
                    }}
                    className="text-blue-600 hover:text-blue-700 text-xs ml-2"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> Please share these credentials with the employee who onboarded this DSA. 
                The DSA must change the password on first login.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowCredentialsModal(false);
                  setDsaCredentials(null);
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Reject DSA Application</h3>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                  setSelectedApplication(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                You are about to reject the DSA application for:
              </p>
              <p className="font-medium text-gray-900">{selectedApplication.name}</p>
              <p className="text-sm text-gray-500">{selectedApplication.email}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a reason for rejection..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                  setSelectedApplication(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  rejectApplication(selectedApplication._id);
                  setShowRejectModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <FaTimes className="w-4 h-4" />
                Reject Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}