import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function KYCForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    panNumber: "",
    aadhaarNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Navigate back to ManageDSA with KYC data
    navigate("/manage-dsa", { 
      state: { 
        kycCompletedId: parseInt(id), 
        kycData: formData 
      } 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          DSA KYC Form (ID: {id})
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="MobileNumber"
            placeholder="Mobile Number"
            value={formData.MobileNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          /> 

          <input
            type="text"
            name="Email"
            placeholder="EmailID"
            value={formData.Email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />




          <input
            type="text"
            name="panNumber"
            placeholder="PAN Number"
            value={formData.panNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="aadhaarNumber"
            placeholder="Aadhaar Number"
            value={formData.aadhaarNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit KYC
          </button>
        </form>
      </div>
    </div>
  );
}
