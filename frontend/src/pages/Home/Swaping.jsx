import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const BookSwappingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    currentBookTitle: "",
    currentBookAuthor: "",
    currentBookIsbn: "",
    swappedBookTitle: "",
    swappedBookAuthor: "",
    swappedBookIsbn: "",
    deliveryMethod: "pickup",
    address: "",
    confirmAddress: "",
    swapDate: "",
    notes: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.deliveryMethod === "delivery" &&
      (!formData.address || formData.address !== formData.confirmAddress)
    ) {
      alert("Please provide and confirm your address for Home Delivery.");
      return;
    }

    // Save the form data to localStorage
    localStorage.setItem("swapRequest", JSON.stringify(formData));

    // Show success alert
    alert("Your book swap request has been sent!");

    // Navigate to the request review page
    navigate("/request-review");
  };

  // Function to handle back button click
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Back Arrow Icon */}
      <div className="absolute-fix left-4 top-30">
        <button
          onClick={handleBackClick}
          className="text-black hover:text-blue-500"
        >
          <FaArrowLeft size={30} />
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Swap A Book</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <label className="block font-medium text-orange-600">Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-orange-600">Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-orange-600">Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Current Book Information */}
          <h3 className="font-semibold text-blue-600">Current Book Information</h3>
          <div>
            <label className="block font-medium text-orange-600">Title:</label>
            <input
              type="text"
              name="currentBookTitle"
              value={formData.currentBookTitle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-orange-600">Author:</label>
            <input
              type="text"
              name="currentBookAuthor"
              value={formData.currentBookAuthor}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-orange-600">ISBN (Optional):</label>
            <input
              type="text"
              name="currentBookIsbn"
              value={formData.currentBookIsbn}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Delivery Method */}
          <div>
            <label className="block font-medium text-orange-600">Preferred Delivery Method:</label>
            <select
              name="deliveryMethod"
              value={formData.deliveryMethod}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="pickup">Pickup</option>
              <option value="delivery">Home Delivery</option>
            </select>
          </div>

          {formData.deliveryMethod === "delivery" && (
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-orange-600">Delivery Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-orange-600">Confirm Address:</label>
                <input
                  type="text"
                  name="confirmAddress"
                  value={formData.confirmAddress}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-medium text-orange-600">Preferred Swap Date:</label>
            <input
              type="date"
              name="swapDate"
              value={formData.swapDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-orange-600">Special Requests or Notes:</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Request Book Swap
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookSwappingForm;
