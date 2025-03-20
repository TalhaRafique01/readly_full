import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import back arrow icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const UserProfileSettings = () => {
  const [formData, setFormData] = useState({
    username: "JohnDoe123",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    profilePicture: null,
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission (e.g., updating profile, sending data to backend)
    console.log("User profile updated:", formData);
    alert("Profile updated successfully!");
  };

  // Function to handle back button click
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="container mx-auto py-12 relative">
      {/* Back Arrow Icon */}
      <div className="absolute left-4 top-4">
        <button
          onClick={handleBackClick}
          className="text-black hover:text-blue-500"
        >
          <FaArrowLeft size={30} />
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          User Profile Settings
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-1"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Profile Picture */}
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-gray-700 font-medium mb-1"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {formData.profilePicture && (
              <div className="mt-4">
                <p className="text-gray-500">Selected file:</p>
                <p className="text-sm text-gray-700">{formData.profilePicture.name}</p>
              </div>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Re-enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileSettings;
