import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import EditProfileModal from "./EditProfileModal";


export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    phone: "+91 9876543210",
    role: "Admin Manager",
    location: "India",
    bio: "Handling backend & frontend",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Optionally save to backend
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>

        {/* Profile Summary */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full border-4 border-blue-500 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">A</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-gray-600">{profile.role}</p>
              <p className="text-gray-500 text-sm">{profile.location}</p>
            </div>
          </div>

          <div className="flex gap-3 text-xl">
            <FaFacebookF className="text-gray-500 hover:text-blue-600 cursor-pointer" />
            <FaXTwitter className="text-gray-500 hover:text-black cursor-pointer" />
            <FaLinkedinIn className="text-gray-500 hover:text-blue-700 cursor-pointer" />
            <FaInstagram className="text-gray-500 hover:text-pink-600 cursor-pointer" />
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-gray-50 p-6 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold">Personal Information</h4>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">First Name</label>
              <p className="text-gray-900">{profile.firstName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Last Name</label>
              <p className="text-gray-900">{profile.lastName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email Address</label>
              <p className="text-gray-900">{profile.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Phone</label>
              <p className="text-gray-900">{profile.phone}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600">Bio</label>
              <p className="text-gray-900">{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditing(false)}
          onChange={handleChange}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
