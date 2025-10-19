import React, { useState, useEffect } from 'react';
import { generateDSAId, validateDSAId, getDSAIdInfo } from '../utils/dsaIdGenerator.js';

export default function DSASystemDemo() {
  const [allDSAs, setAllDSAs] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('employee1');
  const [employeeDSAs, setEmployeeDSAs] = useState([]);

  // Mock employees
  const employees = [
    { id: 'employee1', name: 'John Smith', department: 'Sales' },
    { id: 'employee2', name: 'Sarah Johnson', department: 'Marketing' },
    { id: 'employee3', name: 'Mike Wilson', department: 'Operations' }
  ];

  useEffect(() => {
    // Load all DSAs from localStorage
    const savedDSAs = JSON.parse(localStorage.getItem('dsas') || '[]');
    setAllDSAs(savedDSAs);
    
    // Filter DSAs for selected employee
    const filtered = savedDSAs.filter(dsa => dsa.createdBy === selectedEmployee);
    setEmployeeDSAs(filtered);
  }, [selectedEmployee]);

  const createSampleDSA = (employeeId) => {
    try {
      const dsaId = generateDSAId();
      const employee = employees.find(emp => emp.id === employeeId);
      
      const newDSA = {
        id: dsaId,
        name: `Sample DSA ${employeeDSAs.length + 1}`,
        email: `dsa${employeeDSAs.length + 1}@example.com`,
        phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        password: 'password123',
        createdBy: employeeId,
        createdByName: employee.name,
        createdAt: new Date().toISOString(),
        status: 'active'
      };

      const updatedDSAs = [...allDSAs, newDSA];
      setAllDSAs(updatedDSAs);
      localStorage.setItem('dsas', JSON.stringify(updatedDSAs));
      
      // Update employee DSAs
      const filtered = updatedDSAs.filter(dsa => dsa.createdBy === selectedEmployee);
      setEmployeeDSAs(filtered);
      
      alert(`Sample DSA created! ID: ${dsaId}`);
    } catch (error) {
      alert('Error creating DSA: ' + error.message);
    }
  };

  const clearAllDSAs = () => {
    if (window.confirm('Are you sure you want to clear all DSAs?')) {
      localStorage.removeItem('dsas');
      setAllDSAs([]);
      setEmployeeDSAs([]);
      alert('All DSAs cleared!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          DSA Management System Demo
        </h1>
        
        {/* System Overview */}
        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-green-800 mb-2">✅ Employee Powers</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Create new DSAs</li>
                <li>• View only their created DSAs</li>
                <li>• Delete their DSAs</li>
                <li>• Generate unique DSA IDs</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-blue-800 mb-2">🔐 DSA ID Format</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Format: ww(year)(month)(date)(unique)(alphabet)</li>
                <li>• Example: ww2025090444A</li>
                <li>• Always unique</li>
                <li>• Date-based generation</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-purple-800 mb-2">🎯 Login System</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• DSA ID + Password only</li>
                <li>• No email login option</li>
                <li>• Secure authentication</li>
                <li>• Employee-created accounts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Employee Selection */}
        <div className="mb-8 p-6 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Employee Dashboard Simulation</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Employee:</label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.department})
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => createSampleDSA(selectedEmployee)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Create Sample DSA
            </button>
            <button
              onClick={clearAllDSAs}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear All DSAs
            </button>
          </div>
        </div>

        {/* Employee's DSAs */}
        <div className="mb-8 p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">
            {employees.find(emp => emp.id === selectedEmployee)?.name}'s DSAs ({employeeDSAs.length})
          </h2>
          {employeeDSAs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No DSAs created by this employee yet</p>
              <p className="text-sm text-gray-400">Click "Create Sample DSA" to add one</p>
            </div>
          ) : (
            <div className="space-y-4">
              {employeeDSAs.map((dsa) => {
                const info = getDSAIdInfo(dsa.id);
                return (
                  <div key={dsa.id} className="bg-white p-4 rounded border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{dsa.name}</h3>
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            {dsa.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">DSA ID:</span> 
                            <span className="font-mono ml-1 text-blue-600">{dsa.id}</span>
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {dsa.email}
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span> {dsa.phone}
                          </div>
                          <div>
                            <span className="font-medium">Created:</span> {new Date(dsa.createdAt).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">ID Info:</span> {info.year}-{info.month}-{info.date} | {info.uniqueNumber}{info.alphabet}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* All DSAs Overview */}
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">All DSAs in System ({allDSAs.length})</h2>
          {allDSAs.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No DSAs in the system yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">DSA ID</th>
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Created By</th>
                    <th className="text-left py-2">Created Date</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allDSAs.map((dsa) => (
                    <tr key={dsa.id} className="border-b">
                      <td className="py-2 font-mono text-blue-600">{dsa.id}</td>
                      <td className="py-2">{dsa.name}</td>
                      <td className="py-2">{dsa.createdByName}</td>
                      <td className="py-2">{new Date(dsa.createdAt).toLocaleDateString()}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          dsa.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {dsa.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-indigo-800">How to Test the System</h2>
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>1. Employee Dashboard:</strong> Go to /employee/login and login as an employee</p>
            <p><strong>2. Create DSAs:</strong> Navigate to "DSA Management" and create new DSAs</p>
            <p><strong>3. DSA Login:</strong> Go to /dsa-login and use the generated DSA ID + password</p>
            <p><strong>4. Isolation:</strong> Each employee only sees DSAs they created</p>
            <p><strong>5. Unique IDs:</strong> Each DSA gets a unique ID based on creation date</p>
          </div>
        </div>
      </div>
    </div>
  );
}
