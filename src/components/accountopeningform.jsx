import React, { useState } from "react";

export default function FullOnboardingForm() {
  const [step, setStep] = useState(1);
  const [digilockerApproved, setDigilockerApproved] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    otp: "",
    name: "",
    email: "",
    emailOTP: "",
    pan: "",
    dob: "",
    gender: "",
    income: "",
    occupation: "",
    maritalStatus: "",
    stateOfBirth: "",
    cityOfBirth: "",
    nationality: "",
    countryOfBirth: "",
    taxResidencyCountry: "",
    agreedToTerms: false,
    bankName: "",
    accountNumber: "",
    reAccountNumber: "",
    accountType: "",
    modeOfHolding: "",
    ifscCode: "",
    bankAddress: "",
    nomineeName: "",
    adharCardNumber: "",
    reAadharNumber: "",
    idProofNumber: "",
    nomineeDob: "",
    nomineeAddress: "",
    nomineeMobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Submitting Full KYC Data:", form);
    alert("KYC Submitted Successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Witty Wealth - Full KYC Onboarding
      </h2>

      {/* STEP 1: Mobile Verification */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Step 1: Mobile Verification</h3>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
            className="w-full border p-2 rounded"
          />
          <button className="bg-blue-500 text-white w-full py-2 rounded">
            Send OTP
          </button>

          <input
            name="otp"
            value={form.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            className="w-full border p-2 rounded"
          />

          <button
            onClick={nextStep}
            className="bg-green-600 text-white px-6 py-2 rounded w-full"
          >
            Verify & Continue
          </button>
        </div>
      )}

      {/* STEP 2: Basic Details */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Step 2: Basic Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email ID"
              className="w-full border p-2 rounded sm:col-span-2"
            />

            {/* Send OTP */}
            <button
              className="bg-blue-500 text-white py-2 rounded sm:col-span-2"
            >
              Send OTP
            </button>

            {/* Email OTP */}
            <input
              name="emailOTP"
              value={form.emailOTP}
              onChange={handleChange}
              placeholder="Enter Email OTP"
              className="w-full border p-2 rounded sm:col-span-2"
            />

            {/* Name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border p-2 rounded"
            />

            {/* PAN */}
            <input
              name="pan"
              value={form.pan}
              onChange={handleChange}
              placeholder="PAN Number"
              className="w-full border p-2 rounded"
            />

            {/* DOB */}
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            {/* Gender */}
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex justify-between gap-2 mt-4">
            <button
              onClick={prevStep}
              disabled
              className="bg-gray-300 text-white px-4 py-2 rounded w-full cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              className="bg-indigo-600 text-white px-6 py-2 rounded w-full"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DigiLocker Permission */}
      {step === 3 && (
        <div className="space-y-4 text-center">
          <h3 className="font-semibold text-lg">Step 3: Complete KYC via DigiLocker</h3>
          <p className="text-gray-600 text-sm">
            Please allow DigiLocker access to fetch your KYC documents securely.
          </p>

          {!digilockerApproved ? (
            <button
              onClick={() => setDigilockerApproved(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded w-full mt-4"
            >
              Allow DigiLocker Access
            </button>
          ) : (
            <p className="text-green-600 font-semibold mt-4">
              ✅ DigiLocker Access Granted
            </p>
          )}

          <div className="flex justify-between gap-2 mt-6">
            <button
              onClick={prevStep}
              className="bg-gray-400 text-white px-4 py-2 rounded w-full"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={!digilockerApproved}
              className={`px-6 py-2 rounded w-full ${
                digilockerApproved
                  ? "bg-green-600 text-white"
                  : "bg-green-300 text-white cursor-not-allowed"
              }`}
            >
              Proceed to Next Step
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Additional Info */}
      {step === 4 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Step 4: Additional Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="income"
              value={form.income}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Annual Income</option>
              <option>10,000 - 1,00,000</option>
              <option>1,00,000 - 3,00,000</option>
              <option>3,00,000 - 5,00,000</option>
              <option>5,00,000 - 7,00,000</option>
              <option>7,00,000 - 9,00,000</option>
              <option>Above 9,00,000</option>
            </select>

            <select
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Occupation</option>
              <option value="Business">Business</option>
              <option value="Service">Private Sector Service</option>
              <option value="GovernmentService">Government Service</option>
              <option value="Professional">Professional</option>
              <option value="Student">Student</option>
              <option value="Farmer">Farmer</option>
              <option value="Retired">Retired</option>
              <option value="Housewife">Housewife</option>
              <option value="SelfEmployed">Self Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Others">Others</option>
            </select>

            <select
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Marital Status</option>
              <option>Married</option>
              <option>Unmarried</option>
              <option>Divorced</option>
            </select>
          </div>

          <div className="flex justify-between gap-2 mt-4">
            <button
              onClick={prevStep}
              className="bg-gray-400 text-white px-4 py-2 rounded w-full"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: FATCA */}
      {step === 5 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Step 5: FATCA Declaration</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Nationality</option>
              <option value="India">India</option>
            </select>

            <select
              name="countryOfBirth"
              value={form.countryOfBirth}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Country of Birth</option>
              <option value="India">India</option>
            </select>

            <select
              name="taxResidencyCountry"
              value={form.taxResidencyCountry}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Tax Residency Country</option>
              <option value="India">India</option>
            </select>

            <input
              name="stateOfBirth"
              placeholder="State of Birth"
              value={form.stateOfBirth}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="cityOfBirth"
              placeholder="City of Birth"
              value={form.cityOfBirth}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={form.agreedToTerms}
              onChange={handleChange}
            />
            I agree to FATCA declaration terms
          </label>

          <div className="flex justify-between gap-2 mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded w-full">
              Previous
            </button>
            <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Bank Details */}
      {step === 6 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Step 6: Bank Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="bankName"
              placeholder="Bank Name"
              value={form.bankName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="accountNumber"
              placeholder="Account Number"
              value={form.accountNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="reAccountNumber"
              placeholder="Re-enter Account Number"
              value={form.reAccountNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <select
              name="accountType"
              value={form.accountType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Account Type</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>

            <input
              name="modeOfHolding"
              placeholder="Mode of Holding (Single/Joint)"
              value={form.modeOfHolding}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="ifscCode"
              placeholder="IFSC Code"
              value={form.ifscCode}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="bankAddress"
              placeholder="Bank Address"
              value={form.bankAddress}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-between gap-2 mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded w-full">
              Previous
            </button>
            <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: Nominee */}
      {step === 7 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Step 7: Nominee Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="nomineeName"
              placeholder="Nominee Name"
              value={form.nomineeName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="adharCardNumber"
              placeholder="Aadhar Card Number"
              value={form.adharCardNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="reAadharNumber"
              placeholder="Re-enter Aadhar Number"
              value={form.reAadharNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="date"
              name="nomineeDob"
              value={form.nomineeDob}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="nomineeAddress"
              placeholder="Nominee Address"
              value={form.nomineeAddress}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="nomineeMobileNumber"
              placeholder="Nominee Mobile Number"
              value={form.nomineeMobileNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-between gap-2 mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded w-full">
              Previous
            </button>
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded w-full">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
