// src/components/AdminDashboard/Employee.jsx
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const API_BASE_URL = "/api/admin";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ 
    // Basic Information
    name: "", 
    phone: "", 
    email: "",
    // Personal Information
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    // Identity Documents
    panNumber: "",
    aadharNumber: "",
    // Address Information
    permanentAddress: {
      address: "",
      city: "",
      state: "",
      pincode: ""
    },
    currentAddress: {
      address: "",
      city: "",
      state: "",
      pincode: ""
    },
    // Banking Information
    bankDetails: {
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountType: "Savings",
      branchName: "",
      branchAddress: ""
    },
    // Emergency Contact
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      address: ""
    },
    // Professional Information
    department: "", 
    designation: "", 
    joiningDate: "",
    salary: "",
    // Additional Information
    skills: "",
    languages: "",
    isActive: true 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/all`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(data.employees || []);
      } else {
        setError('Failed to fetch employees');
      }
    } catch (err) {
      setError('Error fetching employees');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const openModal = (employee = null) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({ 
        // Basic Information
        name: employee.name || "", 
        phone: employee.phone || "", 
        email: employee.email || "",
        // Personal Information
        dateOfBirth: employee.employeeDetails?.dateOfBirth ? new Date(employee.employeeDetails.dateOfBirth).toISOString().split('T')[0] : "",
        gender: employee.employeeDetails?.gender || "",
        maritalStatus: employee.employeeDetails?.maritalStatus || "",
        // Identity Documents
        panNumber: employee.employeeDetails?.panNumber || "",
        aadharNumber: employee.employeeDetails?.aadharNumber || "",
        // Address Information
        permanentAddress: employee.employeeDetails?.permanentAddress || {
          address: "",
          city: "",
          state: "",
          pincode: ""
        },
        currentAddress: employee.employeeDetails?.currentAddress || {
          address: "",
          city: "",
          state: "",
          pincode: ""
        },
        // Banking Information
        bankDetails: employee.employeeDetails?.bankDetails || {
          bankName: "",
          accountNumber: "",
          ifscCode: "",
          accountType: "Savings",
          branchName: "",
          branchAddress: ""
        },
        // Emergency Contact
        emergencyContact: employee.employeeDetails?.emergencyContact || {
          name: "",
          relationship: "",
          phone: "",
          address: ""
        },
        // Professional Information
        department: employee.employeeDetails?.department || "", 
        designation: employee.employeeDetails?.designation || "", 
        joiningDate: employee.employeeDetails?.joiningDate ? new Date(employee.employeeDetails.joiningDate).toISOString().split('T')[0] : "",
        salary: employee.employeeDetails?.salary || "",
        // Additional Information
        skills: employee.employeeDetails?.skills?.join(", ") || "",
        languages: employee.employeeDetails?.languages?.join(", ") || "",
        isActive: employee.isActive !== false
      });
    } else {
      setEditingEmployee(null);
      setFormData({ 
        // Basic Information
        name: "", 
        phone: "", 
        email: "",
        // Personal Information
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        // Identity Documents
        panNumber: "",
        aadharNumber: "",
        // Address Information
        permanentAddress: {
          address: "",
          city: "",
          state: "",
          pincode: ""
        },
        currentAddress: {
          address: "",
          city: "",
          state: "",
          pincode: ""
        },
        // Banking Information
        bankDetails: {
          bankName: "",
          accountNumber: "",
          ifscCode: "",
          accountType: "Savings",
          branchName: "",
          branchAddress: ""
        },
        // Emergency Contact
        emergencyContact: {
          name: "",
          relationship: "",
          phone: "",
          address: ""
        },
        // Professional Information
        department: "", 
        designation: "", 
        joiningDate: "",
        salary: "",
        // Additional Information
        skills: "",
        languages: "",
        isActive: true 
      });
    }
    setIsModalOpen(true);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");

      // Validate required fields
      if (!formData.name || !formData.phone || !formData.email || !formData.panNumber || !formData.aadharNumber || !formData.department || !formData.designation) {
        setError('Please fill in all required fields: Name, Phone, Email, PAN, Aadhar, Department, Designation');
        return;
      }

      // Validate PAN format
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
        setError('Invalid PAN number format. Please enter a valid PAN (e.g., ABCDE1234F)');
        return;
      }

      // Validate Aadhar format
      if (!/^[0-9]{12}$/.test(formData.aadharNumber)) {
        setError('Invalid Aadhar number format. Please enter a valid 12-digit Aadhar number');
        return;
      }

      // Validate email format
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Invalid email format');
        return;
      }

      const employeeData = {
        // Basic Information
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        // Personal Information
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        // Identity Documents
        panNumber: formData.panNumber.toUpperCase(),
        aadharNumber: formData.aadharNumber,
        // Address Information
        permanentAddress: formData.permanentAddress,
        currentAddress: formData.currentAddress,
        // Banking Information
        bankDetails: formData.bankDetails,
        // Emergency Contact
        emergencyContact: formData.emergencyContact,
        // Professional Information
        department: formData.department,
        designation: formData.designation,
        joiningDate: formData.joiningDate,
        salary: formData.salary ? parseFloat(formData.salary) : 0,
        // Additional Information
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : [],
        languages: formData.languages ? formData.languages.split(',').map(s => s.trim()).filter(s => s) : []
      };

      const url = editingEmployee 
        ? `${API_BASE_URL}/${editingEmployee._id}`
        : `${API_BASE_URL}/create_employee`;
      
      const method = editingEmployee ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(employeeData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Employee saved successfully:', result);
        
        // Show success message with generated credentials
        if (!editingEmployee && result.username && result.password) {
          alert(`Employee created successfully!\n\nUsername: ${result.username}\nPassword: ${result.password}\n\nPlease share these credentials with the employee.`);
        }
        
        await fetchEmployees(); // Refresh the list
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save employee');
      }
    } catch (err) {
      setError('Error saving employee');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        
        if (response.ok) {
          await fetchEmployees(); // Refresh the list
        } else {
          setError('Failed to delete employee');
        }
      } catch (err) {
        setError('Error deleting employee');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h1 className="text-xl md:text-2xl font-semibold">Employees</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          <FiPlus /> Add Employee
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Salary</th>
              <th className="px-4 py-2 text-left">Employee ID</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  Loading employees...
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.phone}</td>
                  <td className="px-4 py-2">{emp.employeeDetails?.department || 'N/A'}</td>
                  <td className="px-4 py-2">{emp.employeeDetails?.designation || 'N/A'}</td>
                  <td className="px-4 py-2 max-w-xs truncate" title={emp.address || 'N/A'}>
                    {emp.address || 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {emp.employeeDetails?.salary ? `₹${emp.employeeDetails.salary.toLocaleString()}` : 'N/A'}
                  </td>
                  <td className="px-4 py-2">{emp.username || emp.employeeId || 'N/A'}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 text-xs md:text-sm rounded-full ${
                        emp.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => openModal(emp)}
                      className="inline-flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(emp._id)}
                      className="inline-flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
            {!loading && employees.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              {editingEmployee ? "Edit Employee" : "Add Employee"}
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Basic Information Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit phone number"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Identity Documents Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Identity Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number *</label>
                    <input
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      placeholder="ABCDE1234F"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      style={{ textTransform: 'uppercase' }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number *</label>
                    <input
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleChange}
                      placeholder="12-digit Aadhar number"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address Information Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-2">Permanent Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                          name="permanentAddress.address"
                          value={formData.permanentAddress.address}
                          onChange={handleChange}
                          placeholder="Enter complete address"
                          rows="2"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          name="permanentAddress.city"
                          value={formData.permanentAddress.city}
                          onChange={handleChange}
                          placeholder="Enter city"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          name="permanentAddress.state"
                          value={formData.permanentAddress.state}
                          onChange={handleChange}
                          placeholder="Enter state"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                        <input
                          name="permanentAddress.pincode"
                          value={formData.permanentAddress.pincode}
                          onChange={handleChange}
                          placeholder="Enter pincode"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-2">Current Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                          name="currentAddress.address"
                          value={formData.currentAddress.address}
                          onChange={handleChange}
                          placeholder="Enter complete address"
                          rows="2"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          name="currentAddress.city"
                          value={formData.currentAddress.city}
                          onChange={handleChange}
                          placeholder="Enter city"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          name="currentAddress.state"
                          value={formData.currentAddress.state}
                          onChange={handleChange}
                          placeholder="Enter state"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                        <input
                          name="currentAddress.pincode"
                          value={formData.currentAddress.pincode}
                          onChange={handleChange}
                          placeholder="Enter pincode"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banking Information Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Banking Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <input
                      name="bankDetails.bankName"
                      value={formData.bankDetails.bankName}
                      onChange={handleChange}
                      placeholder="Enter bank name"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    <input
                      name="bankDetails.accountNumber"
                      value={formData.bankDetails.accountNumber}
                      onChange={handleChange}
                      placeholder="Enter account number"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                    <input
                      name="bankDetails.ifscCode"
                      value={formData.bankDetails.ifscCode}
                      onChange={handleChange}
                      placeholder="Enter IFSC code"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                    <select
                      name="bankDetails.accountType"
                      value={formData.bankDetails.accountType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                      <option value="Salary">Salary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                    <input
                      name="bankDetails.branchName"
                      value={formData.bankDetails.branchName}
                      onChange={handleChange}
                      placeholder="Enter branch name"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch Address</label>
                    <input
                      name="bankDetails.branchAddress"
                      value={formData.bankDetails.branchAddress}
                      onChange={handleChange}
                      placeholder="Enter branch address"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                    <input
                      name="emergencyContact.name"
                      value={formData.emergencyContact.name}
                      onChange={handleChange}
                      placeholder="Enter contact name"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                    <input
                      name="emergencyContact.relationship"
                      value={formData.emergencyContact.relationship}
                      onChange={handleChange}
                      placeholder="e.g., Father, Mother, Spouse"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      name="emergencyContact.phone"
                      value={formData.emergencyContact.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      name="emergencyContact.address"
                      value={formData.emergencyContact.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="Support">Support</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Risk Management">Risk Management</option>
                      <option value="Customer Service">Customer Service</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                    <input
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Enter job title"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                    <input
                      name="joiningDate"
                      type="date"
                      value={formData.joiningDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary (₹)</label>
                    <input
                      name="salary"
                      type="number"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="Enter salary"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                    <input
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="Enter skills separated by commas"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                    <input
                      name="languages"
                      value={formData.languages}
                      onChange={handleChange}
                      placeholder="Enter languages separated by commas"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                {/* Active Status */}
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      name="isActive"
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Active Employee</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
