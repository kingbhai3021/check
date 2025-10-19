import { useState, useEffect } from "react";

export default function InterestedForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    objective: "",
    captchaInput: "",
  });

  const [captcha, setCaptcha] = useState("");

  const generateCaptcha = () => {
    const randomCaptcha = Math.floor(10000 + Math.random() * 90000).toString();
    setCaptcha(randomCaptcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.captchaInput !== captcha) {
      alert("Captcha does not match. Please try again.");
      return;
    }
    console.log("Submitted form:", formData);
    alert("Form submitted successfully!");

    setFormData({
      name: "",
      mobile: "",
      pincode: "",
      objective: "",
      captchaInput: "",
    });
    generateCaptcha();
  };

  return (
    <div className="py-6 bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-inter"
      >
        {/* Header */}
        <h2 className="col-span-1 sm:col-span-2 text-2xl font-bold text-[#003366] text-center font-archivo mb-2">
          I AM INTERESTED
          <div className="text-sm font-normal mt-1 text-gray-700">
            to start a Mutual Fund Distribution Business
          </div>
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066B3] outline-none w-full"
        />

        {/* Mobile */}
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          required
          value={formData.mobile}
          onChange={handleChange}
          maxLength={10}
          pattern="[0-9]{10}"
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066B3] outline-none w-full"
        />

        {/* Pincode */}
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          required
          value={formData.pincode}
          onChange={handleChange}
          pattern="\d{6}"
          maxLength={6}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066B3] outline-none w-full"
        />

        {/* Objective */}
        <select
          name="objective"
          required
          value={formData.objective}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-500 focus:ring-2 focus:ring-[#0066B3] outline-none w-full"
        >
          <option value="">Select Objective</option>
          <option value="start-distribution">Start Mutual Fund Distribution</option>
          <option value="invest-funds">Invest in Mutual Funds</option>
          <option value="learn-more">Learn More</option>
        </select>

        {/* Captcha Input */}
        <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row items-center gap-3">
          <div className="text-xl font-semibold bg-gray-100 px-4 py-2 rounded-md select-none text-center">
            {captcha}
          </div>
          <input
            type="text"
            name="captchaInput"
            placeholder="Enter Captcha"
            required
            value={formData.captchaInput}
            onChange={handleChange}
            pattern="\d{5}"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066B3] outline-none w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2 flex flex-col items-center gap-2 mt-2">
          <button
            type="submit"
            className="bg-[#003366] hover:bg-[#002b59] w-full sm:w-1/2 py-3 text-white rounded-md font-semibold transition-all duration-200"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={generateCaptcha}
            className="text-xs text-blue-600 underline hover:text-blue-800 transition"
          >
            Regenerate Captcha
          </button>
        </div>

        {/* Disclaimer */}
        <p className="col-span-1 sm:col-span-2 text-xs text-gray-600 mt-3 text-center">
          Disclaimer: By filling this inquiry form, you are permitting us to
          communicate with you via Call, Email, SMS, RCS or Whatsapp.
        </p>
      </form>
    </div>
  );
}
