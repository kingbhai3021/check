import React, { useState } from "react";

const KycForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    phone: "",
    otp: "",
    name: "",
    email: "",
    pan: "",
    dob: "",
    income: "",
    occupation: "",
    maritalStatus: "",
    nationality: "India",
    countryOfBirth: "India",
    stateOfBirth: "",
    cityOfBirth: "",
    agreedToTerms: false,
    accountNumber: "",
    reAccountNumber: "",
    ifscCode: "",
    accountType: "Savings",
    nomineeName: "",
    nomineeDob: "",
    nomineeRelation: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = () => {
    console.log("Submit full KYC data to backend", form);
    // You would call APIs like POST /api/client/verifyphone etc. here
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Witty Wealth KYC Onboarding</h2>

      {step === 1 && (
        <>
          <label>Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="input"
            placeholder="+91xxxxxxxxxx"
          />
          <label>OTP</label>
          <input
            name="otp"
            value={form.otp}
            onChange={handleChange}
            className="input"
            placeholder="Enter OTP"
          />
        </>
      )}

      {step === 2 && (
        <>
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="input" />
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="input" />
          <label>PAN Number</label>
          <input name="pan" value={form.pan} onChange={handleChange} className="input" />
          <label>Date of Birth</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} className="input" />
        </>
      )}

      {step === 3 && (
        <>
          {/* required   Digilocker APIs */}
          <p>DigiLocker KYC: Simulated</p>
          <p>✅ Verified via PAN - CIBIL Score Fetched</p>
        </>
      )}

      {step === 4 && (
        <>
          <label>Annual Income</label>
          <select name="income" onChange={handleChange} className="input">
            <option>Less than 1,00,000</option>
            <option>1,00,000 - 2,00,000</option>
            <option>2,00,000 – 3,00,000</option>
          </select>

          <label>Occupation</label>
          <select name="occupation" onChange={handleChange} className="input">
            <option>Student</option>
            <option>Farmer</option>
            <option>SelfEmployed</option>
          </select>

          <label>Marital Status</label>
          <select name="maritalStatus" onChange={handleChange} className="input">
            <option>Married</option>
            <option>Unmarried</option>
          </select>
        </>
      )}

      {step === 5 && (
        <>
          <h4 className="font-semibold text-lg">FATCA Declaration</h4>
          <label>State of Birth</label>
          <input name="stateOfBirth" onChange={handleChange} className="input" />
          <label>City of Birth</label>
          <input name="cityOfBirth" onChange={handleChange} className="input" />
          <label className="flex gap-2 mt-2">
            <input
              type="checkbox"
              name="agreedToTerms"
              onChange={handleChange}
              checked={form.agreedToTerms}
            />
            I agree to FATCA declaration terms.
          </label>
        </>
      )}

      {step === 6 && (
        <>
          <h4 className="font-semibold text-lg">Bank Details</h4>
          <label>Account Number</label>
          <input name="accountNumber" onChange={handleChange} className="input" />
          <label>Re-enter Account Number</label>
          <input name="reAccountNumber" onChange={handleChange} className="input" />
          <label>IFSC Code</label>
          <input name="ifscCode" onChange={handleChange} className="input" />
        </>
      )}

      {step === 7 && (
        <>
          <h4 className="font-semibold text-lg">Nominee</h4>
          <label>Nominee Name</label>
          <input name="nomineeName" onChange={handleChange} className="input" />
          <label>Nominee DOB</label>
          <input type="date" name="nomineeDob" onChange={handleChange} className="input" />
          <label>Relationship</label>
          <input name="nomineeRelation" onChange={handleChange} className="input" />
        </>
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && <button onClick={prevStep} className="btn-secondary">Back</button>}
        {step < 7 ? (
          <button onClick={nextStep} className="btn-primary">Next</button>
        ) : (
          <button onClick={handleSubmit} className="btn-primary">Submit KYC</button>
        )}
      </div>
    </div>
  );
};

export default KycForm;