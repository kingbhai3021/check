import React, { useState, useEffect } from 'react';
import { FiEye, FiClock, FiCheck, FiX, FiUser, FiPhone, FiMail, FiCalendar, FiRefreshCw } from 'react-icons/fi';

const API_BASE_URL = "/api/dsa-applications";

export default function MyDSAApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch applications submitted by the current BDE
  const fetchMyApplications = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Get current user ID from token (this would be handled by the backend)
      const response = await fetch(`${API_BASE_URL}/bde/me`, {
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setApplications(result.applications || []);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch your applications');
      }
    } catch (error) {
      console.error('Fetch applications error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FiClock className="text-yellow-600" />;
      case 'Approved': return <FiCheck className="text-green-600" />;
      case 'Rejected': return <FiX className="text-red-600" />;
      default: return <FiClock className="text-gray-600" />;
    }
  };

  const ApplicationDetailsModal = ({ application, onClose }) => {
    if (!application) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FiUser className="text-blue-600" />
              DSA Application Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status */}
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(application.status)}`}>
                {getStatusIcon(application.status)}
                {application.status}
              </span>
              <span className="text-sm text-gray-600">
                Submitted: {formatDate(application.createdAt)}
              </span>
            </div>

            {/* Basic Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{application.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900 flex items-center gap-1">
                    <FiPhone size={16} />
                    {application.phone}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900 flex items-center gap-1">
                    <FiMail size={16} />
                    {application.email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <p className="text-gray-900 flex items-center gap-1">
                    <FiCalendar size={16} />
                    {new Date(application.dateOfBirth).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <p className="text-gray-900">{application.gender}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                  <p className="text-gray-900">{application.maritalStatus}</p>
                </div>
              </div>
            </div>

            {/* Identity Documents */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Identity Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">PAN Number</label>
                  <p className="text-gray-900">{application.panNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
                  <p className="text-gray-900">{application.aadharNumber}</p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h3>
              
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-700 mb-2">Permanent Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <p className="text-gray-900">{application.permanentAddress?.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <p className="text-gray-900">{application.permanentAddress?.city}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <p className="text-gray-900">{application.permanentAddress?.state}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pincode</label>
                    <p className="text-gray-900">{application.permanentAddress?.pincode}</p>
                  </div>
                </div>
              </div>

              {application.currentAddress?.address && (
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-2">Current Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <p className="text-gray-900">{application.currentAddress.address}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <p className="text-gray-900">{application.currentAddress.city}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <p className="text-gray-900">{application.currentAddress.state}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Pincode</label>
                      <p className="text-gray-900">{application.currentAddress.pincode}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Banking Information */}
            {application.bankDetails?.bankName && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Banking Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                    <p className="text-gray-900">{application.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Number</label>
                    <p className="text-gray-900">{application.bankDetails.accountNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                    <p className="text-gray-900">{application.bankDetails.ifscCode}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Type</label>
                    <p className="text-gray-900">{application.bankDetails.accountType}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            {application.emergencyContact?.name && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                    <p className="text-gray-900">{application.emergencyContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Relationship</label>
                    <p className="text-gray-900">{application.emergencyContact.relationship}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <p className="text-gray-900 flex items-center gap-1">
                      <FiPhone size={16} />
                      {application.emergencyContact.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Application Status Details */}
            {application.status === 'Approved' && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Application Approved</h3>
                <p className="text-green-700">
                  This DSA application has been approved and the DSA user account has been created.
                </p>
                {application.generatedDSAId && (
                  <div className="mt-2">
                    <p className="text-sm text-green-600">
                      Generated DSA ID: <span className="font-mono font-bold">{application.generatedDSAId}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {application.status === 'Rejected' && application.rejectionReason && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Application Rejected</h3>
                <p className="text-red-700">{application.rejectionReason}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My DSA Applications</h1>
        <button
          onClick={fetchMyApplications}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Applications List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-12">
          <FiUser className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications submitted</h3>
          <p className="text-gray-500">You haven't submitted any DSA applications yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
                    Submitted Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FiUser className="h-5 w-5 text-blue-600" />
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
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <FiPhone size={14} />
                        {application.phone}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <FiMail size={14} />
                        {application.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(application.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 w-fit ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <FiEye />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {showDetails && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => {
            setShowDetails(false);
            setSelectedApplication(null);
          }}
        />
      )}
    </div>
  );
}

