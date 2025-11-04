import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiUpload, FiX, FiUser, FiMapPin, FiFileText, FiCheck } from 'react-icons/fi';

const DSAApplicationForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    candidateName: '',
    age: '',
    location: {
      address: '',
      city: '',
      state: '',
      pincode: ''
    },
    phone: '',
    email: '',
    panNumber: '',
    aadharNumber: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: 'Single',
    // Additional KYC Details
    nomineeDetails: {
      name: '',
      relationship: '',
      phone: '',
      aadharNumber: '',
      address: ''
    },
    familyDetails: {
      fatherName: '',
      motherName: '',
      spouseName: '',
      children: []
    },
    // Financial Information
    annualIncome: '',
    occupation: '',
    employerName: '',
    employerAddress: '',
    // Compliance Information
    criminalRecord: false,
    bankruptcyHistory: false,
    politicalExposure: false,
    // Banking Information
    bankDetails: {
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountType: 'Savings',
      branchName: '',
      branchAddress: ''
    },
    // Emergency Contact
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      address: ''
    },
    // Professional Information
    workExperience: [],
    education: [],
    // Additional Information
    skills: [],
    languages: [],
    certifications: [],
    documents: {
      panDocument: null,
      aadharDocument: null,
      addressProof: null,
      bankStatement: null,
      photo: null,
      otherDocuments: []
    }
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (e, documentType) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only PDF, JPG, JPEG, and PNG files are allowed');
        return;
      }

      // In a real application, you would upload the file to a cloud storage service
      // For now, we'll simulate the upload with a mock URL
      const mockUrl = URL.createObjectURL(file);
      
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [documentType]: mockUrl
        }
      }));

      setUploadedFiles(prev => ({
        ...prev,
        [documentType]: file.name
      }));

      // Clear error for this document type
      if (errors[documentType]) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors[documentType];
          return newErrors;
        });
      }

      toast.success(`✓ ${file.name} uploaded successfully`);
    }
  };

  const removeFile = (documentType) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: null
      }
    }));

    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: null
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic Information Validation
    if (!formData.candidateName) {
      newErrors.candidateName = 'Candidate name is required';
    }

    if (!formData.age || formData.age < 18 || formData.age > 65) {
      newErrors.age = 'Age must be between 18 and 65';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    // Location Validation
    if (!formData.location.address) {
      newErrors['location.address'] = 'Address is required';
    }

    if (!formData.location.city) {
      newErrors['location.city'] = 'City is required';
    }

    if (!formData.location.state) {
      newErrors['location.state'] = 'State is required';
    }

    if (!formData.location.pincode) {
      newErrors['location.pincode'] = 'Pincode is required';
    }

    // Contact Validation
    if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Valid 10-digit phone number is required';
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    // Identity Document Validation
    if (!formData.panNumber || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
      newErrors.panNumber = 'Valid PAN number is required (e.g., ABCDE1234F)';
    }

    if (!formData.aadharNumber || !/^[0-9]{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = 'Valid 12-digit Aadhar number is required';
    }

    // Financial Information Validation
    if (!formData.annualIncome || formData.annualIncome < 0) {
      newErrors.annualIncome = 'Valid annual income is required';
    }

    if (!formData.occupation) {
      newErrors.occupation = 'Occupation is required';
    }

    // Banking Information Validation
    if (!formData.bankDetails.bankName) {
      newErrors['bankDetails.bankName'] = 'Bank name is required';
    }

    if (!formData.bankDetails.accountNumber) {
      newErrors['bankDetails.accountNumber'] = 'Account number is required';
    }

    if (!formData.bankDetails.ifscCode) {
      newErrors['bankDetails.ifscCode'] = 'IFSC code is required';
    }

    // Emergency Contact Validation
    if (!formData.emergencyContact.name) {
      newErrors['emergencyContact.name'] = 'Emergency contact name is required';
    }

    if (!formData.emergencyContact.phone || !/^[0-9]{10}$/.test(formData.emergencyContact.phone)) {
      newErrors['emergencyContact.phone'] = 'Valid emergency contact phone is required';
    }

    // Document Validation
    if (!formData.documents.panDocument) {
      newErrors.panDocument = 'PAN document is required';
    }

    if (!formData.documents.aadharDocument) {
      newErrors.aadharDocument = 'Aadhar document is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Show specific error messages
      const errorMessages = Object.entries(errors).map(([field, message]) => {
        const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/\./g, ' - ');
        return `${fieldName}: ${message}`;
      });
      
      toast.error(
        <div>
          <p className="font-bold">Please fix the following errors:</p>
          <ul className="list-disc pl-5 mt-2">
            {errorMessages.slice(0, 3).map((msg, idx) => (
              <li key={idx} className="text-sm">{msg}</li>
            ))}
            {errorMessages.length > 3 && (
              <li className="text-sm">...and {errorMessages.length - 3} more</li>
            )}
          </ul>
        </div>,
        { duration: 6000 }
      );
      
      // Scroll to first error
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5050/api/dsa-applications/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.candidateName,
          phone: formData.phone,
          email: formData.email,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          maritalStatus: formData.maritalStatus,
          panNumber: formData.panNumber.toUpperCase(),
          aadharNumber: formData.aadharNumber,
          permanentAddress: formData.location,
          currentAddress: formData.location, // Same as permanent for now
          bankDetails: formData.bankDetails,
          emergencyContact: formData.emergencyContact,
          workExperience: formData.workExperience,
          education: formData.education,
          skills: formData.skills,
          languages: formData.languages,
          certifications: formData.certifications,
          nomineeDetails: formData.nomineeDetails,
          familyDetails: formData.familyDetails,
          annualIncome: parseFloat(formData.annualIncome) || 0,
          occupation: formData.occupation,
          employerName: formData.employerName,
          employerAddress: formData.employerAddress,
          criminalRecord: formData.criminalRecord,
          bankruptcyHistory: formData.bankruptcyHistory,
          politicalExposure: formData.politicalExposure
        })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('DSA application submitted successfully!');
        onSuccess && onSuccess(result);
        onClose();
      } else {
        toast.error(result.message || 'Failed to submit DSA application');
      }
    } catch (error) {
      console.error('Error submitting DSA application:', error);
      toast.error('Error submitting DSA application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiUser className="w-5 h-5" />
              Submit DSA Application
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            <span className="text-red-500">*</span> indicates required fields. Please fill all required information before submitting.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-red-800 font-semibold mb-2 flex items-center gap-2">
                <FiX className="w-5 h-5" />
                {Object.keys(errors).length} Error{Object.keys(errors).length > 1 ? 's' : ''} Found
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(errors).slice(0, 5).map(([field, message]) => (
                  <li key={field} className="text-sm text-red-700">
                    <span className="font-medium">{field.replace(/([A-Z])/g, ' $1').replace(/\./g, ' > ')}:</span> {message}
                  </li>
                ))}
                {Object.keys(errors).length > 5 && (
                  <li className="text-sm text-red-700 font-medium">
                    + {Object.keys(errors).length - 5} more errors below
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Candidate Name *
              </label>
              <input
                type="text"
                name="candidateName"
                value={formData.candidateName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.candidateName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter full name"
              />
              {errors.candidateName && (
                <p className="text-red-500 text-xs mt-1">{errors.candidateName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="65"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter age"
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
              )}
            </div>
          </div>

          {/* Location Information */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center gap-2">
              <FiMapPin className="w-4 h-4" />
              Location Details *
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors['location.address'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter complete address"
                />
                {errors['location.address'] && (
                  <p className="text-red-500 text-xs mt-1">{errors['location.address']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors['location.city'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter city"
                />
                {errors['location.city'] && (
                  <p className="text-red-500 text-xs mt-1">{errors['location.city']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors['location.state'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter state"
                />
                {errors['location.state'] && (
                  <p className="text-red-500 text-xs mt-1">{errors['location.state']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="location.pincode"
                  value={formData.location.pincode}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors['location.pincode'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter pincode"
                />
                {errors['location.pincode'] && (
                  <p className="text-red-500 text-xs mt-1">{errors['location.pincode']}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="10-digit phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 mb-3">Personal Information *</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Identity Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PAN Number *
              </label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.panNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="ABCDE1234F"
                style={{ textTransform: 'uppercase' }}
              />
              {errors.panNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.panNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aadhar Number *
              </label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.aadharNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="12-digit Aadhar number"
              />
              {errors.aadharNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.aadharNumber}</p>
              )}
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 mb-3">Financial Information *</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Income (₹) *
                </label>
                <input
                  type="number"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.annualIncome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter annual income"
                />
                {errors.annualIncome && (
                  <p className="text-red-500 text-xs mt-1">{errors.annualIncome}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation *
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.occupation ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter occupation"
                />
                {errors.occupation && (
                  <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employer Name
                </label>
                <input
                  type="text"
                  name="employerName"
                  value={formData.employerName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  placeholder="Enter employer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employer Address
                </label>
                <input
                  type="text"
                  name="employerAddress"
                  value={formData.employerAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  placeholder="Enter employer address"
                />
              </div>
            </div>
          </div>

          {/* Banking Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 mb-3">Banking Information *</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name *
                </label>
                <input
                  type="text"
                  name="bankDetails.bankName"
                  value={formData.bankDetails.bankName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors['bankDetails.bankName'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter bank name"
                />
                {errors['bankDetails.bankName'] && (
                  <p className="text-red-500 text-xs mt-1">{errors['bankDetails.bankName']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number *
                </label>
                <input
                  type="text"
                  name="bankDetails.accountNumber"
                  value={formData.bankDetails.accountNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors['bankDetails.accountNumber'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter account number"
                />
                {errors['bankDetails.accountNumber'] && (
                  <p className="text-red-500 text-xs mt-1">{errors['bankDetails.accountNumber']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IFSC Code *
                </label>
                <input
                  type="text"
                  name="bankDetails.ifscCode"
                  value={formData.bankDetails.ifscCode}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors['bankDetails.ifscCode'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter IFSC code"
                  style={{ textTransform: 'uppercase' }}
                />
                {errors['bankDetails.ifscCode'] && (
                  <p className="text-red-500 text-xs mt-1">{errors['bankDetails.ifscCode']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <select
                  name="bankDetails.accountType"
                  value={formData.bankDetails.accountType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                >
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                  <option value="Salary">Salary</option>
                </select>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 mb-3">Emergency Contact *</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name *
                </label>
                <input
                  type="text"
                  name="emergencyContact.name"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors['emergencyContact.name'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter emergency contact name"
                />
                {errors['emergencyContact.name'] && (
                  <p className="text-red-500 text-xs mt-1">{errors['emergencyContact.name']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  placeholder="Enter relationship"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="emergencyContact.phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors['emergencyContact.phone'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="10-digit phone number"
                />
                {errors['emergencyContact.phone'] && (
                  <p className="text-red-500 text-xs mt-1">{errors['emergencyContact.phone']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="emergencyContact.address"
                  value={formData.emergencyContact.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  placeholder="Enter address"
                />
              </div>
            </div>
          </div>

          {/* Family & Nominee Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 mb-3">Family & Nominee Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name
                </label>
                <input
                  type="text"
                  name="familyDetails.fatherName"
                  value={formData.familyDetails.fatherName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  placeholder="Enter father's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mother's Name
                </label>
                <input
                  type="text"
                  name="familyDetails.motherName"
                  value={formData.familyDetails.motherName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  placeholder="Enter mother's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spouse's Name
                </label>
                <input
                  type="text"
                  name="familyDetails.spouseName"
                  value={formData.familyDetails.spouseName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  placeholder="Enter spouse's name"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h5 className="text-sm font-medium text-gray-800 mb-3">Nominee Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nominee Name
                  </label>
                  <input
                    type="text"
                    name="nomineeDetails.name"
                    value={formData.nomineeDetails.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    placeholder="Enter nominee name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship
                  </label>
                  <select
                    name="nomineeDetails.relationship"
                    value={formData.nomineeDetails.relationship}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  >
                    <option value="">Select Relationship</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nominee Phone
                  </label>
                  <input
                    type="tel"
                    name="nomineeDetails.phone"
                    value={formData.nomineeDetails.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    placeholder="10-digit phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nominee Aadhar
                  </label>
                  <input
                    type="text"
                    name="nomineeDetails.aadharNumber"
                    value={formData.nomineeDetails.aadharNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    placeholder="12-digit Aadhar number"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Declaration */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="text-md font-medium text-gray-900 mb-3">Compliance Declaration</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="criminalRecord"
                  checked={formData.criminalRecord}
                  onChange={(e) => setFormData({...formData, criminalRecord: e.target.checked})}
                  className="mt-1 mr-2 h-4 w-4"
                />
                <label className="text-sm text-gray-700">
                  I declare that I have a criminal record (Check if applicable)
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="bankruptcyHistory"
                  checked={formData.bankruptcyHistory}
                  onChange={(e) => setFormData({...formData, bankruptcyHistory: e.target.checked})}
                  className="mt-1 mr-2 h-4 w-4"
                />
                <label className="text-sm text-gray-700">
                  I declare that I have a bankruptcy history (Check if applicable)
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="politicalExposure"
                  checked={formData.politicalExposure}
                  onChange={(e) => setFormData({...formData, politicalExposure: e.target.checked})}
                  className="mt-1 mr-2 h-4 w-4"
                />
                <label className="text-sm text-gray-700">
                  I am a politically exposed person (PEP) (Check if applicable)
                </label>
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center gap-2">
              <FiFileText className="w-4 h-4" />
              Document Upload
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PAN Document */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PAN Document *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'panDocument')}
                    className="hidden"
                    id="panDocument"
                  />
                  <label
                    htmlFor="panDocument"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FiUpload className="w-4 h-4" />
                    {uploadedFiles.panDocument || 'Upload PAN Document'}
                  </label>
                  {uploadedFiles.panDocument && (
                    <button
                      type="button"
                      onClick={() => removeFile('panDocument')}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                      title="Remove file"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {errors.panDocument && (
                  <p className="text-red-500 text-xs mt-1">{errors.panDocument}</p>
                )}
              </div>

              {/* Aadhar Document */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhar Document *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'aadharDocument')}
                    className="hidden"
                    id="aadharDocument"
                  />
                  <label
                    htmlFor="aadharDocument"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FiUpload className="w-4 h-4" />
                    {uploadedFiles.aadharDocument || 'Upload Aadhar Document'}
                  </label>
                  {uploadedFiles.aadharDocument && (
                    <button
                      type="button"
                      onClick={() => removeFile('aadharDocument')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {errors.aadharDocument && (
                  <p className="text-red-500 text-xs mt-1">{errors.aadharDocument}</p>
                )}
              </div>

              {/* Address Proof */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Proof (Optional)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'addressProof')}
                    className="hidden"
                    id="addressProof"
                  />
                  <label
                    htmlFor="addressProof"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FiUpload className="w-4 h-4" />
                    {uploadedFiles.addressProof || 'Upload Address Proof'}
                  </label>
                  {uploadedFiles.addressProof && (
                    <button
                      type="button"
                      onClick={() => removeFile('addressProof')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Bank Statement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Statement (Optional)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'bankStatement')}
                    className="hidden"
                    id="bankStatement"
                  />
                  <label
                    htmlFor="bankStatement"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FiUpload className="w-4 h-4" />
                    {uploadedFiles.bankStatement || 'Upload Bank Statement'}
                  </label>
                  {uploadedFiles.bankStatement && (
                    <button
                      type="button"
                      onClick={() => removeFile('bankStatement')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DSAApplicationForm;
