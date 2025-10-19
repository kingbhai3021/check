import React, { useState } from 'react';

export default function Distributor() {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [objective, setObjective] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');

  // Generate a random captcha
  function generateCaptcha(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Captcha validation (string comparison, not number)
    if (captchaInput !== captcha) {
      alert("Captcha is incorrect. Please try again.");
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }

    // Proceed with form submission
    console.log({ fullName, mobileNumber, aadharNumber, pincode, objective });
    alert("Form submitted successfully!");

    // Reset form
    setFullName('');
    setMobileNumber('');
    setAadharNumber('');
    setPincode('');
    setObjective('');
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  };

  // Refresh captcha
  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
        I AM INTERESTED
      </h2>
      <p className="text-center mb-6">
        to start a Mutual Fund Distribution Business
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl bg-white p-6 rounded shadow-md"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-2 rounded outline-blue-500 text-sm sm:text-base"
          required
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="border p-2 rounded outline-blue-500 text-sm sm:text-base"
          required
        />

        <input
          type="text"
          placeholder="Aadhar Number"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
          className="border p-2 rounded outline-blue-500 text-sm sm:text-base"
          required
        />

        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="border p-2 rounded outline-blue-500 text-sm sm:text-base"
          required
        />

        <select
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          className="border p-2 rounded outline-blue-500 text-sm sm:text-base"
          required
        >
          <option value="">Select Objective</option>
          <option value="Investment">Investment</option>
          <option value="Business Opportunity">Business Opportunity</option>
        </select>

        {/* Captcha Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:col-span-1">
          <div className="bg-gray-300 text-center px-4 py-2 rounded font-mono tracking-wider">
            {captcha}
          </div>
          <input
            type="text"
            placeholder="Enter Captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="border p-2 rounded flex-1 outline-blue-500 text-sm sm:text-base"
            required
          />
          <button
            type="button"
            onClick={refreshCaptcha}
            className="text-sm text-blue-600 hover:underline"
          >
            Refresh
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Submit
        </button>
      </form>

      <p className="text-xs text-center mt-4 max-w-xl">
        Disclaimer: By filling this inquiry form, you are permitting us to
        communicate with you via Call, Email, SMS, RCS or Whatsapp.
      </p>
    </div>
  );
}
