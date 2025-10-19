import React, { useState } from "react";


export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email Input, 2: OTP, 3: Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Simulated backend response (replace with API calls)
  const handleSendOtp = (e) => {
    e.preventDefault();
    console.log("Sending OTP to:", email);
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === "123456") {
      console.log("OTP verified successfully!");
      setStep(3);
    } else {
      alert("Invalid OTP. Try 123456 as demo.");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password reset successful for:", email);
    alert("✅ Your password has been reset successfully!");
    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 md:p-8">
        
        {/* STEP 1: Email Input */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Forgot Password
            </h2>
            <p className="text-center text-gray-500 text-sm mt-2 mb-6">
              Enter your registered email to receive an OTP.
            </p>
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-colors"
              >
                Send OTP
              </button>
            </form>
          </>
        )}

        {/* STEP 2: OTP Verification */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Verify OTP
            </h2>
            <p className="text-center text-gray-500 text-sm mt-2 mb-6">
              Enter the 6-digit OTP sent to <b>{email}</b>
            </p>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••"
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition-colors"
              >
                Verify OTP
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-blue-600 hover:underline mt-2"
              >
                Change Email
              </button>
            </form>
          </>
        )}

        {/* STEP 3: Reset Password */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Reset Password
            </h2>
            <p className="text-center text-gray-500 text-sm mt-2 mb-6">
              Enter your new password below.
            </p>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-colors"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
