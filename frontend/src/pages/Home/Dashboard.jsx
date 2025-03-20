import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Importing the back arrow icon
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation (React Router v6+)

const AddBookForm = ({ addNewBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photos: [],
    author: "",
    category: "",
    edition: "",
    rentPerDay: "",
    availableQuantity: "", // Added field for available quantity
  });

  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const categories = [
    "Islamic",
    "Urdu",
    "History",
    "Law",
    "Information Technology",
    "Business",
    "Science",
    "Mathematics",
  ]; // Static list of categories (you can fetch these from an API if needed)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: Array.from(e.target.files).slice(0, 5),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      ...formData,
      image: formData.photos[0], // Assuming the first photo is the main image
    };
    addNewBook(newBook); // Add new book to parent state
    setFormData({
      title: "",
      description: "",
      photos: [],
      author: "",
      category: "",
      edition: "",
      rentPerDay: "",
      availableQuantity: "", // Reset available quantity
    });
  };

  // Function to handle return back navigation
  const handleReturnBack = () => {
    navigate(-1); // Navigate to the previous page (equivalent to history.goBack() in v5)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-orange-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl border-t-4 border-orange-500"
      >
        {/* Return Back Icon */}
        <button
          type="button"
          onClick={handleReturnBack}
          className="absolute-fix top-6 left-6 text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft size={30} />
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Add a Book</h2>

        {/* Book Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
            Book Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Upload Photos */}
        <div className="mb-4">
          <label htmlFor="photos" className="block text-gray-700 font-medium mb-1">
            Upload Photos (Max 5)
          </label>
          <input
            type="file"
            id="photos"
            name="photos"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Author's Name */}
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-medium mb-1">
            Author's Name
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
            Book Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Edition */}
        <div className="mb-4">
          <label htmlFor="edition" className="block text-gray-700 font-medium mb-1">
            Book Edition
          </label>
          <input
            type="text"
            id="edition"
            name="edition"
            value={formData.edition}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Rent Per Day */}
        <div className="mb-4">
          <label htmlFor="rentPerDay" className="block text-gray-700 font-medium mb-1">
            Rent Per Day (in RS)
          </label>
          <input
            type="number"
            id="rentPerDay"
            name="rentPerDay"
            value={formData.rentPerDay}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Available Quantity */}
        <div className="mb-4">
          <label htmlFor="availableQuantity" className="block text-gray-700 font-medium mb-1">
            Available Quantity
          </label>
          <input
            type="number"
            id="availableQuantity"
            name="availableQuantity"
            value={formData.availableQuantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            min="1"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
