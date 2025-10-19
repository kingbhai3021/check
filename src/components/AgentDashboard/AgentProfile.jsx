import React, { useState } from "react";
import { api } from "../../services/api";
import PasswordChange from "../PasswordChange.jsx";

const AgentProfile = () => {
  const [profile, setProfile] = useState({
    name: "Rohit Sharma",
    email: "rohit.agent@wittywealth.com",
    phone: "+91-9876543210",
    notifications: true,
  });

  const [passwords, setPasswords] = useState({ current: "", new: "" });
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  const validateProfile = () => {
    if (!profile.name || !profile.email || !profile.phone) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(profile.email)) {
      setError("Invalid email format.");
      return false;
    }
    if (!/^\+?\d{10,12}$/.test(profile.phone)) {
      setError("Invalid phone number.");
      return false;
    }
    return true;
  };

  const handleProfileSave = async () => {
    if (!validateProfile()) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.updateProfile(profile);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSave = async () => {
    if (!passwords.current || !passwords.new) {
      setError("Both password fields are required.");
      return;
    }

    if (passwords.new.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.changePassword(passwords);
      setSuccess("Password changed successfully!");
      setPasswords({ current: "", new: "" });
    } catch (err) {
      setError(err.message || "Failed to change password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-10">
      <h2 className="text-2xl font-semibold text-gray-800">Agent Profile</h2>

      {error && (
        <p className="text-red-600 bg-red-50 border border-red-200 p-3 rounded text-sm">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-700 bg-green-50 border border-green-200 p-3 rounded text-sm">
          {success}
        </p>
      )}

      {/* Personal Info Section */}
      <div className="bg-white p-5 rounded shadow space-y-6">
        <h3 className="text-lg font-medium text-gray-700">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              name="phone"
              type="text"
              value={profile.phone}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
              disabled={isLoading}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={profile.notifications}
            onChange={() =>
              setProfile({ ...profile, notifications: !profile.notifications })
            }
            disabled={isLoading}
          />
          Enable Email Notifications
        </label>

        <div>
          <h4 className="text-md font-medium mb-2">Profile Picture</h4>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isLoading}
            className="text-sm"
          />
          {profilePicPreview && (
            <img
              src={profilePicPreview}
              alt="Profile Preview"
              className="h-24 w-24 rounded-full object-cover mt-3 border"
            />
          )}
        </div>

        <button
          onClick={handleProfileSave}
          disabled={isLoading}
          className={`bg-blue-600 text-white px-5 py-2 rounded transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </button>
      </div>

      {/* Change Password Section */}
      <div className="bg-white p-5 rounded shadow space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Change Password</h3>
        
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Click the button below to change your password securely.
          </p>
          <button
            onClick={() => setShowPasswordChange(true)}
            className="bg-green-600 text-white px-5 py-2 rounded transition hover:bg-green-700 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Change Password
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordChange && (
        <PasswordChange onClose={() => setShowPasswordChange(false)} />
      )}
    </div>
  );
};

export default AgentProfile;
