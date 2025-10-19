import React, { useState } from 'react';
import { FiUser, FiPhone, FiMail, FiMapPin, FiDollarSign, FiFileText, FiCreditCard } from 'react-icons/fi';

export default function LoanApplicationForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    // Basic loan information
    applicantName: '',
    bankName: '',
    loanType: '',
    loanAmount: '',
    appliedDate: new Date().toISOString().split('T')[0],
    branchName: '',
    
    // Applicant personal details
    applicantPhone: '',
    applicantEmail: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    
    // Banking details
    accountNumber: '',
    ifscCode: '',
    panCard: '',
    aadharNumber: '',
    
    // Additional details
    monthlyIncome: '',
    employmentType: '',
    companyName: '',
    remarks: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const loanTypes = [
    'Personal Loan',
    'Home Loan',
    'Car Loan',
    'Business Loan',
    'Education Loan',
    'Gold Loan',
    'Other'
  ];

  const employmentTypes = [
    'Salaried',
    'Self-Employed',
    'Business',
    'Retired',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.applicantName.trim()) newErrors.applicantName = 'Applicant name is required';
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (!formData.loanType) newErrors.loanType = 'Loan type is required';
    if (!formData.loanAmount || formData.loanAmount <= 0) newErrors.loanAmount = 'Valid loan amount is required';
    if (!formData.branchName.trim()) newErrors.branchName = 'Branch name is required';
    
    // Contact validation
    if (!formData.applicantPhone.trim()) {
      newErrors.applicantPhone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.applicantPhone)) {
      newErrors.applicantPhone = 'Invalid phone number (10 digits required)';
    }
    
    if (!formData.applicantEmail.trim()) {
      newErrors.applicantEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.applicantEmail)) {
      newErrors.applicantEmail = 'Invalid email format';
    }
    
    // Address validation
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Invalid pincode (6 digits required)';
    }
    
    // Banking details validation
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
      newErrors.ifscCode = 'Invalid IFSC code format';
    }
    
    if (!formData.panCard.trim()) {
      newErrors.panCard = 'PAN card is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard.toUpperCase())) {
      newErrors.panCard = 'Invalid PAN format (e.g., ABCDE1234F)';
    }
    
    if (!formData.aadharNumber.trim()) {
      newErrors.aadharNumber = 'Aadhar number is required';
    } else if (!/^[0-9]{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = 'Invalid Aadhar (12 digits required)';
    }
    
    // Additional details validation
    if (!formData.monthlyIncome || formData.monthlyIncome <= 0) {
      newErrors.monthlyIncome = 'Valid monthly income is required';
    }
    if (!formData.employmentType) newErrors.employmentType = 'Employment type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://wittywealth.org/api/loan-applications/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          applicantName: formData.applicantName,
          bankName: formData.bankName,
          loanType: formData.loanType,
          loanAmount: parseFloat(formData.loanAmount),
          appliedDate: formData.appliedDate,
          branchName: formData.branchName,
          applicantPhone: formData.applicantPhone,
          applicantEmail: formData.applicantEmail,
          applicantAddress: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: 'India'
          },
          accountNumber: formData.accountNumber,
          ifscCode: formData.ifscCode.toUpperCase(),
          panCard: formData.panCard.toUpperCase(),
          aadharNumber: formData.aadharNumber,
          monthlyIncome: parseFloat(formData.monthlyIncome),
          employmentType: formData.employmentType,
          companyName: formData.companyName,
          remarks: formData.remarks
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Loan application submitted successfully for ${data.applicantName}!`);
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      } else {
        alert(data.message || 'Failed to submit loan application');
      }
    } catch (error) {
      console.error('Submit loan application error:', error);
      alert('Failed to submit loan application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-2xl font-bold">New Loan Application</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Loan Information Section */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <FiFileText className="mr-2" /> Loan Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.bankName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g., State Bank of India"
                />
                {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="branchName"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.branchName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g., Connaught Place"
                />
                {errors.branchName && <p className="text-red-500 text-xs mt-1">{errors.branchName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="loanType"
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.loanType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Loan Type</option>
                  {loanTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.loanType && <p className="text-red-500 text-xs mt-1">{errors.loanType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Amount (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="loanAmount"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.loanAmount ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g., 500000"
                  min="1"
                />
                {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="appliedDate"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Applicant Personal Details Section */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <FiUser className="mr-2" /> Applicant Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="applicantName"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.applicantName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter full name"
                />
                {errors.applicantName && <p className="text-red-500 text-xs mt-1">{errors.applicantName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="applicantPhone"
                  name="applicantPhone"
                  value={formData.applicantPhone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.applicantPhone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                />
                {errors.applicantPhone && <p className="text-red-500 text-xs mt-1">{errors.applicantPhone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="applicantEmail"
                  name="applicantEmail"
                  value={formData.applicantEmail}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.applicantEmail ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="email@example.com"
                />
                {errors.applicantEmail && <p className="text-red-500 text-xs mt-1">{errors.applicantEmail}</p>}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
              <FiMapPin className="mr-2" /> Address Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="House no., Street, Area"
                />
                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="City"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="State"
                />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="6-digit pincode"
                  maxLength="6"
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Banking Details Section */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
              <FiCreditCard className="mr-2" /> Banking & KYC Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Bank account number"
                />
                {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IFSC Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.ifscCode ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g., SBIN0001234"
                  maxLength="11"
                />
                {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PAN Card <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="panCard"
                  name="panCard"
                  value={formData.panCard}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.panCard ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g., ABCDE1234F"
                  maxLength="10"
                />
                {errors.panCard && <p className="text-red-500 text-xs mt-1">{errors.panCard}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="aadharNumber"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.aadharNumber ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="12-digit Aadhar number"
                  maxLength="12"
                />
                {errors.aadharNumber && <p className="text-red-500 text-xs mt-1">{errors.aadharNumber}</p>}
              </div>
            </div>
          </div>

          {/* Employment Details Section */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center">
              <FiDollarSign className="mr-2" /> Employment & Income Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.employmentType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Employment Type</option>
                  {employmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Income (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="monthlyIncome"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.monthlyIncome ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g., 50000"
                  min="1"
                />
                {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name (if applicable)
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company/Business name"
                />
              </div>
            </div>
          </div>

          {/* Remarks Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Remarks (Optional)
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any additional information or notes..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
