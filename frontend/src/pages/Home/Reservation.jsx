import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const BookReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bookTitle: "",
    author: "",
    isbn: "",
    rentalStart: "",
    rentalEnd: "",
    pickupLocation: "",
    homeDelivery: false,
    deliveryAddress: "", // New field for delivery address
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  // Function to handle back button click
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg relative">
      {/* Back Arrow Icon */}
      <div className="absolute left-4 top-4">
        <button
          onClick={handleBackClick}
          className="text-black hover:text-blue-500"
        >
          <FaArrowLeft size={30} />
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Reserve A Book</h2>
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
          {/* Email */}
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
          {/* Book Information */}
          <div>
            <label className="block font-medium text-orange-600">Book Title:</label>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-orange-600">Author:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rental Period */}
          <div>
            <label className="block font-medium text-orange-600">Rental Start Date:</label>
            <input
              type="date"
              name="rentalStart"
              value={formData.rentalStart}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-orange-600">Rental End Date:</label>
            <input
              type="date"
              name="rentalEnd"
              value={formData.rentalEnd}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Pickup Location */}
          <div>
            <label className="block font-medium text-orange-600">Preferred Pickup Location:</label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required={!formData.homeDelivery} // Required only if home delivery is not checked
            />
          </div>

          {/* Home Delivery */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="homeDelivery"
              checked={formData.homeDelivery}
              onChange={handleChange}
              className="mr-3"
            />
            <label className="font-medium text-orange-600">Do you require home delivery?</label>
          </div>

          {/* Delivery Address (Conditional Rendering) */}
          {formData.homeDelivery && (
            <div>
              <label className="block font-medium text-orange-600">Delivery Address:</label>
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          )}

          {/* Notes */}
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
            Reserve Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookReservationForm;
